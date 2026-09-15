import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import NavbarMenu from "@/components/NavbarMenu";

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
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg whitespace-nowrap">
          Campeonato Hub
        </Link>

        <NavbarMenu logueado={!!user} nombre={nombre} />
      </div>
    </nav>
  );
}