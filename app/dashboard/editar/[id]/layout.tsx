import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import TabsNav from "./TabsNav";

export default async function EditarCampeonatoLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: campeonato } = await supabase
    .from("campeonatos")
    .select("id, nombre, organizador_id")
    .eq("id", id)
    .single();

  if (!campeonato || campeonato.organizador_id !== user.id) {
    return (
      <main className="max-w-lg mx-auto px-6 py-10">
        <p className="text-red-600 mb-4">
          No tienes permiso para editar este campeonato.
        </p>
        <Link href="/dashboard" className="text-blue-600 hover:underline text-sm">
          ← Volver al panel
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <Link
        href="/dashboard"
        className="inline-block text-blue-600 hover:underline text-sm mb-4"
      >
        ← Volver al panel
      </Link>

      <h1 className="text-2xl font-bold mb-4">{campeonato.nombre}</h1>

      <TabsNav campeonatoId={campeonato.id} />

      <div className="mt-6">{children}</div>
    </main>
  );
}