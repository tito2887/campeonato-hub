import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function Home() {
  const supabase = await createClient();

  const [{ count: totalCampeonatos }, { count: totalEquipos }, { count: totalJugadores }] =
    await Promise.all([
      supabase.from("campeonatos").select("*", { count: "exact", head: true }),
      supabase.from("equipos").select("*", { count: "exact", head: true }),
      supabase.from("jugadores").select("*", { count: "exact", head: true }),
    ]);

  const { data: campeonatosDestacados } = await supabase
    .from("campeonatos")
    .select("id, nombre, descripcion, equipos(count)")
    .order("id", { ascending: false })
    .limit(3);

  return (
    <div className="flex flex-col flex-1">
      {/* Hero */}
      <section className="bg-gradient-to-br from-zinc-900 to-zinc-700 text-white">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center flex flex-col items-center gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight max-w-2xl">
            Organiza tu campeonato como se debe
          </h1>
          <p className="max-w-xl text-lg text-zinc-300">
            Equipos, jugadores, sorteo de grupos y tabla de posiciones en tiempo real —
            todo en un solo lugar, sin límites artificiales.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/register"
              className="h-12 flex items-center justify-center rounded-full bg-white text-black px-8 font-medium hover:bg-zinc-200 transition-colors"
            >
              🏆 Crear mi campeonato
            </Link>
            <Link
              href="/campeonatos"
              className="h-12 flex items-center justify-center rounded-full border border-white px-8 font-medium hover:bg-white hover:text-black transition-colors"
            >
              Ver campeonatos activos
            </Link>
          </div>
        </div>
      </section>

      {/* Estadísticas reales */}
      <section className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold">{totalCampeonatos ?? 0}</p>
            <p className="text-sm text-zinc-500 mt-1">Campeonatos</p>
          </div>
          <div>
            <p className="text-3xl font-bold">{totalEquipos ?? 0}</p>
            <p className="text-sm text-zinc-500 mt-1">Equipos inscritos</p>
          </div>
          <div>
            <p className="text-3xl font-bold">{totalJugadores ?? 0}</p>
            <p className="text-sm text-zinc-500 mt-1">Jugadores registrados</p>
          </div>
        </div>
      </section>

      {/* Campeonatos destacados */}
      <section className="bg-zinc-50 flex-1">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Campeonatos destacados</h2>

          {!campeonatosDestacados || campeonatosDestacados.length === 0 ? (
            <p className="text-center text-zinc-500">
              Todavía no hay campeonatos publicados. ¡Sé el primero en crear uno!
            </p>
          ) : (
            <div className="grid sm:grid-cols-3 gap-6">
              {campeonatosDestacados.map((campeonato: any) => (
                <Link
                  key={campeonato.id}
                  href={`/campeonatos/${campeonato.id}`}
                  className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow flex flex-col gap-2"
                >
                  <h3 className="font-semibold text-lg">{campeonato.nombre}</h3>
                  {campeonato.descripcion && (
                    <p className="text-sm text-zinc-600 line-clamp-2">
                      {campeonato.descripcion}
                    </p>
                  )}
                  <span className="text-xs text-zinc-400 mt-2">
                    {campeonato.equipos?.[0]?.count ?? 0} equipos inscritos
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cierre para organizadores */}
      <section className="bg-black text-white">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold">¿Organizas torneos de fútbol?</h2>
          <p className="text-zinc-300 max-w-md">
            Deja de pelear con hojas de cálculo y límites de jugadores. Crea tu campeonato
            gratis y gestiona todo desde tu celular.
          </p>
          <Link
            href="/register"
            className="h-12 flex items-center justify-center rounded-full bg-white text-black px-8 font-medium hover:bg-zinc-200 transition-colors mt-2"
          >
            Empezar ahora
          </Link>
        </div>
      </section>
    </div>
  );
}