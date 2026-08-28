import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { editarCampeonato } from "./actions";

export default async function EditarCampeonatoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: campeonato } = await supabase
    .from("campeonatos")
    .select("id, nombre, categoria, descripcion, socio, organizador_id")
    .eq("id", id)
    .single();

  if (!campeonato || campeonato.organizador_id !== user.id) {
    return (
      <main className="max-w-lg mx-auto px-6 py-10">
        <p className="text-red-600 mb-4">
          No tienes permiso para editar este campeonato.
        </p>
        <Link href="/dashboard" className="text-blue-600 hover:underline text-sm">
          ← Volver al panel
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-lg mx-auto px-6 py-10">
      <Link
        href="/dashboard"
        className="inline-block text-blue-600 hover:underline text-sm mb-6"
      >
        ← Volver sin guardar cambios
      </Link>

      <h1 className="text-2xl font-bold mb-2">Editar campeonato</h1>

      <Link
        href={`/dashboard/editar/${campeonato.id}/equipos`}
        className="inline-block bg-blue-600 text-white text-sm rounded-full px-4 py-2 mb-6 hover:bg-blue-700"
      >
        ⚽ Gestionar equipos y jugadores
      </Link>

      <form action={editarCampeonato} className="flex flex-col gap-4">
        <input type="hidden" name="campeonato_id" value={campeonato.id} />

        <input
          type="text"
          name="nombre"
          defaultValue={campeonato.nombre}
          required
          className="border rounded-md px-4 py-2"
        />

        <select
          name="categoria"
          defaultValue={campeonato.categoria}
          required
          className="border rounded-md px-4 py-2"
        >
          <option value="elite">Élite</option>
          <option value="medio-bajo">Medio-bajo</option>
          <option value="femenino">Femenino</option>
        </select>

        <textarea
          name="descripcion"
          defaultValue={campeonato.descripcion ?? ""}
          rows={4}
          className="border rounded-md px-4 py-2"
        />

        <input
          type="text"
          name="socio"
          defaultValue={campeonato.socio ?? ""}
          placeholder="Socio asociado (opcional)"
          className="border rounded-md px-4 py-2"
        />

        <button
          type="submit"
          className="bg-black text-white rounded-full py-2 mt-2"
        >
          Guardar cambios
        </button>
      </form>
    </main>
  );
}