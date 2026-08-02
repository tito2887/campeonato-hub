import Link from "next/link";

export default function CampeonatosPage() {
  const campeonatos = [
    {
      id: "elite",
      nombre: "Campeonato Élite",
      descripcion: "Categoría de alto nivel futbolístico, formato tipo selecciones.",
    },
    {
      id: "medio-bajo",
      nombre: "Copa Sudamericana",
      descripcion: "Categoría de nivel medio y bajo, formato tipo Copa Sudamericana.",
    },
    {
      id: "femenino",
      nombre: "Campeonato Femenino",
      descripcion: "Categoría femenina, formato tipo selecciones.",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Campeonatos</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {campeonatos.map((camp) => (
          <Link
            key={camp.id}
            href={`/campeonatos/${camp.id}`}
            className="border rounded-lg p-5 hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{camp.nombre}</h2>
            <p className="text-gray-600 text-sm">{camp.descripcion}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}