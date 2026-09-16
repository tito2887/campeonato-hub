import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { editarCampeonato } from "../actions";
import UbicacionSelector from "@/components/UbicacionSelector";

export default async function DatosCampeonatoPage({
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
    .select("id, nombre, categoria, descripcion, socio, organizador_id, provincia, canton, parroquia")
    .eq("id", id)
    .single();

  if (!campeonato || campeonato.organizador_id !== user.id) {
    return <p className="text-red-600">No tienes permiso para editar este campeonato.</p>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Datos del campeonato</h2>

      <form action={editarCampeonato} className="flex flex-col gap-4 max-w-lg">
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

        <hr className="my-2" />
        <p className="text-sm text-gray-500 -mt-2">Ubicación del campeonato</p>

        <UbicacionSelector
          provinciaInicial={campeonato.provincia ?? ""}
          cantonInicial={campeonato.canton ?? ""}
          parroquiaInicial={campeonato.parroquia ?? ""}
        />

        <button type="submit" className="bg-black text-white rounded-full py-2 mt-2">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}