"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function crearJugador(
  equipoId: string,
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

  const nombre = formData.get("nombre") as string;
  const numeroRaw = formData.get("numero") as string;
  const posicion = formData.get("posicion") as string;

  if (!nombre || nombre.trim() === "") {
    return { error: "El nombre del jugador es obligatorio." };
  }

  const numero = numeroRaw ? parseInt(numeroRaw, 10) : null;

  const { error } = await supabase.from("jugadores").insert({
    equipo_id: equipoId,
    nombre: nombre.trim(),
    numero,
    posicion: posicion || null,
  });

  if (error) {
    return { error: `No se pudo agregar el jugador: ${error.message}` };
  }

  revalidatePath(`/dashboard/editar/${campeonatoId}/equipos/${equipoId}/jugadores`);
  return { success: true };
}

export async function eliminarJugador(
  jugadorId: string,
  equipoId: string,
  campeonatoId: string
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado" };
  }

  const { error } = await supabase.from("jugadores").delete().eq("id", jugadorId);

  if (error) {
    return { error: `No se pudo eliminar el jugador: ${error.message}` };
  }

  revalidatePath(`/dashboard/editar/${campeonatoId}/equipos/${equipoId}/jugadores`);
  return { success: true };
}