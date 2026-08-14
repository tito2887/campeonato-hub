import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

interface ItemVisual {
  nombre: string;
  imagen: string;
}

async function getPaises(): Promise<ItemVisual[]> {
  try {
    const res = await fetch("https://countries.dev/subregion/South%20America");

    if (!res.ok) {
      throw new Error("La API no respondió correctamente");
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("Respuesta inesperada de la API:", data);
      return [];
    }

    return data.map((pais: { name: string; flags: { png: string } }) => ({
      nombre: pais.name,
      imagen: pais.flags.png,
    }));
  } catch (error) {
    console.error("Error al obtener países:", error);
    return [];
  }
}

const CLUBES_SUDAMERICANOS = [
  "Boca Juniors",
  "River Plate",
  "Flamengo",
  "Penarol",
  "Nacional Montevideo",
  "LDU Quito",
  "Barcelona SC",
  "Colo-Colo",
];

async function getClubesSudamericanos(): Promise<ItemVisual[]> {
  try {
    const resultados = await Promise.all(
      CLUBES_SUDAMERICANOS.map(async (nombreClub) => {
        try {
          const res = await fetch(
            `https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=${encodeURIComponent(
              nombreClub
            )}`
          );

          if (!res.ok) return null;

          const data = await res.json();
          const equipo = data?.teams?.[0];

          if (!equipo || !equipo.strBadge) return null;

          return {
            nombre: equipo.strTeam as string,
            imagen: equipo.strBadge as string,
          };
        } catch {
          return null;
        }
      })
    );

    return resultados.filter((r): r is ItemVisual => r !== null);
  } catch (error) {
    console.error("Error al obtener clubes sudamericanos:", error);
    return [];
  }
}

export default async function CampeonatoDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: campeonato, error } = await supabase
    .from("campeonatos")
    .select("id, nombre, descripcion, categoria, socio")
    .eq("id", id)
    .single();

  if (error || !campeonato) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-4">Campeonato no encontrado</h1>
        <Link href="/campeonatos" className="text-blue-600 hover:underline text-sm">
          ← Volver al listado
        </Link>
      </main>
    );
  }

  const esCopaSudamericana = campeonato.categoria === "medio-bajo";

  const items = esCopaSudamericana
    ? await getClubesSudamericanos()
    : await getPaises();

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">{campeonato.nombre}</h1>
      <p className="text-gray-600 mb-8">{campeonato.descripcion}</p>

      <Link
        href={`/campeonatos/${campeonato.id}/inscribirse`}
        className="inline-block bg-black text-white rounded-full px-6 py-2 mb-8"
      >
        Inscribirme a este campeonato
      </Link>

      <h2 className="text-xl font-semibold mb-4">
        {esCopaSudamericana
          ? "Equipos sudamericanos de referencia"
          : "Selecciones participantes de referencia"}
      </h2>

      {items.length === 0 ? (
        <p className="text-red-600 text-sm mb-8">
          No se pudo cargar la información en este momento. Intenta de nuevo más tarde.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {items.map((item) => (
            <div
              key={item.nombre}
              className="border rounded-md p-3 flex items-center gap-3"
            >
              <img
                src={item.imagen}
                alt={item.nombre}
                className="w-10 h-10 object-contain"
              />
              <span className="text-sm">{item.nombre}</span>
            </div>
          ))}
        </div>
      )}

      <Link href="/campeonatos" className="text-blue-600 hover:underline text-sm">
        ← Volver al listado
      </Link>
    </main>
  );
}