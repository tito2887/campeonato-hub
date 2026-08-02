import Link from "next/link";

interface CampeonatoCardProps {
  id: string;
  nombre: string;
  descripcion: string;
}

export default function CampeonatoCard({
  id,
  nombre,
  descripcion,
}: CampeonatoCardProps) {
  return (
    <Link
      href={`/campeonatos/${id}`}
      className="border rounded-lg p-5 hover:shadow-md transition-shadow"
    >
      <h2 className="text-xl font-semibold mb-2">{nombre}</h2>
      <p className="text-gray-600 text-sm">{descripcion}</p>
    </Link>
  );
}