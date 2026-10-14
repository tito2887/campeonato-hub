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

// Método círculo: calendario real de todos contra todos, organizado en jornadas.
// Con N equipos (par): N-1 jornadas de N/2 partidos. Con N impar: se agrega un descanso ficticio.
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

      const local = ronda % 2 === 0 ? equipoA : equipoB;
      const visitante = ronda % 2 === 0 ? equipoB : equipoA;

      partidos.push({ local, visitante, jornada: ronda + 1 });
    }

    const fijo = arreglo[0];
    const resto = arreglo.slice(1);
    resto.unshift(resto.pop()!);
    arreglo = [fijo, ...resto];
  }

  return { partidos, totalJornadas };
}

function refrescar(campeonatoId: string) {
  revalidatePath(`/dashboard/editar/${campeonatoId}/partidos`);
  revalidatePath(`/dashboard/editar/${campeonatoId}`);
  revalidatePath(`/campeonatos/${campeonatoId}`);
}

// Paso 1 (manual): guarda en qué grupo quedó cada equipo.
// Si algún grupo cambió, borra los partidos de la fase de grupos porque ya no coinciden.
export async function guardarGrupos(
  campeonatoId: string,
  asignaciones: { equipoId: string; grupo: number | null }[]
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado" };
  }

  const { data: actuales, error: errorActuales } = await supabase
    .from("equipos")
    .select("id, grupo")
    .eq("campeonato_id", campeonatoId);

  if (errorActuales || !actuales) {
    return { error: "No se pudieron leer los equipos del campeonato." };
  }

  const grupoActual = new Map<string, number | null>(
    actuales.map((e: any) => [e.id as string, (e.grupo ?? null) as number | null])
  );

  const cambios = asignaciones.filter(
    (a) => grupoActual.has(a.equipoId) && grupoActual.get(a.equipoId) !== a.grupo
  );

  if (cambios.length === 0) {
    return { success: true, cambios: 0 };
  }

  for (const cambio of cambios) {
    const { error } = await supabase
      .from("equipos")
      .update({ grupo: cambio.grupo })
      .eq("id", cambio.equipoId)
      .eq("campeonato_id", campeonatoId);

    if (error) {
      return { error: `No se pudo guardar el grupo: ${error.message}` };
    }
  }

  // Los partidos de grupos ya no corresponden a los grupos nuevos
  await supabase
    .from("partidos")
    .delete()
    .eq("campeonato_id", campeonatoId)
    .eq("fase", "grupos");

  refrescar(campeonatoId);
  return { success: true, cambios: cambios.length };
}

// Paso 1 (opcional): sortea los equipos al azar entre los grupos y devuelve el orden para la animación.
export async function sortearGrupos(campeonatoId: string, numeroGrupos: number) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado" };
  }

  if (!numeroGrupos || numeroGrupos < 1) {
    return { error: "Indica un número válido de grupos." };
  }

  const { data: equipos, error: errorEquipos } = await supabase
    .from("equipos")
    .select("id, nombre")
    .eq("campeonato_id", campeonatoId);

  if (errorEquipos || !equipos || equipos.length < 2) {
    return { error: "Necesitas al menos 2 equipos para sortear." };
  }

  if (numeroGrupos > equipos.length) {
    return { error: "No puede haber más grupos que equipos." };
  }

  const mezclados = mezclar(equipos);
  const equiposAnimacion = mezclados.map((equipo: any, indice: number) => ({
    id: equipo.id as string,
    nombre: equipo.nombre as string,
    grupo: (indice % numeroGrupos) + 1,
  }));

  for (const equipo of equiposAnimacion) {
    const { error } = await supabase
      .from("equipos")
      .update({ grupo: equipo.grupo })
      .eq("id", equipo.id)
      .eq("campeonato_id", campeonatoId);

    if (error) {
      return { error: `No se pudo guardar el sorteo: ${error.message}` };
    }
  }

  await supabase
    .from("partidos")
    .delete()
    .eq("campeonato_id", campeonatoId)
    .eq("fase", "grupos");

  refrescar(campeonatoId);
  return { success: true, equiposAnimacion, numeroGrupos };
}

// Paso 2: genera los partidos con los equipos que ya están en cada grupo.
// Solo borra los partidos de la fase de grupos (no toca la fase eliminatoria).
export async function generarPartidosGrupos(campeonatoId: string, formato: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado" };
  }

  const { data: equipos, error: errorEquipos } = await supabase
    .from("equipos")
    .select("id, grupo")
    .eq("campeonato_id", campeonatoId);

  if (errorEquipos || !equipos) {
    return { error: "No se pudieron leer los equipos del campeonato." };
  }

  const asignados = equipos.filter((e: any) => e.grupo !== null && e.grupo !== undefined);

  if (asignados.length === 0) {
    return { error: "Primero asigna los equipos a sus grupos." };
  }

  const numerosGrupo = Array.from(new Set(asignados.map((e: any) => e.grupo as number))).sort(
    (a, b) => a - b
  );

  // Validar antes de borrar nada
  for (const numeroGrupo of numerosGrupo) {
    const cantidad = asignados.filter((e: any) => e.grupo === numeroGrupo).length;
    if (cantidad < 2) {
      return {
        error: `El grupo ${numeroGrupo} tiene solo ${cantidad} equipo(s); necesita al menos 2.`,
      };
    }
  }

  const partidosParaInsertar: {
    campeonato_id: string;
    equipo_local_id: string;
    equipo_visitante_id: string;
    grupo: number;
    jornada: number;
    fase: string;
    vuelta: string;
  }[] = [];

  for (const numeroGrupo of numerosGrupo) {
    const ids = mezclar(
      asignados.filter((e: any) => e.grupo === numeroGrupo).map((e: any) => e.id as string)
    );
    const { partidos, totalJornadas } = generarCalendarioCirculo(ids);

    for (const partido of partidos) {
      if (formato === "ida_vuelta") {
        partidosParaInsertar.push({
          campeonato_id: campeonatoId,
          equipo_local_id: partido.local,
          equipo_visitante_id: partido.visitante,
          grupo: numeroGrupo,
          jornada: partido.jornada,
          fase: "grupos",
          vuelta: "ida",
        });
        partidosParaInsertar.push({
          campeonato_id: campeonatoId,
          equipo_local_id: partido.visitante,
          equipo_visitante_id: partido.local,
          grupo: numeroGrupo,
          jornada: partido.jornada + totalJornadas,
          fase: "grupos",
          vuelta: "vuelta",
        });
      } else {
        partidosParaInsertar.push({
          campeonato_id: campeonatoId,
          equipo_local_id: partido.local,
          equipo_visitante_id: partido.visitante,
          grupo: numeroGrupo,
          jornada: partido.jornada,
          fase: "grupos",
          vuelta: "unico",
        });
      }
    }
  }

  await supabase
    .from("partidos")
    .delete()
    .eq("campeonato_id", campeonatoId)
    .eq("fase", "grupos");

  const { error } = await supabase.from("partidos").insert(partidosParaInsertar);

  if (error) {
    return { error: `No se pudieron generar los partidos: ${error.message}` };
  }

  refrescar(campeonatoId);
  return {
    success: true,
    totalPartidos: partidosParaInsertar.length,
    sinGrupo: equipos.length - asignados.length,
  };
}