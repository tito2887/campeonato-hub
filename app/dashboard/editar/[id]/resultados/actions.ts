"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function guardarResultado(
  partidoId: string,
  campeonatoId: string,
  formData: FormData
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado" };
  }

  const golLocal = parseInt(formData.get("gol_local") as string, 10);
  const golVisitante = parseInt(formData.get("gol_visitante") as string, 10);

  if (isNaN(golLocal) || isNaN(golVisitante) || golLocal < 0 || golVisitante < 0) {
    return { error: "Ingresa un marcador válido para ambos equipos." };
  }

  const { error } = await supabase
    .from("partidos")
    .update({
      gol_local: golLocal,
      gol_visitante: golVisitante,
      jugado: true,
    })
    .eq("id", partidoId);

  if (error) {
    return { error: `No se pudo guardar el resultado: ${error.message}` };
  }

  revalidatePath(`/dashboard/editar/${campeonatoId}/resultados`);
  revalidatePath(`/campeonatos/${campeonatoId}`);
  return { success: true };
}