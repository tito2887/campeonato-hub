"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { agregarPartidoManual } from "./actions";

type Equipo = { id: string; nombre: string };

export default function AgregarPartidoManual({
  campeonatoId,
  equipos = [],
  fasesExistentes = [],
}: {
  campeonatoId: string;
  equipos?: Equipo[];
  fasesExistentes?: string[];
}) {
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function guardar(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const resultado = await agregarPartidoManual(campeonatoId, formData);
      if (resultado?.error) {
        setError(resultado.error);
      } else {
        setAbierto(false);
        router.refresh();
      }
    });
  }

  if (!abierto) {
    return (
      <button
        onClick={() => setAbierto(true)}
        className="text-xs border border-dashed border-zinc-300 text-zinc-500 rounded-lg px-4 py-2 hover:bg-zinc-50"
      >
        + Agregar Fecha
      </button>
    );
  }

  return (
    <form action={guardar} className="border rounded-lg p-3 space-y-2 bg-zinc-50">
      <p className="text-sm font-semibold text-zinc-700">Agregar Fecha</p>

      <div>
        <label className="block text-xs text-gray-500 mb-1">
          Nombre de la fase (existente o nueva, ej. &quot;Diferido&quot;)
        </label>
        <input
          type="text"
          name="fase"
          list="fases-existentes"
          placeholder="Ej. Diferido, Repesca, Cuartos"
          className="w-full border rounded px-2 py-1.5 text-sm"
        />
        <datalist id="fases-existentes">
          {fasesExistentes.map((f) => (
            <option key={f} value={f} />
          ))}
        </datalist>
      </div>

      <div className="flex items-center gap-2">
        <select name="equipoLocal" className="flex-1 border rounded px-2 py-1.5 text-sm">
          <option value="">Equipo local</option>
          {equipos.map((eq) => (
            <option key={eq.id} value={eq.id}>
              {eq.nombre}
            </option>
          ))}
        </select>
        <span className="text-xs text-gray-400">vs</span>
        <select name="equipoVisitante" className="flex-1 border rounded px-2 py-1.5 text-sm">
          <option value="">Equipo visitante</option>
          {equipos.map((eq) => (
            <option key={eq.id} value={eq.id}>
              {eq.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">Tipo</label>
        <select name="vuelta" defaultValue="unico" className="w-full border rounded px-2 py-1.5 text-sm">
          <option value="unico">Único</option>
          <option value="ida">Ida</option>
          <option value="vuelta">Vuelta</option>
          <option value="diferido">Diferido</option>
        </select>
      </div>

      {error && <p className="text-red-600 text-xs">{error}</p>}

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={isPending}
          className="text-xs bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "Guardando..." : "Guardar partido"}
        </button>
        <button
          type="button"
          onClick={() => setAbierto(false)}
          className="text-xs border border-zinc-300 px-4 py-1.5 rounded-full hover:bg-white"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}