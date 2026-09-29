"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas-pro";

type EquipoRef = { nombre: string } | null;

export default function DescargarResultado({
  nombreCampeonato,
  equipoLocal,
  equipoVisitante,
  golLocal,
  golVisitante,
  vuelta,
}: {
  nombreCampeonato: string;
  equipoLocal: EquipoRef;
  equipoVisitante: EquipoRef;
  golLocal: number | null;
  golVisitante: number | null;
  vuelta?: string | null;
}) {
  const refImagen = useRef<HTMLDivElement>(null);
  const [descargando, setDescargando] = useState(false);

  async function descargar() {
    if (!refImagen.current) return;
    setDescargando(true);
    try {
      const canvas = await html2canvas(refImagen.current, { backgroundColor: null, scale: 2 });
      const link = document.createElement("a");
      link.download = `${nombreCampeonato}-${equipoLocal?.nombre}-vs-${equipoVisitante?.nombre}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setDescargando(false);
    }
  }

  return (
    <div>
      <div
        ref={refImagen}
        className="w-72 bg-white border rounded-xl overflow-hidden"
      >
        <div className="bg-zinc-900 text-white text-center py-2.5">
          <p className="text-[9px] uppercase tracking-wider text-zinc-400">{nombreCampeonato}</p>
          <p className="text-[10px] font-semibold text-green-400">Finalizado</p>
        </div>

        <div className="flex items-center justify-between px-5 py-6">
          <div className="flex-1 text-center">
            <p className="text-sm font-semibold text-zinc-900 leading-tight">
              {equipoLocal?.nombre}
            </p>
          </div>

          <div className="flex items-center gap-2 px-3">
            <span className="text-3xl font-black text-zinc-900">{golLocal}</span>
            <span className="text-zinc-300 text-xl">-</span>
            <span className="text-3xl font-black text-zinc-900">{golVisitante}</span>
          </div>

          <div className="flex-1 text-center">
            <p className="text-sm font-semibold text-zinc-900 leading-tight">
              {equipoVisitante?.nombre}
            </p>
          </div>
        </div>

        {vuelta && vuelta !== "unico" && (
          <p className="text-center pb-3">
            <span
              className={
                "text-[9px] font-bold uppercase px-2 py-0.5 rounded-full " +
                (vuelta === "ida" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700")
              }
            >
              {vuelta}
            </span>
          </p>
        )}
      </div>

      <button
        onClick={descargar}
        disabled={descargando}
        className="mt-2 text-xs bg-black text-white px-4 py-1.5 rounded-full hover:bg-zinc-800 disabled:opacity-50"
      >
        {descargando ? "Generando..." : "Descargar resultado"}
      </button>
    </div>
  );
}