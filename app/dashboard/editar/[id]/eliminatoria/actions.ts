"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import { calcularTabla } from "../resultados/TablaPosiciones";

// Genera el orden de siembra clásico de un cuadro eliminatorio (evita que los
// mejores clasificados se crucen antes de la final). Ej. para 8: [1,8,4,5,2,7,3,6]
function ordenDeSiembra(total: number): number[] {
  let resultado = [1];
  while (resultado.length < total) {
    const n = resultado.length * 2 + 1;
    const nuevo: number[] = [];
    for (const seed of resultado) {
      nuevo.push(seed, n - seed);
    }
    resultado = nuevo;
  }
  return resultado;
}

function esPotenciaDeDos(n: number) {
  return n >= 4 && (n & (n - 1)) === 0;
}

const NOMBRES_FASE: Record<number, string> = {
  4: "semifinal",
  8: "cuartos",
  16: "octavos",
  32: "dieciseisavos",
};

export async function generarEliminatoria(campeonatoId: string, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado" };
  }

  const equiposPorGrupo = parseInt(formData.get("equiposPorGrupo") as string, 10);
  const formato = (formData.get("formato") as string) || "unico";

  if (!equiposPorGrupo || equiposPorGrupo < 1) {
    return { error: "Indica cuántos equipos clasifican por grupo." };
  }

  const { data: campeonato } = await supabase
    .from("campeonatos")
    .select("puntos_victoria, puntos_empate, puntos_derrota")
    .eq("id", campeonatoId)
    .single();

  const puntos = {
    puntos_victoria: campeonato?.puntos_victoria ?? 3,
    puntos_empate: campeonato?.puntos_empate ?? 1,
    puntos_derrota: campeonato?.puntos_derrota ?? 0,
  };

  const { data: equipos } = await supabase
    .from("equipos")
    .select("id, nombre, grupo")
    .eq("campeonato_id", campeonatoId);

  const { data: partidosGrupos } = await supabase
    .from("partidos")
    .select("id, grupo, jugado, gol_local, gol_visitante, equipo_local_id, equipo_visitante_id")
    .eq("campeonato_id", campeonatoId)
    .eq("fase", "grupos");

  const gruposNumeros = Array.from(
    new Set((equipos ?? []).map((e) => e.grupo).filter((g) => g !== null))
  ).sort((a, b) => (a as number) - (b as number)) as number[];

  if (gruposNumeros.length === 0) {
    return { error: "Este campeonato todavía no tiene grupos generados." };
  }

  // Calcular la tabla de cada grupo y tomar los primeros N clasificados
  const clasificadosPorGrupo: { equipoId: string; nombre: string }[][] = [];

  for (const numeroGrupo of gruposNumeros) {
    const equiposDelGrupo = (equipos ?? []).filter((e) => e.grupo === numeroGrupo);
    const partidosDelGrupo = (partidosGrupos ?? []).filter((p) => p.grupo === numeroGrupo);
    const tabla = calcularTabla(equiposDelGrupo as any, partidosDelGrupo as any, puntos);

    if (tabla.length < equiposPorGrupo) {
      return {
        error: `El grupo ${numeroGrupo} solo tiene ${tabla.length} equipo(s), no alcanza para clasificar ${equiposPorGrupo}.`,
      };
    }

    clasificadosPorGrupo.push(
      tabla.slice(0, equiposPorGrupo).map((fila: any) => ({ equipoId: fila.equipoId, nombre: fila.nombre }))
    );
  }

  // Ordenar por posición (todos los 1° de cada grupo, luego todos los 2°, etc.)
  const clasificados: { equipoId: string; nombre: string }[] = [];
  for (let pos = 0; pos < equiposPorGrupo; pos++) {
    for (const grupo of clasificadosPorGrupo) {
      clasificados.push(grupo[pos]);
    }
  }

  const total = clasificados.length;

  if (!esPotenciaDeDos(total)) {
    return {
      error: `El total de clasificados (${total}) debe ser 4, 8, 16 o 32 para armar un cuadro parejo. Ajusta cuántos clasifican por grupo.`,
    };
  }

  const faseInicial = NOMBRES_FASE[total];
  const siembra = ordenDeSiembra(total);

  // Borrar cualquier fase eliminatoria anterior de este campeonato (si se regenera)
  await supabase.from("partidos").delete().eq("campeonato_id", campeonatoId).neq("fase", "grupos");

  const partidosParaInsertar: {
    campeonato_id: string;
    equipo_local_id: string;
    equipo_visitante_id: string;
    fase: string;
    llave: number;
    vuelta: string;
  }[] = [];

  for (let i = 0; i < total / 2; i++) {
    const seedA = siembra[i * 2];
    const seedB = siembra[i * 2 + 1];
    const equipoA = clasificados[seedA - 1];
    const equipoB = clasificados[seedB - 1];
    const llave = i + 1;

    if (formato === "ida_vuelta") {
      partidosParaInsertar.push({
        campeonato_id: campeonatoId,
        equipo_local_id: equipoA.equipoId,
        equipo_visitante_id: equipoB.equipoId,
        fase: faseInicial,
        llave,
        vuelta: "ida",
      });
      partidosParaInsertar.push({
        campeonato_id: campeonatoId,
        equipo_local_id: equipoB.equipoId,
        equipo_visitante_id: equipoA.equipoId,
        fase: faseInicial,
        llave,
        vuelta: "vuelta",
      });
    } else {
      partidosParaInsertar.push({
        campeonato_id: campeonatoId,
        equipo_local_id: equipoA.equipoId,
        equipo_visitante_id: equipoB.equipoId,
        fase: faseInicial,
        llave,
        vuelta: "unico",
      });
    }
  }

  const { error } = await supabase.from("partidos").insert(partidosParaInsertar);

  if (error) {
    return { error: `No se pudo generar la fase eliminatoria: ${error.message}` };
  }

  revalidatePath(`/dashboard/editar/${campeonatoId}/eliminatoria`);
  return { success: true, fase: faseInicial, totalPartidos: partidosParaInsertar.length };
}