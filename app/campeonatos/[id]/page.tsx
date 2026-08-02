import Link from "next/link";

export default function CampeonatoDetallePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">Detalle del campeonato</h1>
      <p className="text-gray-600 mb-6">
        ID recibido desde la URL: <span className="font-mono">{params.id}</span>
      </p>
      <Link
        href="/campeonatos"
        className="text-blue-600 hover:underline text-sm"
      >
        ← Volver al listado
      </Link>
    </main>
  );
}