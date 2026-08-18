"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export async function editarCampeonato(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const campeonatoId = formData.get("campeonato_id") as string;
  const nombre = formData.get("nombre") as string;
  const categoria = formData.get("categoria") as string;
  const descripcion = formData.get("descripcion") as string;
  const socio = formData.get("socio") as string;

  const { error } = await supabase
    .from("campeonatos")
    .update({ nombre, categoria, descripcion, socio })
    .eq("id", campeonatoId)
    .eq("organizador_id", user.id);

  if (error) {
    throw new Error("No se pudo actualizar el campeonato: " + error.message);
  }

  redirect("/dashboard");
}