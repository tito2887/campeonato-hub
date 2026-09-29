"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function eliminarFecha(
  campeonatoId: string,
  numeroGrupo: number,
  numeroJornada: number
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado" };
  }

  const { error } = await supabase
    .from("partidos")
    .delete()
    .eq("campeonato_id", campeonatoId)
    .eq("grupo", numeroGrupo)
    .eq("jornada", numeroJornada)
    .eq("fase", "grupos");

  if (error) {
    return { error: `No se pudo eliminar la fecha: ${error.message}` };
  }

  revalidatePath(`/dashboard/editar/${campeonatoId}/partidos`);
  return { success: true };
}

export async function agregarFecha(
  campeonatoId: string,
  numeroGrupo: number,
  numeroJornada: number,
  partidos: { local: string; visitante: string }[]
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado" };
  }

  const validos = partidos.filter((p) => p.local && p.visitante && p.local !== p.visitante);

  if (validos.length === 0) {
    return { error: "Agrega al menos un partido con 2 equipos distintos." };
  }

  const paraInsertar = validos.map((p) => ({
    campeonato_id: campeonatoId,
    equipo_local_id: p.local,
    equipo_visitante_id: p.visitante,
    grupo: numeroGrupo,
    jornada: numeroJornada,
    fase: "grupos",
    vuelta: "unico",
  }));

  const { error } = await supabase.from("partidos").insert(paraInsertar);

  if (error) {
    return { error: `No se pudo agregar la fecha: ${error.message}` };
  }

  revalidatePath(`/dashboard/editar/${campeonatoId}/partidos`);
  return { success: true };
}