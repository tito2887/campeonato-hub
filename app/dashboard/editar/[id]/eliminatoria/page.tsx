import { createClient } from "@/lib/supabase-server";
import EliminatoriaForm from "./EliminatoriaForm";
import DescargarFase from "./DescargarFase";
import BracketEliminatoria from "./BracketEliminatoria";
import ResultadoForm from "../resultados/ResultadoForm";
import Link from "next/link";

const ORDEN_FASE: Record<string, number> = {
  dieciseisavos: 1,
  octavos: 2,
  cuartos: 3,
  semifinal: 4,
  final: 5,
};

export default async function EliminatoriaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: campeonatoId } = await params;
  const supabase = await createClient();

  const { data: campeonato } = await supabase
    .from("campeonatos")
    .select("nombre")
    .eq("id", campeonatoId)
    .single();

  const { data: partidos } = await supabase
    .from("partidos")
    .select(
      "id, fase, llave, vuelta, fecha, hora, jugado, gol_local, gol_visitante, equipo_local:equipo_local_id(nombre), equipo_visitante:equipo_visitante_id(nombre)"
    )
    .eq("campeonato_id", campeonatoId)
    .neq("fase", "grupos");

  const fases = Array.from(new Set((partidos ?? []).map((p: any) => p.fase))).sort(
    (a: any, b: any) => (ORDEN_FASE[a] ?? 99) - (ORDEN_FASE[b] ?? 99)
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link
        href={`/dashboard/editar/${campeonatoId}/resultados`}
        className="text-sm text-blue-600 hover:underline"
      >
        ← Volver a resultados
      </Link>

      <h1 className="text-2xl font-bold mt-2 mb-1">Fase eliminatoria</h1>
      <p className="text-gray-600 mb-6">{campeonato?.nombre}</p>

      <EliminatoriaForm campeonatoId={campeonatoId} />

      {fases.length > 0 && (
        <>
          <div className="border rounded-xl bg-zinc-50 p-4 mb-8">
            <BracketEliminatoria partidos={partidos as any} />
          </div>

          <div className="space-y-8">
            {fases.map((fase: any) => {
              const partidosDeEstaFase = (partidos ?? []).filter((p: any) => p.fase === fase);
              const llaves = Array.from(
                new Set(partidosDeEstaFase.map((p: any) => p.llave))
              ).sort((a: any, b: any) => a - b);

              return (
                <div key={fase}>
                  <h3 className="font-semibold text-lg mb-3 capitalize">{fase}</h3>

                  <DescargarFase
                    nombreCampeonato={campeonato?.nombre ?? "Campeonato"}
                    fase={fase}
                    partidos={partidosDeEstaFase as any}
                  />

                  <div className="space-y-3 mt-4">
                    {llaves.map((llave: any) => (
                      <div key={llave} className="space-y-2">
                        {partidosDeEstaFase
                          .filter((p: any) => p.llave === llave)
                          .map((p: any) => (
                            <ResultadoForm key={p.id} partido={p} campeonatoId={campeonatoId} />
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}