import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export default async function ExplorarCampeonatosPage() {
  const supabase = await createClient();

  const { data: campeonatos } = await supabase
    .from("campeonatos")
    .select("id, nombre, categoria, descripcion, equipos(count)")
    .order("created_at", { ascending: false });

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-1">Explorar campeonatos</h1>
      <p className="text-gray-600 mb-8">
        Elige un campeonato para ver sus equipos o inscribirte.
      </p>

      {!campeonatos || campeonatos.length === 0 ? (
        <p className="text-gray-500">Todavía no hay campeonatos disponibles.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {campeonatos.map((campeonato: any) => (
            <Link
              key={campeonato.id}
              href={`/campeonatos/${campeonato.id}`}
              className="border rounded-xl p-5 hover:shadow-lg transition-shadow flex flex-col gap-1"
            >
              <h3 className="font-semibold text-lg">{campeonato.nombre}</h3>
              <p className="text-xs text-gray-400 uppercase">{campeonato.categoria}</p>
              {campeonato.descripcion && (
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                  {campeonato.descripcion}
                </p>
              )}
              <span className="text-xs text-gray-400 mt-3">
                {campeonato.equipos?.[0]?.count ?? 0} equipos inscritos
              </span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}