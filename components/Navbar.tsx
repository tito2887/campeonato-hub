import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import CerrarSesionBoton from "@/components/CerrarSesionBoton";

export default async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let nombre: string | null = null;

  if (user) {
    const { data: perfil } = await supabase
      .from("perfiles")
      .select("nombre")
      .eq("id", user.id)
      .single();

    nombre = perfil?.nombre ?? user.email ?? "Usuario";
  }

  return (
    <nav className="border-b bg-white">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          Campeonato Hub
        </Link>

        {user ? (
          <div className="flex items-center gap-4 text-sm">
            <Link href="/dashboard" className="hover:underline">
              Hola, {nombre}
            </Link>
            <CerrarSesionBoton />
          </div>
        ) : (
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
        )}
      </div>
    </nav>
  );
}