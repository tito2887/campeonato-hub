import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import CampeonatoCercano from "@/components/CampeonatoCercano";

const WHATSAPP_NUMERO = "593968199644";

const caracteristicas = [
  "Generador automatico de partidos y sorteo de grupos",
  "Tabla de posiciones en tiempo real, sin limite de jugadores",
  "Criterios de desempate configurables",
  "Gestion de equipos y jugadores ilimitada",
  "Filtro por ubicacion: encuentra torneos cerca de ti",
  "Acceso publico por link para seguidores y familiares",
];

export default async function Home() {
  const supabase = await createClient();

  const [{ count: totalCampeonatos }, { count: totalEquipos }, { count: totalJugadores }] =
    await Promise.all([
      supabase.from("campeonatos").select("*", { count: "exact", head: true }),
      supabase.from("equipos").select("*", { count: "exact", head: true }),
      supabase.from("jugadores").select("*", { count: "exact", head: true }),
    ]);

  return (
    <div className="flex flex-col flex-1">
      <section className="bg-gradient-to-br from-zinc-900 to-zinc-700 text-white">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center flex flex-col items-center gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight max-w-2xl">
            Organiza tu campeonato como se debe
          </h1>
          <p className="max-w-xl text-lg text-zinc-300">
            Equipos, jugadores, sorteo de grupos y tabla de posiciones en tiempo real, todo en un solo lugar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link
              href="/register"
              className="h-12 flex items-center justify-center rounded-full bg-white text-black px-8 font-medium hover:bg-zinc-200 transition-colors"
            >
              Crear mi campeonato
            </Link>
            <Link
              href="/login"
              className="h-12 flex items-center justify-center rounded-full border border-white px-8 font-medium hover:bg-white hover:text-black transition-colors"
            >
              Ver mis campeonatos
            </Link>
          </div>

          <div className="w-full mt-4">
            <CampeonatoCercano />
          </div>
        </div>
      </section>

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

      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Todo para organizar tu torneo
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {caracteristicas.map((c) => (
              <div key={c} className="flex items-start gap-3">
                <span className="text-green-600 font-bold mt-0.5">OK</span>
                <span className="text-zinc-700">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-900 py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Buscas un torneo especifico?
          </h2>
          <p className="text-zinc-400 mb-6">
            Explora todos los campeonatos disponibles o filtra por tu zona.
          </p>
          <Link
            href="/campeonatos"
            className="inline-block bg-white text-black rounded-full px-8 py-3 font-medium hover:bg-zinc-200 transition-colors"
          >
            Explorar campeonatos
          </Link>
        </div>
      </section>

      <section className="bg-zinc-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Planes</h2>
          <p className="text-zinc-600 mb-8">
            Por ahora, Campeonato Hub es 100% gratis mientras seguimos mejorando.
          </p>
          <div className="inline-block border-2 border-dashed border-zinc-300 rounded-xl px-8 py-6">
            <p className="font-semibold text-lg">Planes con mas beneficios</p>
            <p className="text-sm text-zinc-500 mt-1">Proximamente</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 border-t">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-3">Se uno de los primeros organizadores</h2>
          <p className="text-zinc-600">
            Campeonato Hub esta creciendo. Los primeros organizadores que lo prueben ayudaran a darle forma a lo que viene.
          </p>
        </div>
      </section>

      <section className="bg-black text-white py-16">
        <div className="max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold">Tienes alguna pregunta?</h2>
          <p className="text-zinc-300">Escribenos y te respondemos lo antes posible.</p>
          <a href={"https://wa.me/" + WHATSAPP_NUMERO} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white rounded-full px-6 py-3 font-medium hover:bg-green-700 transition-colors mt-2">
            Chat en WhatsApp
          </a>
        </div>
      </section>

      <section className="bg-zinc-900 text-white">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold">Organizas torneos de futbol?</h2>
          <p className="text-zinc-300 max-w-md">
            Deja de pelear con hojas de calculo. Crea tu campeonato gratis y gestiona todo desde tu celular.
          </p>
          <Link
            href="/register"
            className="h-12 flex items-center justify-center rounded-full bg-white text-black px-8 font-medium hover:bg-zinc-200 transition-colors mt-2"
          >
            Empezar ahora
          </Link>
        </div>
      </section>

      <footer className="bg-zinc-100 py-10 border-t">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
          <p className="font-semibold text-zinc-800">Campeonato Hub</p>
          <div className="flex gap-6">
            <Link href="/campeonatos" className="hover:underline">Campeonatos</Link>
            <Link href="/login" className="hover:underline">Iniciar sesion</Link>
            <Link href="/register" className="hover:underline">Registrarse</Link>
          </div>
          <p>2026 Campeonato Hub</p>
        </div>
      </footer>
    </div>
  );
}