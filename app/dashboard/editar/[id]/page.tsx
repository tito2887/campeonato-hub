import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { calcularTabla, type Partido, type Puntos } from "./resultados/TablaPosiciones";

function EscudoMini({ escudoUrl, nombre }: { escudoUrl?: string | null; nombre: string }) {
  if (escudoUrl) {
    return (
      <img
        src={escudoUrl}
        alt={nombre}
        className="w-5 h-5 rounded-full object-cover inline-block mr-2 align-middle"
      />
    );
  }
  return (
    <span className="w-5 h-5 rounded-full bg-zinc-200 text-zinc-500 text-[8px] inline-flex items-center justify-center mr-2 align-middle">
      S/E
    </span>
  );
}

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
    .eq("fase", "grupos")
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

  return (
    <div className="flex flex-col gap-8">
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Tabla de posiciones</h2>
          <Link
            href={`/dashboard/editar/${campeonatoId}/partidos`}
            className="text-sm text-blue-600 hover:underline"
          >
            Ver completa y descargar →
          </Link>
        </div>

        <div className="flex flex-col gap-5">
          {grupoNumeros.map((numeroGrupo) => {
            const equiposDelGrupo = (equipos ?? []).filter((e) => e.grupo === numeroGrupo);
            const partidosDelGrupo = todosPartidos.filter(
              (p) => p.grupo === numeroGrupo
            ) as Partido[];
            const tabla = calcularTabla(equiposDelGrupo as any, partidosDelGrupo, puntos);

            return (
              <div key={numeroGrupo} className="border rounded-xl overflow-hidden shadow-sm">
                <div className="bg-zinc-900 text-white px-4 py-2.5 flex items-center justify-between">
                  <p className="font-semibold text-sm">Grupo {numeroGrupo}</p>
                  <p className="text-[11px] text-zinc-400">{tabla.length} equipos</p>
                </div>

                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-zinc-100 text-zinc-500 text-[10px] uppercase">
                      <th className="py-2 px-2 text-left w-8">Pos</th>
                      <th className="py-2 px-2 text-left">Equipo</th>
                      <th className="py-2 px-1">PJ</th>
                      <th className="py-2 px-1">G</th>
                      <th className="py-2 px-1">E</th>
                      <th className="py-2 px-1">P</th>
                      <th className="py-2 px-1">DIF</th>
                      <th className="py-2 px-2">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tabla.map((fila: any, i: number) => {
                      const equipo = equiposDelGrupo.find((e) => e.id === fila.equipoId);
                      return (
                        <tr key={fila.equipoId} className={i % 2 === 1 ? "bg-zinc-50" : "bg-white"}>
                          <td className="py-2 px-2">
                            <span
                              className={
                                "inline-flex items-center justify-center w-5 h-5 rounded text-[10px] font-bold " +
                                (i === 0 ? "bg-yellow-400 text-black" : "bg-zinc-900 text-white")
                              }
                            >
                              {i + 1}
                            </span>
                          </td>
                          <td className="py-2 px-2 font-medium">
                            <EscudoMini escudoUrl={equipo?.escudo_url} nombre={fila.nombre} />
                            {fila.nombre}
                          </td>
                          <td className="py-2 px-1 text-center">{fila.jj}</td>
                          <td className="py-2 px-1 text-center text-green-600 font-medium">{fila.jg}</td>
                          <td className="py-2 px-1 text-center text-gray-500">{fila.je}</td>
                          <td className="py-2 px-1 text-center text-red-500 font-medium">{fila.jp}</td>
                          <td
                            className={
                              "py-2 px-1 text-center " +
                              (fila.dif > 0
                                ? "text-green-600"
                                : fila.dif < 0
                                ? "text-red-500"
                                : "text-gray-500")
                            }
                          >
                            {fila.dif > 0 ? "+" + fila.dif : fila.dif}
                          </td>
                          <td className="py-2 px-2 text-center font-bold text-blue-700 bg-blue-50">
                            {fila.pts}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Próximos partidos</h2>
          <Link
            href={`/dashboard/editar/${campeonatoId}/partidos`}
            className="text-sm text-blue-600 hover:underline"
          >
            Ver todos →
          </Link>
        </div>

        {grupoNumeros.map((numeroGrupo) => {
          const proximosDelGrupo = todosPartidos
            .filter((p) => p.grupo === numeroGrupo && !p.jugado)
            .slice(0, 5);

          if (proximosDelGrupo.length === 0) return null;

          return (
            <div key={numeroGrupo} className="mb-4">
              <p className="text-xs font-semibold text-gray-500 mb-2">Grupo {numeroGrupo}</p>
              <ul className="flex flex-col gap-2">
                {proximosDelGrupo.map((p) => (
                  <li key={p.id} className="border rounded-lg px-4 py-2 text-sm">
                    {p.equipo_local?.nombre} vs {p.equipo_visitante?.nombre}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        {todosPartidos.filter((p) => !p.jugado).length === 0 && (
          <p className="text-sm text-gray-500">No hay partidos pendientes.</p>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Últimos resultados</h2>
          <Link
            href={`/dashboard/editar/${campeonatoId}/partidos`}
            className="text-sm text-blue-600 hover:underline"
          >
            Cargar / ver todos →
          </Link>
        </div>

        {grupoNumeros.map((numeroGrupo) => {
          const jugadosDelGrupo = todosPartidos
            .filter((p) => p.grupo === numeroGrupo && p.jugado)
            .slice(-5)
            .reverse();

          if (jugadosDelGrupo.length === 0) return null;

          return (
            <div key={numeroGrupo} className="mb-4">
              <p className="text-xs font-semibold text-gray-500 mb-2">Grupo {numeroGrupo}</p>
              <ul className="flex flex-col gap-2">
                {jugadosDelGrupo.map((p) => (
                  <li key={p.id} className="border rounded-lg px-4 py-2 text-sm">
                    {p.equipo_local?.nombre} {p.gol_local} - {p.gol_visitante}{" "}
                    {p.equipo_visitante?.nombre}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        {todosPartidos.filter((p) => p.jugado).length === 0 && (
          <p className="text-sm text-gray-500">Todavía no se ha jugado ningún partido.</p>
        )}
      </section>
    </div>
  );
}