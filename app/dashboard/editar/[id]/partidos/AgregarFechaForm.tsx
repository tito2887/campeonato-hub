"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { agregarFecha } from "./actions";

type Equipo = { id: string; nombre: string };

export default function AgregarFechaForm({
  campeonatoId,
  numeroGrupo,
  siguienteJornada,
  equipos,
}: {
  campeonatoId: string;
  numeroGrupo: number;
  siguienteJornada: number;
  equipos: Equipo[];
}) {
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);
  const [filas, setFilas] = useState([{ local: "", visitante: "" }]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function actualizarFila(indice: number, campo: "local" | "visitante", valor: string) {
    setFilas((prev) =>
      prev.map((fila, i) => (i === indice ? { ...fila, [campo]: valor } : fila))
    );
  }

  function agregarFila() {
    setFilas((prev) => [...prev, { local: "", visitante: "" }]);
  }

  function quitarFila(indice: number) {
    setFilas((prev) => prev.filter((_, i) => i !== indice));
  }

  function guardar() {
    setError(null);
    startTransition(async () => {
      const resultado = await agregarFecha(campeonatoId, numeroGrupo, siguienteJornada, filas);
      if (resultado?.error) {
        setError(resultado.error);
      } else {
        setAbierto(false);
        setFilas([{ local: "", visitante: "" }]);
        router.refresh();
      }
    });
  }

  if (!abierto) {
    return (
      <button
        onClick={() => setAbierto(true)}
        className="text-xs border border-dashed border-zinc-300 text-zinc-500 rounded-lg px-4 py-2 hover:bg-zinc-50 w-full"
      >
        + Agregar Fecha {siguienteJornada}
      </button>
    );
  }

  return (
    <div className="border rounded-lg p-3 space-y-2 bg-zinc-50">
      <p className="text-sm font-semibold text-zinc-700">Nueva Fecha {siguienteJornada}</p>

      {filas.map((fila, i) => (
        <div key={i} className="flex items-center gap-2">
          <select
            value={fila.local}
            onChange={(e) => actualizarFila(i, "local", e.target.value)}
            className="flex-1 border rounded px-2 py-1.5 text-sm"
          >
            <option value="">Equipo local</option>
            {equipos.map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.nombre}
              </option>
            ))}
          </select>
          <span className="text-xs text-gray-400">vs</span>
          <select
            value={fila.visitante}
            onChange={(e) => actualizarFila(i, "visitante", e.target.value)}
            className="flex-1 border rounded px-2 py-1.5 text-sm"
          >
            <option value="">Equipo visitante</option>
            {equipos.map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.nombre}
              </option>
            ))}
          </select>
          {filas.length > 1 && (
            <button
              onClick={() => quitarFila(i)}
              className="text-red-500 text-xs px-2"
              type="button"
            >
              ✕
            </button>
          )}
        </div>
      ))}

      <button
        onClick={agregarFila}
        type="button"
        className="text-xs text-blue-600 hover:underline"
      >
        + Otro partido
      </button>

      {error && <p className="text-red-600 text-xs">{error}</p>}

      <div className="flex gap-2 pt-2">
        <button
          onClick={guardar}
          disabled={isPending}
          className="text-xs bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "Guardando..." : "Guardar fecha"}
        </button>
        <button
          onClick={() => setAbierto(false)}
          type="button"
          className="text-xs border border-zinc-300 px-4 py-1.5 rounded-full hover:bg-white"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}