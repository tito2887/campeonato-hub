import { createClient } from "@/lib/supabase";
import CampeonatosFiltrados from "@/components/CampeonatosFiltrados";

export const dynamic = "force-dynamic";

export default async function CampeonatosPage() {
  const supabase = createClient();

  const { data: campeonatos, error } = await supabase
    .from("campeonatos")
    .select("id, nombre, descripcion")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error al obtener campeonatos:", error);
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Campeonatos</h1>
      <CampeonatosFiltrados campeonatos={campeonatos ?? []} />
    </main>
  );
}