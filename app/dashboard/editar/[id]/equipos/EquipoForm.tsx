"use client";

import { useRef, useState, useTransition } from "react";
import { crearEquipo } from "./actions";

export default function EquipoForm({ campeonatoId }: { campeonatoId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function manejarEnvio(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const resultado = await crearEquipo(campeonatoId, formData);
      if (resultado?.error) {
        setError(resultado.error);
      } else {
        formRef.current?.reset();
      }
    });
  }

  return (
    <form ref={formRef} action={manejarEnvio} className="border rounded-lg p-4 mb-6 space-y-3">
      <h3 className="font-semibold text-lg">Agregar equipo</h3>

      <div>
        <label className="block text-sm font-medium mb-1">Nombre del equipo</label>
        <input
          type="text"
          name="nombre"
          required
          className="w-full border rounded px-3 py-2"
          placeholder="Ej: River Plate"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Escudo (opcional)</label>
        <input
          type="file"
          name="escudo"
          accept="image/*"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Guardando..." : "Agregar equipo"}
      </button>
    </form>
  );
}