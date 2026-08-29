"use client";

import { useState, useTransition } from "react";
import { guardarResultado } from "./actions";

type Partido = {
  id: string;
  grupo: number | null;
  jugado: boolean;
  gol_local: number | null;
  gol_visitante: number | null;
  equipo_local: { nombre: string } | null;
  equipo_visitante: { nombre: string } | null;
};

export default function ResultadoForm({
  partido,
  campeonatoId,
}: {
  partido: Partido;
  campeonatoId: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function manejarEnvio(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const resultado = await guardarResultado(partido.id, campeonatoId, formData);
      if (resultado?.error) {
        setError(resultado.error);
      }
    });
  }

  return (
    <form action={manejarEnvio} className="flex items-center gap-2 py-2 border-b text-sm">
      <span className="flex-1">{partido.equipo_local?.nombre}</span>

      <input
        type="number"
        name="gol_local"
        min={0}
        defaultValue={partido.gol_local ?? ""}
        className="w-14 border rounded px-2 py-1 text-center"
      />

      <span>-</span>

      <input
        type="number"
        name="gol_visitante"
        min={0}
        defaultValue={partido.gol_visitante ?? ""}
        className="w-14 border rounded px-2 py-1 text-center"
      />

      <span className="flex-1">{partido.equipo_visitante?.nombre}</span>

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "..." : partido.jugado ? "Actualizar" : "Guardar"}
      </button>

      {error && <span className="text-red-600 text-xs">{error}</span>}
    </form>
  );
}