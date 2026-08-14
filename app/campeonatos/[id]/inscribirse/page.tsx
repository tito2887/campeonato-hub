import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { inscribirse } from "./actions";

export default async function InscribirsePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="max-w-md mx-auto px-6 py-10">
        <p className="text-gray-600 mb-4">
          Debes iniciar sesión para inscribirte.
        </p>
        <Link href="/login" className="text-blue-600 hover:underline text-sm">
          Ir a iniciar sesión
        </Link>
      </main>
    );
  }

  const { data: campeonato } = await supabase
    .from("campeonatos")
    .select("nombre")
    .eq("id", id)
    .single();

  return (
    <main className="max-w-md mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-2">Inscripción</h1>
      <p className="text-gray-600 mb-6">{campeonato?.nombre}</p>

      {error === "equipo_ocupado" && (
        <p className="text-red-600 text-sm mb-4">
          Este nombre de equipo ya está inscrito en este campeonato. Elige otro nombre.
        </p>
      )}

      {error === "ya_inscrito" && (
        <p className="text-red-600 text-sm mb-4">
         Ya estás inscrito en este campeonato con un equipo.
        </p>
      )}

      {error === "desconocido" && (
        <p className="text-red-600 text-sm mb-4">
          Ocurrió un error al inscribirte. Intenta de nuevo.
        </p>
      )}

      <form action={inscribirse} className="flex flex-col gap-4">
        <input type="hidden" name="campeonato_id" value={id} />

        <input
          type="text"
          name="nombre_equipo"
          placeholder="Nombre del equipo (ej: Tigres FC)"
          required
          className="border rounded-md px-4 py-2"
        />

        <input
          type="tel"
          name="telefono_contacto"
          placeholder="Teléfono de contacto"
          className="border rounded-md px-4 py-2"
        />

        <button
          type="submit"
          className="bg-black text-white rounded-full py-2 mt-2"
        >
          Inscribirme
        </button>
      </form>

      <Link
        href={`/campeonatos/${id}`}
        className="block text-blue-600 hover:underline text-sm mt-6"
      >
        ← Volver al detalle
      </Link>
    </main>
  );
}