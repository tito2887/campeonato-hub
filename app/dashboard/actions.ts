"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";

export async function eliminarCampeonato(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No autorizado");
  }

  const campeonatoId = formData.get("campeonato_id") as string;

  const { error } = await supabase
    .from("campeonatos")
    .delete()
    .eq("id", campeonatoId)
    .eq("organizador_id", user.id);

  if (error) {
    throw new Error("No se pudo eliminar el campeonato: " + error.message);
  }

  revalidatePath("/dashboard");
  revalidatePath("/campeonatos");
}