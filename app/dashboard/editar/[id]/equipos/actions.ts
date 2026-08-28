"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function crearEquipo(campeonatoId: string, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado" };
  }

  const nombre = formData.get("nombre") as string;
  const archivo = formData.get("escudo") as File;

  if (!nombre || nombre.trim() === "") {
    return { error: "El nombre del equipo es obligatorio." };
  }

  let escudoUrl: string | null = null;

  if (archivo && archivo.size > 0) {
    const extension = archivo.name.split(".").pop();
    const nombreArchivo = `${campeonatoId}/${crypto.randomUUID()}.${extension}`;

    const { error: errorSubida } = await supabase.storage
      .from("escudos")
      .upload(nombreArchivo, archivo);

    if (errorSubida) {
      return { error: `No se pudo subir la imagen: ${errorSubida.message}` };
    }

    const { data: urlPublica } = supabase.storage
      .from("escudos")
      .getPublicUrl(nombreArchivo);

    escudoUrl = urlPublica.publicUrl;
  }

  const { error: errorInsercion } = await supabase.from("equipos").insert({
    campeonato_id: campeonatoId,
    nombre: nombre.trim(),
    escudo_url: escudoUrl,
  });

  if (errorInsercion) {
    return { error: `No se pudo crear el equipo: ${errorInsercion.message}` };
  }

  revalidatePath(`/dashboard/editar/${campeonatoId}/equipos`);
  return { success: true };
}

export async function eliminarEquipo(equipoId: string, campeonatoId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado" };
  }

  const { error } = await supabase.from("equipos").delete().eq("id", equipoId);

  if (error) {
    return { error: `No se pudo eliminar el equipo: ${error.message}` };
  }

  revalidatePath(`/dashboard/editar/${campeonatoId}/equipos`);
  return { success: true };
}