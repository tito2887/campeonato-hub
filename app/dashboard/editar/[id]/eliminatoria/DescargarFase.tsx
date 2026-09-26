"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas-pro";

type EquipoRef = { nombre: string } | null;

type PartidoFase = {
  id: string;
  equipo_local: EquipoRef;
  equipo_visitante: EquipoRef;
  fecha?: string | null;
  hora?: string | null;
  vuelta?: string | null;
  jugado?: boolean;
  gol_local?: number | null;
  gol_visitante?: number | null;
};

function formatearFechaHora(fecha?: string | null, hora?: string | null) {
  if (!fecha && !hora) return null;
  const partes: string[] = [];
  if (fecha) {
    const d = new Date(fecha + "T00:00:00");
    partes.push(
      d.toLocaleDateString("es-EC", { weekday: "short", day: "numeric", month: "short" })
    );
  }
  if (hora) partes.push(hora.slice(0, 5));
  return partes.join(" · ");
}

export default function DescargarFase({
  nombreCampeonato,
  fase,
  partidos,
}: {
  nombreCampeonato: string;
  fase: string;
  partidos: PartidoFase[];
}) {
  const refImagen = useRef<HTMLDivElement>(null);
  const [descargando, setDescargando] = useState(false);
  const [abierto, setAbierto] = useState(false);

  const jugados = partidos.filter((p) => p.jugado).length;

  async function descargar() {
    if (!refImagen.current) return;
    setDescargando(true);
    try {
      const canvas = await html2canvas(refImagen.current, { backgroundColor: null, scale: 2 });
      const link = document.createElement("a");
      link.download = `${nombreCampeonato}-${fase}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setDescargando(false);
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => setAbierto((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-zinc-50 hover:bg-zinc-100 text-left"
      >
        <span className="text-sm font-semibold text-zinc-700 capitalize">{fase}</span>
        <span className="flex items-center gap-3">
          <span className="text-xs text-zinc-500">
            {partidos.length} partido{partidos.length !== 1 ? "s" : ""} · {jugados}/{partidos.length} jugados
          </span>
          <span className="text-lg leading-none text-zinc-400">{abierto ? "−" : "+"}</span>
        </span>
      </button>

      {abierto && (
        <div className="border-t">
          <div ref={refImagen} className="bg-white">
            <div className="bg-zinc-900 text-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-zinc-400">
                {nombreCampeonato} · Fase eliminatoria
              </p>
              <p className="font-bold text-base capitalize">{fase}</p>
            </div>

            {partidos.map((partido, i) => {
              const fechaHora = formatearFechaHora(partido.fecha, partido.hora);
              return (
                <div
                  key={partido.id}
                  className={"px-4 py-3 " + (i > 0 ? "border-t border-zinc-200" : "")}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex-1 text-right text-sm font-medium">
                      {partido.equipo_local?.nombre}
                    </span>

                    {partido.jugado ? (
                      <span className="text-sm font-bold px-3 whitespace-nowrap">
                        {partido.gol_local} - {partido.gol_visitante}
                      </span>
                    ) : (
                      <span className="text-[11px] text-gray-400 font-semibold px-3">VS</span>
                    )}

                    <span className="flex-1 text-left text-sm font-medium">
                      {partido.equipo_visitante?.nombre}
                    </span>
                  </div>

                  {fechaHora ? (
                    <p className="text-center text-[11px] text-gray-400 mt-1">{fechaHora}</p>
                  ) : (
                    <p className="text-center text-[11px] text-gray-300 mt-1">
                      Fecha y hora por confirmar
                    </p>
                  )}

                  <div className="flex items-center justify-center gap-2 mt-1">
                    {partido.vuelta && partido.vuelta !== "unico" && (
                      <span
                        className={
                          "text-[9px] font-bold uppercase px-2 py-0.5 rounded-full " +
                          (partido.vuelta === "ida"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700")
                        }
                      >
                        {partido.vuelta}
                      </span>
                    )}
                    {partido.jugado && (
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                        Finalizado
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-zinc-50 px-4 py-2.5 flex justify-end">
            <button
              onClick={descargar}
              disabled={descargando}
              className="text-xs bg-black text-white px-4 py-1.5 rounded-full hover:bg-zinc-800 disabled:opacity-50"
            >
              {descargando ? "Generando..." : "Descargar imagen"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}