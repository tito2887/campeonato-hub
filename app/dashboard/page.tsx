import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import EliminarCampeonatoBoton from "./EliminarCampeonatoBoton";

const ESTADOS = {
  sin_sorteo: { texto: "Sin sorteo", clases: "bg-zinc-100 text-zinc-600" },
  grupos: { texto: "Fase de grupos", clases: "bg-blue-100 text-blue-700" },
  eliminatoria: { texto: "Fase eliminatoria", clases: "bg-purple-100 text-purple-700" },
  finalizado: { texto: "Finalizado", clases: "bg-green-100 text-green-700" },
} as const;

function calcularEstado(lista: any[]) {
  const total = lista.length;
  const jugados = lista.filter((p) => p.jugado).length;
  const finales = lista.filter((p) => p.fase === "final");
  const hayEliminatoria = lista.some((p) => p.fase && p.fase !== "grupos");

  let estado: keyof typeof ESTADOS = "grupos";
  if (total === 0) {
    estado = "sin_sorteo";
  } else if (finales.length > 0 && finales.every((p) => p.jugado)) {
    estado = "finalizado";
  } else if (hayEliminatoria) {
    estado = "eliminatoria";
  }

  const porcentaje = total > 0 ? Math.round((jugados / total) * 100) : 0;
  return { total, jugados, estado, porcentaje };
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: misCampeonatos } = await supabase
    .from("campeonatos")
    .select("id, nombre, categoria, canton, provincia, equipos(count)")
    .eq("organizador_id", user.id)
    .order("created_at", { ascending: true });

  const { data: misInscripciones } = await supabase
    .from("inscripciones")
    .select("nombre_equipo, campeonato_id, campeonatos(id, nombre, categoria)")
    .eq("usuario_id", user.id);

  const idsCampeonatos = (misCampeonatos ?? []).map((c: any) => c.id);

  let partidosDeMisCampeonatos: any[] = [];
  if (idsCampeonatos.length > 0) {
    const { data } = await supabase
      .from("partidos")
      .select("campeonato_id, jugado, fase")
      .in("campeonato_id", idsCampeonatos);
    partidosDeMisCampeonatos = data ?? [];
  }

  const totalEquipos = (misCampeonatos ?? []).reduce(
    (acc: number, c: any) => acc + (c.equipos?.[0]?.count ?? 0),
    0
  );

  return (
    <div className="min-h-full bg-zinc-50">
      <div className="bg-zinc-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-6 flex gap-8 text-sm">
          <div>
            <p className="text-2xl font-bold">{misCampeonatos?.length ?? 0}</p>
            <p className="text-zinc-400">Campeonatos creados</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{totalEquipos}</p>
            <p className="text-zinc-400">Equipos registrados</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{misInscripciones?.length ?? 0}</p>
            <p className="text-zinc-400">Inscripciones activas</p>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-10">
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-900">Mis campeonatos</h2>
              <p className="text-sm text-zinc-500">
                {misCampeonatos?.length ?? 0} campeonato(s) creado(s)
              </p>
            </div>
            <Link
              href="/dashboard/nuevo"
              className="inline-flex items-center gap-2 bg-black text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-zinc-800 transition-colors"
            >
              + Crear campeonato
            </Link>
          </div>

          {!misCampeonatos || misCampeonatos.length === 0 ? (
            <div className="border-2 border-dashed border-zinc-300 rounded-xl p-10 text-center">
              <p className="text-zinc-500 mb-4">Aún no has creado ningún campeonato.</p>
              <Link
                href="/dashboard/nuevo"
                className="inline-block bg-black text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-zinc-800"
              >
                Crear el primero
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {misCampeonatos.map((camp: any) => {
                const lista = partidosDeMisCampeonatos.filter(
                  (p) => p.campeonato_id === camp.id
                );
                const { total, jugados, estado, porcentaje } = calcularEstado(lista);
                const base = "/dashboard/editar/" + camp.id;

                return (
                  <div
                    key={camp.id}
                    className="bg-white border rounded-xl p-5 flex flex-col gap-4 hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-zinc-900">{camp.nombre}</h3>
                        <span
                          className={
                            "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full whitespace-nowrap " +
                            ESTADOS[estado].clases
                          }
                        >
                          {ESTADOS[estado].texto}
                        </span>
                      </div>
                      <p className="text-xs uppercase text-zinc-400 mt-1">{camp.categoria}</p>
                      {(camp.canton || camp.provincia) && (
                        <p className="text-xs text-zinc-500 mt-1">
                          {[camp.canton, camp.provincia].filter(Boolean).join(", ")}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-xs text-zinc-500">
                        <span>{camp.equipos?.[0]?.count ?? 0} equipos</span>
                        <span>
                          {total > 0 ? jugados + "/" + total + " partidos jugados" : "Sin partidos"}
                        </span>
                      </div>
                      {total > 0 && (
                        <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: porcentaje + "%" }}
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-3 pt-3 border-t">
                      <div className="flex gap-2">
                        <Link
                          href={base}
                          className="flex-1 text-center bg-black text-white rounded-full py-2 text-sm font-medium hover:bg-zinc-800 transition-colors"
                        >
                          Gestionar
                        </Link>
                        <Link
                          href={"/campeonatos/" + camp.id}
                          className="flex-1 text-center border border-zinc-300 rounded-full py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
                        >
                          Ver página pública
                        </Link>
                      </div>

                      <div className="flex gap-4 text-xs text-zinc-500">
                        <Link href={base + "/equipos"} className="hover:text-zinc-900 hover:underline">
                          Equipos
                        </Link>
                        <Link href={base + "/partidos"} className="hover:text-zinc-900 hover:underline">
                          Partidos
                        </Link>
                        <Link href={base + "/datos"} className="hover:text-zinc-900 hover:underline">
                          Datos
                        </Link>
                      </div>

                      <div className="flex justify-end">
                        <EliminarCampeonatoBoton campeonatoId={camp.id} nombre={camp.nombre} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-900">Mis inscripciones</h2>
              <p className="text-sm text-zinc-500">
                {misInscripciones?.length ?? 0} inscripción(es)
              </p>
            </div>
            <Link
              href="/campeonatos"
              className="inline-flex items-center gap-2 border border-zinc-300 rounded-full px-5 py-2.5 text-sm font-medium hover:bg-zinc-100 transition-colors"
            >
              Explorar campeonatos
            </Link>
          </div>

          {!misInscripciones || misInscripciones.length === 0 ? (
            <div className="border-2 border-dashed border-zinc-300 rounded-xl p-10 text-center">
              <p className="text-zinc-500 mb-4">Todavía no te has inscrito a ningún campeonato.</p>
              <Link
                href="/campeonatos"
                className="inline-block bg-black text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-zinc-800"
              >
                Ver campeonatos disponibles
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {misInscripciones.map((insc: any) => (
                <div
                  key={insc.campeonato_id}
                  className="bg-white border rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
                >
                  <div>
                    <h3 className="font-semibold text-zinc-900">{insc.campeonatos?.nombre}</h3>
                    <p className="text-xs text-zinc-500 mt-1">Equipo: {insc.nombre_equipo}</p>
                  </div>
                  <Link
                    href={"/campeonatos/" + insc.campeonato_id}
                    className="text-sm font-medium text-blue-600 hover:underline pt-2 border-t"
                  >
                    Ver campeonato
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}