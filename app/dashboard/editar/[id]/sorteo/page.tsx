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
      "id, grupo, jornada, vuelta, equipo_local:equipo_local_id(nombre), equipo_visitante:equipo_visitante_id(nombre)"
    )
    .eq("campeonato_id", campeonatoId)
    .order("grupo")
    .order("jornada");

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
        <div className="space-y-10">
          {grupoNumeros.map((numeroGrupo) => {
            const equiposDelGrupo = equipos?.filter((e) => e.grupo === numeroGrupo) ?? [];
            const partidosDelGrupo = (partidos ?? []).filter((p: any) => p.grupo === numeroGrupo);

            const jornadas = Array.from(
              new Set(partidosDelGrupo.map((p: any) => p.jornada).filter((j) => j !== null))
            ).sort((a: any, b: any) => a - b) as number[];

            return (
              <div key={numeroGrupo}>
                <h3 className="font-semibold text-lg mb-3">Grupo {numeroGrupo}</h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                  {equiposDelGrupo.map((equipo) => (
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

                <div className="space-y-4">
                  {jornadas.map((numeroJornada) => {
                    const partidosDeEstaFecha = partidosDelGrupo.filter(
                      (p: any) => p.jornada === numeroJornada
                    );

                    return (
                      <div
                        key={numeroJornada}
                        className="border rounded-xl overflow-hidden shadow-sm"
                      >
                        <div className="bg-zinc-900 text-white px-4 py-2.5 flex items-center justify-between">
                          <p className="font-semibold text-sm">Fecha {numeroJornada}</p>
                          <button
                            disabled
                            title="Próximamente"
                            className="text-[11px] bg-white/10 text-white/50 px-3 py-1 rounded-full cursor-not-allowed"
                          >
                            Descargar
                          </button>
                        </div>

                        <div className="divide-y">
                          {partidosDeEstaFecha.map((partido: any) => (
                            <div
                              key={partido.id}
                              className="flex items-center justify-between px-4 py-2.5 text-sm"
                            >
                              <span className="flex-1 text-right pr-3">
                                {partido.equipo_local?.nombre}
                              </span>
                              <span className="text-gray-400 text-xs px-2">vs</span>
                              <span className="flex-1 pl-3">
                                {partido.equipo_visitante?.nombre}
                              </span>
                              {partido.vuelta && partido.vuelta !== "unico" && (
                                <span
                                  className={
                                    "ml-3 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full " +
                                    (partido.vuelta === "ida"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-purple-100 text-purple-700")
                                  }
                                >
                                  {partido.vuelta}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}