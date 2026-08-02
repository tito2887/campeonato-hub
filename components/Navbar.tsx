import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          Campeonato Hub
        </Link>
        <div className="flex gap-6 text-sm">
          <Link href="/campeonatos" className="hover:underline">
            Campeonatos
          </Link>
          <Link href="/login" className="hover:underline">
            Iniciar sesión
          </Link>
          <Link href="/register" className="hover:underline">
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  );
}