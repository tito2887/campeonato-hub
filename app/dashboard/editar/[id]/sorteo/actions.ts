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

// Genera todos los partidos de todos-contra-todos dentro de un grupo
function generarRoundRobin(equipoIds: string[]) {
  const partidos: { local: string; visitante: string }[] = [];
  for (let i = 0; i < equipoIds.length; i++) {
    for (let j = i + 1; j < equipoIds.length; j++) {
      partidos.push({ local: equipoIds[i], visitante: equipoIds[j] });
    }
  }
  return partidos;
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

  // Generar y guardar los partidos de cada grupo
  const partidosParaInsertar: {
    campeonato_id: string;
    equipo_local_id: string;
    equipo_visitante_id: string;
    grupo: number;
  }[] = [];

  grupos.forEach((equiposDelGrupo, indice) => {
    const partidos = generarRoundRobin(equiposDelGrupo);
    partidos.forEach((partido) => {
      partidosParaInsertar.push({
        campeonato_id: campeonatoId,
        equipo_local_id: partido.local,
        equipo_visitante_id: partido.visitante,
        grupo: indice + 1,
      });
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