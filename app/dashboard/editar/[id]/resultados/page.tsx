import { createClient } from "@/lib/supabase-server";
import ResultadoForm from "./ResultadoForm";
import TablaPosiciones from "./TablaPosiciones";
import Link from "next/link";

export default async function ResultadosPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: campeonatoId } = await params;
  const supabase = await createClient();

  const { data: campeonato } = await supabase
    .from("campeonatos")
    .select("nombre, puntos_victoria, puntos_empate, puntos_derrota")
    .eq("id", campeonatoId)
    .single();

  const { data: equipos } = await supabase
    .from("equipos")
    .select("id, nombre, grupo")
    .eq("campeonato_id", campeonatoId);

  const { data: partidos } = await supabase
    .from("partidos")
    .select(
      "id, grupo, jugado, gol_local, gol_visitante, equipo_local_id, equipo_visitante_id, equipo_local:equipo_local_id(nombre), equipo_visitante:equipo_visitante_id(nombre)"
    )
    .eq("campeonato_id", campeonatoId)
    .order("grupo");

  const puntos = {
    puntos_victoria: campeonato?.puntos_victoria ?? 3,
    puntos_empate: campeonato?.puntos_empate ?? 1,
    puntos_derrota: campeonato?.puntos_derrota ?? 0,
  };

  const grupoNumeros = Array.from(
    new Set((equipos ?? []).map((e) => e.grupo).filter((g) => g !== null))
  ).sort((a, b) => (a as number) - (b as number));

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link
        href={`/dashboard/editar/${campeonatoId}/sorteo`}
        className="text-sm text-blue-600 hover:underline"
      >
        ← Volver al sorteo
      </Link>

      <h1 className="text-2xl font-bold mt-2 mb-1">Resultados y posiciones</h1>
      <p className="text-gray-600 mb-6">{campeonato?.nombre}</p>

      {grupoNumeros.length === 0 ? (
        <p className="text-gray-500">
          Todavía no hay grupos generados. Vuelve a la página de sorteo primero.
        </p>
      ) : (
        grupoNumeros.map((numeroGrupo) => (
          <div key={numeroGrupo} className="mb-8">
            <h3 className="font-semibold text-lg mb-2">Grupo {numeroGrupo}</h3>

            <TablaPosiciones
              equipos={equipos ?? []}
              partidos={(partidos ?? []) as any}
              puntos={puntos}
              numeroGrupo={numeroGrupo as number}
            />

            <h4 className="text-sm font-medium text-gray-500 mb-2">Partidos</h4>
            {partidos
              ?.filter((p) => p.grupo === numeroGrupo)
              .map((partido: any) => (
                <ResultadoForm key={partido.id} partido={partido} campeonatoId={campeonatoId} />
              ))}
          </div>
        ))
      )}
    </div>
  );
}