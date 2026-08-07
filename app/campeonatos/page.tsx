import Link from "next/link";

interface Pais {
  name: string;
  flags: {
    png: string;
  };
}

async function getPaises(): Promise<Pais[]> {
  try {
    const res = await fetch(
      "https://countries.dev/subregion/South%20America"
    );

    if (!res.ok) {
      throw new Error("La API no respondió correctamente");
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("Respuesta inesperada de la API:", data);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error al obtener países:", error);
    return [];
  }
}

export default async function CampeonatoDetallePage({
  params,
}: {
  params: { id: string };
}) {
  const paises = await getPaises();

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Detalle del campeonato</h1>
      <p className="text-gray-500 mb-8 font-mono text-sm">{params.id}</p>

      <h2 className="text-xl font-semibold mb-4">
        Selecciones participantes de referencia
      </h2>

      {paises.length === 0 ? (
        <p className="text-red-600 text-sm mb-8">
          No se pudieron cargar los países en este momento. Intenta de nuevo más tarde.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {paises.map((pais) => (
            <div
              key={pais.name}
              className="border rounded-md p-3 flex items-center gap-3"
            >
              <img
                src={pais.flags.png}
                alt={`Bandera de ${pais.name}`}
                className="w-8 h-6 object-cover rounded-sm"
              />
              <span className="text-sm">{pais.name}</span>
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