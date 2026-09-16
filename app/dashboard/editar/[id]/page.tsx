import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { calcularTabla, type Partido, type Puntos } from "./resultados/TablaPosiciones";

export default async function ResumenCampeonatoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: campeonatoId } = await params;
  const supabase = await createClient();

  const { data: campeonato } = await supabase
    .from("campeonatos")
    .select("puntos_victoria, puntos_empate, puntos_derrota")
    .eq("id", campeonatoId)
    .single();

  const { data: equipos } = await supabase
    .from("equipos")
    .select("id, nombre, grupo, escudo_url")
    .eq("campeonato_id", campeonatoId);

  const { data: partidos } = await supabase
    .from("partidos")
    .select(
      "id, grupo, jugado, gol_local, gol_visitante, equipo_local_id, equipo_visitante_id, equipo_local:equipo_local_id(nombre), equipo_visitante:equipo_visitante_id(nombre)"
    )
    .eq("campeonato_id", campeonatoId)
    .order("grupo");

  const puntos: Puntos = {
    puntos_victoria: campeonato?.puntos_victoria ?? 3,
    puntos_empate: campeonato?.puntos_empate ?? 1,
    puntos_derrota: campeonato?.puntos_derrota ?? 0,
  };

  const grupoNumeros = Array.from(
    new Set((equipos ?? []).map((e) => e.grupo).filter((g) => g !== null))
  ).sort((a, b) => (a as number) - (b as number)) as number[];

  if (grupoNumeros.length === 0) {
    return (
      <div>
        <p className="text-gray-500 mb-4">
          Todavía no hay grupos generados para este campeonato.
        </p>
        <Link
          href={`/dashboard/editar/${campeonatoId}/equipos`}
          className="text-blue-600 hover:underline text-sm"
        >
          Empezar registrando equipos →
        </Link>
      </div>
    );
  }

  const todosPartidos = (partidos ?? []) as any[];
  const proximos = todosPartidos.filter((p) => !p.jugado).slice(0, 5);
  const jugados = todosPartidos.filter((p) => p.jugado).slice(-5).reverse();

  return (
    <div className="flex flex-col gap-8">
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Próximos partidos</h2>
          <Link href={`/dashboard/editar/${campeonatoId}/sorteo`} className="text-sm text-blue-600 hover:underline">
            Ver todos →
          </Link>
        </div>
        {proximos.length === 0 ? (
          <p className="text-sm text-gray-500">No hay partidos pendientes.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {proximos.map((p) => (
              <li key={p.id} className="border rounded-lg px-4 py-2 text-sm flex justify-between">
                <span>{p.equipo_local?.nombre} vs {p.equipo_visitante?.nombre}</span>
                <span className="text-gray-400">Grupo {p.grupo}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Últimos resultados</h2>
          <Link href={`/dashboard/editar/${campeonatoId}/resultados`} className="text-sm text-blue-600 hover:underline">
            Cargar / ver todos →
          </Link>
        </div>
        {jugados.length === 0 ? (
          <p className="text-sm text-gray-500">Todavía no se ha jugado ningún partido.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {jugados.map((p) => (
              <li key={p.id} className="border rounded-lg px-4 py-2 text-sm flex justify-between">
                <span>{p.equipo_local?.nombre} {p.gol_local} - {p.gol_visitante} {p.equipo_visitante?.nombre}</span>
                <span className="text-gray-400">Grupo {p.grupo}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Tabla de posiciones</h2>
          <Link href={`/dashboard/editar/${campeonatoId}/resultados`} className="text-sm text-blue-600 hover:underline">
            Ver completa y descargar →
          </Link>
        </div>
        <div className="flex flex-col gap-6">
          {grupoNumeros.map((numeroGrupo) => {
            const equiposDelGrupo = (equipos ?? []).filter((e) => e.grupo === numeroGrupo);
            const partidosDelGrupo = todosPartidos.filter((p) => p.grupo === numeroGrupo) as Partido[];
            const tabla = calcularTabla(equiposDelGrupo as any, partidosDelGrupo, puntos).slice(0, 3);

            return (
              <div key={numeroGrupo}>
                <p className="text-sm font-medium text-gray-500 mb-2">Grupo {numeroGrupo}</p>
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    {tabla.map((fila, i) => (
                      <tr key={fila.equipoId} className="border-b">
                        <td className="py-1.5 pr-2 text-gray-400 w-6">{i + 1}</td>
                        <td className="py-1.5">{fila.nombre}</td>
                        <td className="py-1.5 text-right font-semibold">{fila.pts} pts</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}