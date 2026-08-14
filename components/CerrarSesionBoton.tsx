"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function CerrarSesionBoton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm border rounded-full px-4 py-2 hover:bg-gray-50"
    >
      Cerrar sesión
    </button>
  );
}