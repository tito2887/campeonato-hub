import { createClient } from "@/lib/supabase-server";
import SorteoForm from "../sorteo/SorteoForm";
import TablaPosiciones from "../resultados/TablaPosiciones";
import DescargarTabla from "../resultados/DescargarTabla";
import FechaGrupo from "./FechaGrupo";
import AgregarFechaForm from "./AgregarFechaForm";
import EliminatoriaSeccion from "./EliminatoriaSeccion";

export default async function PartidosPage({
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

  const nombreCampeonato = campeonato?.nombre ?? "Campeonato";

  const { data: equipos } = await supabase
    .from("equipos")
    .select("id, nombre, grupo, escudo_url")
    .eq("campeonato_id", campeonatoId)
    .order("grupo")
    .order("nombre");

  const { data: partidosGrupos } = await supabase
    .from("partidos")
    .select(
      "id, grupo, jornada, vuelta, fecha, hora, jugado, gol_local, gol_visitante, equipo_local_id, equipo_visitante_id, equipo_local:equipo_local_id(nombre, escudo_url), equipo_visitante:equipo_visitante_id(nombre, escudo_url)"
    )
    .eq("campeonato_id", campeonatoId)
    .eq("fase", "grupos")
    .order("jornada");

  const { data: partidosEliminatoria } = await supabase
    .from("partidos")
    .select(
      "id, fase, llave, vuelta, fecha, hora, jugado, gol_local, gol_visitante, equipo_local:equipo_local_id(nombre), equipo_visitante:equipo_visitante_id(nombre)"
    )
    .eq("campeonato_id", campeonatoId)
    .neq("fase", "grupos");

  const puntos = {
    puntos_victoria: campeonato?.puntos_victoria ?? 3,
    puntos_empate: campeonato?.puntos_empate ?? 1,
    puntos_derrota: campeonato?.puntos_derrota ?? 0,
  };

  const grupoNumeros = Array.from(
    new Set((equipos ?? []).map((e) => e.grupo).filter((g) => g !== null))
  ).sort((a, b) => (a as number) - (b as number)) as number[];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Partidos</h2>

      <SorteoForm campeonatoId={campeonatoId} totalEquipos={equipos?.length ?? 0} />

      {grupoNumeros.length > 0 && (
        <div className="space-y-10 mt-6">
          {grupoNumeros.map((numeroGrupo) => {
            const equiposDelGrupo = (equipos ?? []).filter((e) => e.grupo === numeroGrupo);
            const partidosDelGrupo = (partidosGrupos ?? []).filter((p: any) => p.grupo === numeroGrupo);

            const jornadas = Array.from(
              new Set(partidosDelGrupo.map((p: any) => p.jornada).filter((j) => j !== null))
            ).sort((a: any, b: any) => a - b) as number[];

            const siguienteJornada = jornadas.length > 0 ? Math.max(...jornadas) + 1 : 1;

            return (
              <div key={numeroGrupo}>
                <h3 className="font-semibold text-lg mb-2">Grupo {numeroGrupo}</h3>

                <TablaPosiciones
                  equipos={equiposDelGrupo as any}
                  partidos={partidosDelGrupo as any}
                  puntos={puntos}
                  numeroGrupo={numeroGrupo}
                />
                <DescargarTabla
                  equipos={equiposDelGrupo as any}
                  partidos={partidosDelGrupo as any}
                  puntos={puntos}
                  numeroGrupo={numeroGrupo}
                  nombreCampeonato={nombreCampeonato}
                />

                <div className="mt-4 space-y-2">
                  {jornadas.map((numeroJornada) => {
                    const partidosDeEstaFecha = partidosDelGrupo
                      .filter((p: any) => p.jornada === numeroJornada)
                      .sort((a: any, b: any) => {
                        if (!a.hora && !b.hora) return 0;
                        if (!a.hora) return 1;
                        if (!b.hora) return -1;
                        return a.hora.localeCompare(b.hora);
                      });

                    return (
                      <FechaGrupo
                        key={numeroJornada}
                        nombreCampeonato={nombreCampeonato}
                        numeroGrupo={numeroGrupo}
                        numeroJornada={numeroJornada}
                        partidos={partidosDeEstaFecha as any}
                        campeonatoId={campeonatoId}
                      />
                    );
                  })}

                  <AgregarFechaForm
                    campeonatoId={campeonatoId}
                    numeroGrupo={numeroGrupo}
                    siguienteJornada={siguienteJornada}
                    equipos={equiposDelGrupo.map((e) => ({ id: e.id, nombre: e.nombre }))}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <EliminatoriaSeccion
        campeonatoId={campeonatoId}
        nombreCampeonato={nombreCampeonato}
        partidosEliminatoria={(partidosEliminatoria ?? []) as any}
      />
    </div>
  );
}