"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

// Mezcla aleatoria tipo Fisher-Yates
function mezclar<T>(arreglo: T[]): T[] {
  const copia = [...arreglo];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

const DESCANSO = "__DESCANSO__";

// Método círculo: genera el calendario real de todos-contra-todos organizado en jornadas.
// Con N equipos (par): N-1 jornadas de N/2 partidos cada una.
// Con N equipos (impar): se agrega un "descanso" ficticio, quedan N jornadas.
function generarCalendarioCirculo(equipoIds: string[]) {
  const equipos = [...equipoIds];
  if (equipos.length % 2 !== 0) {
    equipos.push(DESCANSO);
  }

  const n = equipos.length;
  const totalJornadas = n - 1;
  const partidos: { local: string; visitante: string; jornada: number }[] = [];

  let arreglo = [...equipos];

  for (let ronda = 0; ronda < totalJornadas; ronda++) {
    for (let i = 0; i < n / 2; i++) {
      const equipoA = arreglo[i];
      const equipoB = arreglo[n - 1 - i];

      if (equipoA === DESCANSO || equipoB === DESCANSO) continue;

      // Alterna localía para que no siempre sea el mismo lado "local"
      const local = ronda % 2 === 0 ? equipoA : equipoB;
      const visitante = ronda % 2 === 0 ? equipoB : equipoA;

      partidos.push({ local, visitante, jornada: ronda + 1 });
    }

    // Rotar: el primer equipo queda fijo, el resto rota una posición
    const fijo = arreglo[0];
    const resto = arreglo.slice(1);
    resto.unshift(resto.pop()!);
    arreglo = [fijo, ...resto];
  }

  return { partidos, totalJornadas };
}

export async function generarSorteo(campeonatoId: string, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado" };
  }

  const numeroGrupos = parseInt(formData.get("numeroGrupos") as string, 10);
  const formato = (formData.get("formato") as string) || "unico";

  if (!numeroGrupos || numeroGrupos < 1) {
    return { error: "Indica un número válido de grupos." };
  }

  const { data: equipos, error: errorEquipos } = await supabase
    .from("equipos")
    .select("id")
    .eq("campeonato_id", campeonatoId);

  if (errorEquipos || !equipos || equipos.length < 2) {
    return { error: "Necesitas al menos 2 equipos para generar el sorteo." };
  }

  if (numeroGrupos > equipos.length) {
    return { error: "No puede haber más grupos que equipos." };
  }

  // Mezclar equipos y repartirlos en grupos de forma pareja
  const equiposMezclados = mezclar(equipos.map((e) => e.id));
  const grupos: string[][] = Array.from({ length: numeroGrupos }, () => []);

  equiposMezclados.forEach((equipoId, indice) => {
    grupos[indice % numeroGrupos].push(equipoId);
  });

  // Asignar el número de grupo a cada equipo
  for (let g = 0; g < grupos.length; g++) {
    for (const equipoId of grupos[g]) {
      await supabase.from("equipos").update({ grupo: g + 1 }).eq("id", equipoId);
    }
  }

  // Borrar partidos anteriores de este campeonato (si se vuelve a sortear)
  await supabase.from("partidos").delete().eq("campeonato_id", campeonatoId);

  // Generar y guardar los partidos de cada grupo, organizados en jornadas reales
  const partidosParaInsertar: {
    campeonato_id: string;
    equipo_local_id: string;
    equipo_visitante_id: string;
    grupo: number;
    jornada: number;
    vuelta: string;
  }[] = [];

  grupos.forEach((equiposDelGrupo, indice) => {
    const { partidos, totalJornadas } = generarCalendarioCirculo(equiposDelGrupo);

    partidos.forEach((partido) => {
      if (formato === "ida_vuelta") {
        // Jornada de ida (1 .. totalJornadas)
        partidosParaInsertar.push({
          campeonato_id: campeonatoId,
          equipo_local_id: partido.local,
          equipo_visitante_id: partido.visitante,
          grupo: indice + 1,
          jornada: partido.jornada,
          vuelta: "ida",
        });
        // Jornada espejo de vuelta (totalJornadas+1 .. totalJornadas*2), local/visitante invertidos
        partidosParaInsertar.push({
          campeonato_id: campeonatoId,
          equipo_local_id: partido.visitante,
          equipo_visitante_id: partido.local,
          grupo: indice + 1,
          jornada: partido.jornada + totalJornadas,
          vuelta: "vuelta",
        });
      } else {
        partidosParaInsertar.push({
          campeonato_id: campeonatoId,
          equipo_local_id: partido.local,
          equipo_visitante_id: partido.visitante,
          grupo: indice + 1,
          jornada: partido.jornada,
          vuelta: "unico",
        });
      }
    });
  });

  const { error: errorPartidos } = await supabase
    .from("partidos")
    .insert(partidosParaInsertar);

  if (errorPartidos) {
    return { error: `No se pudieron generar los partidos: ${errorPartidos.message}` };
  }

  revalidatePath(`/dashboard/editar/${campeonatoId}/sorteo`);
  revalidatePath(`/campeonatos/${campeonatoId}`);
  return { success: true, totalPartidos: partidosParaInsertar.length };
}