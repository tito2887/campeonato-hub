"use client";

import { useState, useTransition } from "react";
import { guardarFechaHora, guardarResultado } from "./actions";

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
  const [errorFecha, setErrorFecha] = useState<string | null>(null);
  const [errorResultado, setErrorResultado] = useState<string | null>(null);
  const [isPendingFecha, startTransitionFecha] = useTransition();
  const [isPendingResultado, startTransitionResultado] = useTransition();

  async function manejarFecha(formData: FormData) {
    setErrorFecha(null);
    startTransitionFecha(async () => {
      const resultado = await guardarFechaHora(partido.id, campeonatoId, formData);
      if (resultado?.error) setErrorFecha(resultado.error);
    });
  }

  async function manejarResultado(formData: FormData) {
    setErrorResultado(null);
    startTransitionResultado(async () => {
      const resultado = await guardarResultado(partido.id, campeonatoId, formData);
      if (resultado?.error) setErrorResultado(resultado.error);
    });
  }

  const horaInicial = partido.hora ? partido.hora.slice(0, 5) : "";

  return (
    <div className="border rounded-lg p-3 mb-2 text-sm">
      <div className="flex items-center gap-2 mb-2">
        <BadgeVuelta vuelta={partido.vuelta} />
        <span className="flex-1 font-medium">{partido.equipo_local?.nombre}</span>
        <span className="text-gray-400 text-xs px-1">vs</span>
        <span className="flex-1 font-medium text-right">{partido.equipo_visitante?.nombre}</span>
        {partido.jugado && (
          <span className="text-[10px] font-bold uppercase bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            Finalizado
          </span>
        )}
      </div>

      {/* Programar: solo fecha y hora, sin exigir marcador */}
      <form action={manejarFecha} className="flex items-center gap-2 flex-wrap border-t pt-2 mt-2">
        <span className="text-xs text-gray-500 w-full sm:w-auto">Programar partido:</span>
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
          disabled={isPendingFecha}
          className="text-xs bg-zinc-700 text-white px-3 py-1 rounded hover:bg-zinc-800 disabled:opacity-50 ml-auto"
        >
          {isPendingFecha ? "..." : "Guardar fecha"}
        </button>
        {errorFecha && <span className="text-red-600 text-xs w-full">{errorFecha}</span>}
      </form>

      {/* Cargar resultado: solo cuando el partido ya se jugó */}
      <form action={manejarResultado} className="flex items-center gap-2 border-t pt-2 mt-2">
        <span className="text-xs text-gray-500">Cargar resultado:</span>
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
        <button
          type="submit"
          disabled={isPendingResultado}
          className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50 ml-auto"
        >
          {isPendingResultado ? "..." : partido.jugado ? "Actualizar" : "Guardar"}
        </button>
        {errorResultado && <span className="text-red-600 text-xs w-full">{errorResultado}</span>}
      </form>
    </div>
  );
}