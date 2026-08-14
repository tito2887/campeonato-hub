"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export async function crearCampeonato(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const nombre = formData.get("nombre") as string;
  const categoria = formData.get("categoria") as string;
  const descripcion = formData.get("descripcion") as string;
  const socio = formData.get("socio") as string;

  const { error } = await supabase.from("campeonatos").insert({
    nombre,
    categoria,
    descripcion,
    socio,
    organizador_id: user.id,
  });

  if (error) {
    throw new Error("No se pudo crear el campeonato: " + error.message);
  }

  redirect("/dashboard");
}