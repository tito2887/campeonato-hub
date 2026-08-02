import CampeonatosFiltrados from "@/components/CampeonatosFiltrados";

export default function CampeonatosPage() {
  const campeonatos = [
    {
      id: "elite",
      nombre: "El Mundialito",
      descripcion: "Categoría de alto nivel futbolístico, formato tipo selecciones.",
    },
    {
      id: "medio-bajo",
      nombre: "Copa Sudamericana",
      descripcion: "Categoría de nivel medio y bajo, formato tipo Copa Sudamericana.",
    },
    {
      id: "femenino",
      nombre: "El Mundialito Femenino",
      descripcion: "Categoría femenina, formato tipo selecciones.",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Campeonatos</h1>
      <CampeonatosFiltrados campeonatos={campeonatos} />
    </main>
  );
}