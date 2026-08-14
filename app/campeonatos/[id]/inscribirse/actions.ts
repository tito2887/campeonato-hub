"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export async function inscribirse(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const campeonatoId = formData.get("campeonato_id") as string;
  const nombreEquipo = formData.get("nombre_equipo") as string;
  const telefono = formData.get("telefono_contacto") as string;

  // Verificamos primero si ese equipo ya existe en este campeonato
  const { data: existente } = await supabase
    .from("inscripciones")
    .select("id")
    .eq("campeonato_id", campeonatoId)
    .eq("nombre_equipo", nombreEquipo)
    .maybeSingle();
    

  if (existente) {
    redirect(`/campeonatos/${campeonatoId}/inscribirse?error=equipo_ocupado`);
  }

  // Verificamos si este usuario ya está inscrito en este campeonato (con cualquier equipo)
  const { data: yaInscrito } = await supabase
   .from("inscripciones")
   .select("id")
   .eq("campeonato_id", campeonatoId)
   .eq("usuario_id", user.id)
   .maybeSingle();

  if (yaInscrito) {
   redirect(`/campeonatos/${campeonatoId}/inscribirse?error=ya_inscrito`);
  }
  const { error } = await supabase.from("inscripciones").insert({
    usuario_id: user.id,
    campeonato_id: campeonatoId,
    nombre_equipo: nombreEquipo,
    telefono_contacto: telefono,
  });

  if (error) {
    redirect(`/campeonatos/${campeonatoId}/inscribirse?error=desconocido`);
  }

  redirect(`/campeonatos/${campeonatoId}?inscrito=true`);
}