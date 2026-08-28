import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";

export default async function CampeonatoPublicoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: campeonato } = await supabase
    .from("campeonatos")
    .select("id, nombre, descripcion, socio")
    .eq("id", id)
    .single();

  if (!campeonato) {
    notFound();
  }

  const { data: equipos } = await supabase
    .from("equipos")
    .select("id, nombre, escudo_url")
    .eq("campeonato_id", id)
    .order("nombre");

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">{campeonato.nombre}</h1>
      {campeonato.descripcion && (
        <p className="text-gray-600 mb-1">{campeonato.descripcion}</p>
      )}
      {campeonato.socio && (
        <p className="text-sm text-gray-500 mb-6">Socio asociado: {campeonato.socio}</p>
      )}

      <h2 className="text-xl font-semibold mt-8 mb-3">Equipos inscritos</h2>

      {!equipos || equipos.length === 0 ? (
        <p className="text-gray-500">Todavía no hay equipos inscritos en este campeonato.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {equipos.map((equipo) => (
            <div
              key={equipo.id}
              className="border rounded-lg p-3 flex flex-col items-center text-center gap-2"
            >
              {equipo.escudo_url ? (
                <img
                  src={equipo.escudo_url}
                  alt={equipo.nombre}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                  S/E
                </div>
              )}
              <span className="font-medium text-sm">{equipo.nombre}</span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}