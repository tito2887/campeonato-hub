import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { eliminarCampeonato } from "./actions";

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

  return (
    <div className="min-h-full bg-zinc-50">
      <div className="bg-zinc-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-6 flex gap-8 text-sm">
          <div>
            <p className="text-2xl font-bold">{misCampeonatos?.length ?? 0}</p>
            <p className="text-zinc-400">Campeonatos creados</p>
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
              <p className="text-zinc-500 mb-4">Aun no has creado ningun campeonato.</p>
              <Link
                href="/dashboard/nuevo"
                className="inline-block bg-black text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-zinc-800"
              >
                Crear el primero
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {misCampeonatos.map((camp: any) => (
                <div
                  key={camp.id}
                  className="bg-white border rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-zinc-900">{camp.nombre}</h3>
                      <span className="text-xs uppercase text-zinc-400 whitespace-nowrap">
                        {camp.categoria}
                      </span>
                    </div>
                    {(camp.canton || camp.provincia) && (
                      <p className="text-xs text-zinc-500 mt-1">
                        {[camp.canton, camp.provincia].filter(Boolean).join(", ")}
                      </p>
                    )}
                    <p className="text-xs text-zinc-400 mt-1">
                      {camp.equipos?.[0]?.count ?? 0} equipos
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-2 border-t">
                    <Link
                      href={"/dashboard/editar/" + camp.id}
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <Link
                      href={"/campeonatos/" + camp.id}
                      className="text-sm font-medium text-zinc-600 hover:underline"
                    >
                      Ver pagina publica
                    </Link>
                    <form action={eliminarCampeonato} className="ml-auto">
                      <input type="hidden" name="campeonato_id" value={camp.id} />
                      <button
                        type="submit"
                        className="text-sm font-medium text-red-600 hover:underline"
                      >
                        Eliminar
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-900">Mis inscripciones</h2>
              <p className="text-sm text-zinc-500">
                {misInscripciones?.length ?? 0} inscripcion(es)
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
              <p className="text-zinc-500 mb-4">Todavia no te has inscrito a ningun campeonato.</p>
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
                    <p className="text-xs text-zinc-500 mt-1">
                      Equipo: {insc.nombre_equipo}
                    </p>
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