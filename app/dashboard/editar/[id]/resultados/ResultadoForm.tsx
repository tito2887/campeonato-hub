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
  vuelta: string | null;
  fecha: string | null;
  hora: string | null;
};

function BadgeVuelta({ vuelta }: { vuelta: string | null }) {
  if (vuelta === "ida") {
    return (
      <span className="text-[10px] font-bold uppercase bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
        Ida
      </span>
    );
  }
  if (vuelta === "vuelta") {
    return (
      <span className="text-[10px] font-bold uppercase bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
        Vuelta
      </span>
    );
  }
  return null;
}

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

  // El input type="time" necesita formato HH:MM, y Supabase puede devolver HH:MM:SS
  const horaInicial = partido.hora ? partido.hora.slice(0, 5) : "";

  return (
    <form action={manejarEnvio} className="border rounded-lg p-3 mb-2 text-sm">
      <div className="flex items-center gap-2 mb-2">
        <BadgeVuelta vuelta={partido.vuelta} />
        <span className="flex-1 font-medium">{partido.equipo_local?.nombre}</span>

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

        <span className="flex-1 font-medium text-right">{partido.equipo_visitante?.nombre}</span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <label className="flex items-center gap-1 text-xs text-gray-500">
          Fecha
          <input
            type="date"
            name="fecha"
            defaultValue={partido.fecha ?? ""}
            className="border rounded px-2 py-1 text-xs"
          />
        </label>

        <label className="flex items-center gap-1 text-xs text-gray-500">
          Hora
          <input
            type="time"
            name="hora"
            defaultValue={horaInicial}
            className="border rounded px-2 py-1 text-xs"
          />
        </label>

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50 ml-auto"
        >
          {isPending ? "..." : partido.jugado ? "Actualizar" : "Guardar"}
        </button>

        {error && <span className="text-red-600 text-xs w-full">{error}</span>}
      </div>
    </form>
  );
}