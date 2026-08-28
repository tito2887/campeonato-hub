"use client";

import { useRef, useState, useTransition } from "react";
import { crearJugador } from "./actions";

export default function JugadorForm({
  equipoId,
  campeonatoId,
}: {
  equipoId: string;
  campeonatoId: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function manejarEnvio(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const resultado = await crearJugador(equipoId, campeonatoId, formData);
      if (resultado?.error) {
        setError(resultado.error);
      } else {
        formRef.current?.reset();
      }
    });
  }

  return (
    <form
      ref={formRef}
      action={manejarEnvio}
      className="border rounded-lg p-4 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3 items-end"
    >
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium mb-1">Nombre del jugador</label>
        <input
          type="text"
          name="nombre"
          required
          className="w-full border rounded px-3 py-2"
          placeholder="Ej: Juan Pérez"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Número (opcional)</label>
        <input
          type="number"
          name="numero"
          min={0}
          className="w-full border rounded px-3 py-2"
          placeholder="10"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium mb-1">Posición (opcional)</label>
        <input
          type="text"
          name="posicion"
          className="w-full border rounded px-3 py-2"
          placeholder="Ej: Delantero"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 h-fit"
      >
        {isPending ? "Guardando..." : "Agregar jugador"}
      </button>

      {error && <p className="text-red-600 text-sm sm:col-span-3">{error}</p>}
    </form>
  );
}