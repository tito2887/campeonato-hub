import { crearCampeonato } from "./actions";
import UbicacionSelector from "@/components/UbicacionSelector";

export default function NuevoCampeonatoPage() {
  return (
    <main className="max-w-lg mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Crear campeonato</h1>

      <form action={crearCampeonato} className="flex flex-col gap-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del campeonato"
          required
          className="border rounded-md px-4 py-2"
        />

        <select
          name="categoria"
          required
          className="border rounded-md px-4 py-2"
        >
          <option value="">Selecciona una categoría</option>
          <option value="elite">Élite</option>
          <option value="medio-bajo">Medio-bajo</option>
          <option value="femenino">Femenino</option>
        </select>

        <textarea
          name="descripcion"
          placeholder="Descripción del campeonato"
          rows={4}
          className="border rounded-md px-4 py-2"
        />

        <input
          type="text"
          name="socio"
          placeholder="Socio asociado (opcional)"
          className="border rounded-md px-4 py-2"
        />

        <hr className="my-2" />
        <p className="text-sm text-gray-500 -mt-2">Ubicación del campeonato</p>

        <UbicacionSelector />

        <button
          type="submit"
          className="bg-black text-white rounded-full py-2 mt-2"
        >
          Crear campeonato
        </button>
      </form>
    </main>
  );
}