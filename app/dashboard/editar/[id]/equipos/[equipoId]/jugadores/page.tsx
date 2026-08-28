import { createClient } from "@/lib/supabase-server";
import JugadorForm from "./JugadorForm";
import JugadoresList from "./JugadoresList";
import Link from "next/link";

export default async function JugadoresPage({
  params,
}: {
  params: Promise<{ id: string; equipoId: string }>;
}) {
  const { id: campeonatoId, equipoId } = await params;
  const supabase = await createClient();

  const { data: equipo } = await supabase
    .from("equipos")
    .select("nombre")
    .eq("id", equipoId)
    .single();

  const { data: jugadores } = await supabase
    .from("jugadores")
    .select("id, nombre, numero, posicion")
    .eq("equipo_id", equipoId)
    .order("numero", { nullsFirst: false });

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link
        href={`/dashboard/editar/${campeonatoId}/equipos`}
        className="text-sm text-blue-600 hover:underline"
      >
        ← Volver a equipos
      </Link>

      <h1 className="text-2xl font-bold mt-2 mb-1">Jugadores</h1>
      <p className="text-gray-600 mb-6">{equipo?.nombre}</p>

      <JugadorForm equipoId={equipoId} campeonatoId={campeonatoId} />
      <JugadoresList
        jugadores={jugadores ?? []}
        equipoId={equipoId}
        campeonatoId={campeonatoId}
      />

      <p className="text-xs text-gray-400 mt-4">
        Total: {jugadores?.length ?? 0} jugadores — sin límite.
      </p>
    </div>
  );
}