"use client";

import { useState, useTransition } from "react";
import { generarEliminatoria } from "./actions";

export default function EliminatoriaForm({ campeonatoId }: { campeonatoId: string }) {
  const [error, setError] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function manejarEnvio(formData: FormData) {
    setError(null);
    setMensaje(null);
    startTransition(async () => {
      const resultado = await generarEliminatoria(campeonatoId, formData);
      if (resultado?.error) {
        setError(resultado.error);
      } else if (resultado?.success) {
        setMensaje(`Fase "${resultado.fase}" generada: ${resultado.totalPartidos} partido(s).`);
      }
    });
  }

  return (
    <form action={manejarEnvio} className="border rounded-lg p-4 mb-6 space-y-3">
      <h3 className="font-semibold text-lg">Generar fase eliminatoria</h3>
      <p className="text-sm text-gray-500">
        Toma los mejores clasificados de cada grupo según la tabla de posiciones actual.
      </p>

      <div>
        <label className="block text-sm font-medium mb-1">Equipos que clasifican por grupo</label>
        <input
          type="number"
          name="equiposPorGrupo"
          min={1}
          defaultValue={2}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Formato de partidos</label>
        <select name="formato" defaultValue="unico" className="w-full border rounded px-3 py-2">
          <option value="unico">Solo ida</option>
          <option value="ida_vuelta">Ida y vuelta</option>
        </select>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {mensaje && <p className="text-green-600 text-sm">{mensaje}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Generando..." : "🏆 Generar fase eliminatoria"}
      </button>

      <p className="text-xs text-gray-400">
        Repetir esto borra y vuelve a generar toda la fase eliminatoria (no afecta la fase de grupos).
      </p>
    </form>
  );
}