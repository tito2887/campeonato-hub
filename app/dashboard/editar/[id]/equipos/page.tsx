import { createClient } from "@/lib/supabase-server";
import EquipoForm from "./EquipoForm";
import EquiposList from "./EquiposList";
import Link from "next/link";

export default async function EquiposPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: campeonatoId } = await params;
  const supabase = await createClient();

  const { data: campeonato } = await supabase
    .from("campeonatos")
    .select("nombre")
    .eq("id", campeonatoId)
    .single();

  const { data: equipos } = await supabase
    .from("equipos")
    .select("id, nombre, escudo_url")
    .eq("campeonato_id", campeonatoId)
    .order("nombre");

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link href={`/dashboard/editar/${campeonatoId}`} className="text-sm text-blue-600 hover:underline">
        ← Volver a editar campeonato
      </Link>

      <h1 className="text-2xl font-bold mt-2 mb-1">Equipos</h1>
      <p className="text-gray-600 mb-6">{campeonato?.nombre}</p>

      <EquipoForm campeonatoId={campeonatoId} />
      <EquiposList equipos={equipos ?? []} campeonatoId={campeonatoId} />
    </div>
  );
}