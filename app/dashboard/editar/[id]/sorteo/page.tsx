import { createClient } from "@/lib/supabase-server";
import SorteoForm from "./SorteoForm";
import Link from "next/link";

export default async function SorteoPage({
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

  const { data: equipos } = await supabase
    .from("equipos")
    .select("id, nombre, grupo, escudo_url")
    .eq("campeonato_id", campeonatoId)
    .order("grupo")
    .order("nombre");

  const { data: partidos } = await supabase
    .from("partidos")
    .select(
      "id, grupo, equipo_local:equipo_local_id(nombre), equipo_visitante:equipo_visitante_id(nombre)"
    )
    .eq("campeonato_id", campeonatoId)
    .order("grupo");

  const grupoNumeros = Array.from(
    new Set((equipos ?? []).map((e) => e.grupo).filter((g) => g !== null))
  ).sort((a, b) => (a as number) - (b as number));

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link
        href={`/dashboard/editar/${campeonatoId}/equipos`}
        className="text-sm text-blue-600 hover:underline"
      >
        ← Volver a equipos
      </Link>

      <h1 className="text-2xl font-bold mt-2 mb-1">Sorteo y grupos</h1>
      <p className="text-gray-600 mb-6">{campeonato?.nombre}</p>

      <SorteoForm campeonatoId={campeonatoId} totalEquipos={equipos?.length ?? 0} />

      {grupoNumeros.length > 0 && (
        <div className="space-y-6">
          {grupoNumeros.map((numeroGrupo) => (
            <div key={numeroGrupo}>
              <h3 className="font-semibold mb-2">Grupo {numeroGrupo}</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                {equipos
                  ?.filter((e) => e.grupo === numeroGrupo)
                  .map((equipo) => (
                    <div
                      key={equipo.id}
                      className="border rounded px-3 py-2 text-sm flex items-center gap-2"
                    >
                      {equipo.escudo_url && (
                        <img
                          src={equipo.escudo_url}
                          alt=""
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      )}
                      {equipo.nombre}
                    </div>
                  ))}
              </div>

              <div className="text-sm space-y-1">
                {partidos
                  ?.filter((p) => p.grupo === numeroGrupo)
                  .map((partido: any) => (
                    <div key={partido.id} className="text-gray-600">
                      {partido.equipo_local?.nombre} vs {partido.equipo_visitante?.nombre}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}