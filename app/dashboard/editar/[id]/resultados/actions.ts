"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

const FASE_SIGUIENTE: Record<string, string> = {
  dieciseisavos: "octavos",
  octavos: "cuartos",
  cuartos: "semifinal",
  semifinal: "final",
};

async function ganadorDeLlave(
  supabase: any,
  campeonatoId: string,
  fase: string,
  numeroLlave: number
) {
  const { data: partidosLlave } = await supabase
    .from("partidos")
    .select("equipo_local_id, equipo_visitante_id, gol_local, gol_visitante, jugado")
    .eq("campeonato_id", campeonatoId)
    .eq("fase", fase)
    .eq("llave", numeroLlave);

  if (!partidosLlave || partidosLlave.length === 0) return null;
  if (!partidosLlave.every((p: any) => p.jugado)) return null;

  const golesPorEquipo: Record<string, number> = {};
  for (const p of partidosLlave) {
    golesPorEquipo[p.equipo_local_id] = (golesPorEquipo[p.equipo_local_id] ?? 0) + (p.gol_local ?? 0);
    golesPorEquipo[p.equipo_visitante_id] =
      (golesPorEquipo[p.equipo_visitante_id] ?? 0) + (p.gol_visitante ?? 0);
  }

  const equiposUnicos = Object.keys(golesPorEquipo);
  if (equiposUnicos.length !== 2) return null;
  const [eqA, eqB] = equiposUnicos;
  if (golesPorEquipo[eqA] === golesPorEquipo[eqB]) return null; // empate global, resolver manualmente

  return golesPorEquipo[eqA] > golesPorEquipo[eqB] ? eqA : eqB;
}

async function intentarAvanzarRonda(
  supabase: any,
  campeonatoId: string,
  fase: string,
  llave: number | null
) {
  if (!llave || fase === "grupos" || fase === "final") return;

  const faseSiguiente = FASE_SIGUIENTE[fase];
  if (!faseSiguiente) return;

  const siblingLlave = llave % 2 === 1 ? llave + 1 : llave - 1;
  const llaveSiguiente = Math.ceil(llave / 2);

  // Si ya se generó el partido de la siguiente ronda para esta llave, no repetir
  const { data: yaExiste } = await supabase
    .from("partidos")
    .select("id")
    .eq("campeonato_id", campeonatoId)
    .eq("fase", faseSiguiente)
    .eq("llave", llaveSiguiente)
    .limit(1);

  if (yaExiste && yaExiste.length > 0) return;

  const ganadorActual = await ganadorDeLlave(supabase, campeonatoId, fase, llave);
  const ganadorRival = await ganadorDeLlave(supabase, campeonatoId, fase, siblingLlave);

  if (!ganadorActual || !ganadorRival) return; // falta la otra llave, o hay empate global

  const { data: muestraPartido } = await supabase
    .from("partidos")
    .select("vuelta")
    .eq("campeonato_id", campeonatoId)
    .eq("fase", fase)
    .eq("llave", llave)
    .limit(1)
    .single();

  const formatoActual = muestraPartido?.vuelta === "unico" ? "unico" : "ida_vuelta";

  const equipoLocalPrimero = llave < siblingLlave ? ganadorActual : ganadorRival;
  const equipoVisitantePrimero = llave < siblingLlave ? ganadorRival : ganadorActual;

  if (formatoActual === "ida_vuelta") {
    await supabase.from("partidos").insert([
      {
        campeonato_id: campeonatoId,
        equipo_local_id: equipoLocalPrimero,
        equipo_visitante_id: equipoVisitantePrimero,
        fase: faseSiguiente,
        llave: llaveSiguiente,
        vuelta: "ida",
      },
      {
        campeonato_id: campeonatoId,
        equipo_local_id: equipoVisitantePrimero,
        equipo_visitante_id: equipoLocalPrimero,
        fase: faseSiguiente,
        llave: llaveSiguiente,
        vuelta: "vuelta",
      },
    ]);
  } else {
    await supabase.from("partidos").insert({
      campeonato_id: campeonatoId,
      equipo_local_id: equipoLocalPrimero,
      equipo_visitante_id: equipoVisitantePrimero,
      fase: faseSiguiente,
      llave: llaveSiguiente,
      vuelta: "unico",
    });
  }
}

export async function guardarFechaHora(
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

  const fecha = (formData.get("fecha") as string) || null;
  const hora = (formData.get("hora") as string) || null;

  const { error } = await supabase
    .from("partidos")
    .update({ fecha, hora })
    .eq("id", partidoId);

  if (error) {
    return { error: `No se pudo guardar la fecha: ${error.message}` };
  }

  revalidatePath(`/dashboard/editar/${campeonatoId}/resultados`);
  revalidatePath(`/dashboard/editar/${campeonatoId}/sorteo`);
  revalidatePath(`/dashboard/editar/${campeonatoId}/eliminatoria`);
  revalidatePath(`/dashboard/editar/${campeonatoId}`);
  return { success: true };
}

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

  const { data: partidoActual } = await supabase
    .from("partidos")
    .select("fase, llave")
    .eq("id", partidoId)
    .single();

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

  if (partidoActual?.fase && partidoActual.fase !== "grupos") {
    await intentarAvanzarRonda(supabase, campeonatoId, partidoActual.fase, partidoActual.llave);
  }

  revalidatePath(`/dashboard/editar/${campeonatoId}/resultados`);
  revalidatePath(`/dashboard/editar/${campeonatoId}/eliminatoria`);
  revalidatePath(`/campeonatos/${campeonatoId}`);
  return { success: true };
}