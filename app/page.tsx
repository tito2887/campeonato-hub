import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center gap-6 py-32 px-16 bg-white text-center">
        <h1 className="max-w-lg text-4xl font-bold leading-tight tracking-tight text-black">
          Campeonato Hub
        </h1>
        <p className="max-w-md text-lg leading-8 text-zinc-600">
          Conoce nuestros campeonatos de fútbol e inscríbete para participar en las
          próximas ediciones: El Mundialito, Copa Sudamericana y El Mundialito Femenino.
        </p>
        <Link
          href="/campeonatos"
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-black px-8 text-white transition-colors hover:bg-zinc-800"
        >
          Ver campeonatos
        </Link>
      </main>
    </div>
  );
}
