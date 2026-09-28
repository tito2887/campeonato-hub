"use client";

import { useState } from "react";
import { eliminarCampeonato } from "./actions";

export default function EliminarCampeonatoBoton({
  campeonatoId,
  nombre,
}: {
  campeonatoId: string;
  nombre: string;
}) {
  const [confirmando, setConfirmando] = useState(false);

  if (!confirmando) {
    return (
      <button
        type="button"
        onClick={() => setConfirmando(true)}
        className="text-xs font-medium text-red-600 hover:underline"
      >
        Eliminar
      </button>
    );
  }

  return (
    <form
      action={eliminarCampeonato}
      className="flex flex-col gap-2 bg-red-50 border border-red-200 rounded-lg p-3 w-full"
    >
      <input type="hidden" name="campeonato_id" value={campeonatoId} />
      <p className="text-xs text-red-700">
        ¿Eliminar &quot;{nombre}&quot;? Esta acción no se puede deshacer.
      </p>
      <div className="flex gap-2">
        <button
          type="submit"
          className="text-xs font-medium bg-red-600 text-white rounded-full px-3 py-1 hover:bg-red-700"
        >
          Sí, eliminar
        </button>
        <button
          type="button"
          onClick={() => setConfirmando(false)}
          className="text-xs font-medium border border-zinc-300 rounded-full px-3 py-1 hover:bg-white"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}