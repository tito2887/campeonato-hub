"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { calcularTabla, type Partido, type Puntos } from "./TablaPosiciones";

type Equipo = {
  id: string;
  nombre: string;
  grupo: number | null;
  escudo_url?: string | null;
};

type Plantilla = "clasica" | "oscura" | "minimal" | "dorada" | "estadio";

const PLANTILLAS: { id: Plantilla; nombre: string; premium: boolean }[] = [
  { id: "clasica", nombre: "Clasica", premium: false },
  { id: "oscura", nombre: "Oscura", premium: false },
  { id: "minimal", nombre: "Minimal", premium: false },
  { id: "dorada", nombre: "Dorada", premium: true },
  { id: "estadio", nombre: "Estadio", premium: true },
];

function EscudoMini({ equipo }: { equipo: Equipo | undefined }) {
  if (equipo?.escudo_url) {
    return (
      <img
        src={equipo.escudo_url}
        alt={equipo.nombre}
        className="w-6 h-6 rounded-full object-cover inline-block mr-2"
      />
    );
  }
  return (
    <span className="w-6 h-6 rounded-full bg-zinc-300 text-zinc-600 text-[9px] inline-flex items-center justify-center mr-2 align-middle">
      S/E
    </span>
  );
}

function estilosPlantilla(id: Plantilla) {
  switch (id) {
    case "oscura":
      return { fondo: "bg-zinc-900", texto: "text-white", acento: "text-green-400", borde: "border-zinc-700", filaAlt: "bg-zinc-800" };
    case "minimal":
      return { fondo: "bg-white", texto: "text-zinc-900", acento: "text-zinc-900", borde: "border-zinc-200", filaAlt: "bg-zinc-50" };
    case "dorada":
      return { fondo: "bg-gradient-to-br from-yellow-50 to-yellow-100", texto: "text-zinc-900", acento: "text-yellow-700", borde: "border-yellow-300", filaAlt: "bg-yellow-50/50" };
    case "estadio":
      return { fondo: "bg-gradient-to-br from-green-900 to-green-700", texto: "text-white", acento: "text-yellow-300", borde: "border-green-600", filaAlt: "bg-green-800/40" };
    default:
      return { fondo: "bg-white", texto: "text-zinc-900", acento: "text-zinc-900", borde: "border-zinc-200", filaAlt: "bg-zinc-50" };
  }
}

function MarcaDeAgua() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
      <p className="text-4xl font-black text-black/10 -rotate-25 select-none whitespace-nowrap">
        PREMIUM · PREMIUM · PREMIUM
      </p>
    </div>
  );
}

export default function DescargarTabla({
  equipos,
  partidos,
  puntos,
  numeroGrupo,
  nombreCampeonato,
}: {
  equipos: Equipo[];
  partidos: Partido[];
  puntos: Puntos;
  numeroGrupo: number;
  nombreCampeonato: string;
}) {
  const [plantillaActiva, setPlantillaActiva] = useState<Plantilla>("clasica");
  const [descargando, setDescargando] = useState(false);
  const refImagen = useRef<HTMLDivElement>(null);

  const equiposDelGrupo = equipos.filter((e) => e.grupo === numeroGrupo);
  const partidosDelGrupo = partidos.filter((p) => p.grupo === numeroGrupo);
  const tabla = calcularTabla(equiposDelGrupo as any, partidosDelGrupo, puntos);
  const estilos = estilosPlantilla(plantillaActiva);
  const plantillaInfo = PLANTILLAS.find((p) => p.id === plantillaActiva);

  function buscarEquipo(id: string) {
    return equiposDelGrupo.find((e) => e.id === id);
  }

  async function descargar() {
    if (!refImagen.current || plantillaInfo?.premium) return;
    setDescargando(true);
    try {
      const canvas = await html2canvas(refImagen.current, { backgroundColor: null, scale: 2 });
      const link = document.createElement("a");
      link.download = nombreCampeonato + "-grupo-" + numeroGrupo + "-" + plantillaActiva + ".png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setDescargando(false);
    }
  }

  const esClasica = plantillaActiva === "clasica";

  return (
    <div className="border rounded-xl p-4 mt-4">
      <p className="text-sm font-medium text-zinc-700 mb-3">Descargar tabla como imagen</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {PLANTILLAS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPlantillaActiva(p.id)}
            className={
              "text-xs px-3 py-1.5 rounded-full border flex items-center gap-1 " +
              (plantillaActiva === p.id ? "bg-black text-white border-black" : "bg-white text-zinc-600 border-zinc-300")
            }
          >
            {p.nombre}
            {p.premium && <span>[PREMIUM]</span>}
          </button>
        ))}
      </div>

      <div className="relative inline-block">
        <div
          ref={refImagen}
          className={"rounded-lg w-full max-w-lg overflow-hidden relative " + estilos.fondo + " " + estilos.texto}
        >
          {esClasica ? (
            <>
              <div className="bg-zinc-900 text-white text-center py-3 px-4">
                <p className="font-bold text-base">{nombreCampeonato}</p>
                <p className="text-[10px] uppercase tracking-wider text-zinc-400 mt-0.5">
                  Clasificacion - Grupo {numeroGrupo}
                </p>
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-zinc-100 text-zinc-700 text-[10px] uppercase">
                    <th className="py-2 px-2 text-left">Pos</th>
                    <th className="py-2 px-2 text-left">Equipo</th>
                    <th className="py-2 px-1">Pts</th>
                    <th className="py-2 px-1">PJ</th>
                    <th className="py-2 px-1">G</th>
                    <th className="py-2 px-1">E</th>
                    <th className="py-2 px-1">P</th>
                    <th className="py-2 px-1">DIF</th>
                  </tr>
                </thead>
                <tbody>
                  {tabla.map((fila, i) => (
                    <tr key={fila.equipoId} className={i % 2 === 1 ? "bg-zinc-50" : "bg-white"}>
                      <td className="py-2 px-2">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-zinc-900 text-white text-[10px] font-bold">
                          {i + 1}
                        </span>
                      </td>
                      <td className="py-2 px-2 font-medium">
                        <EscudoMini equipo={buscarEquipo(fila.equipoId)} />
                        {fila.nombre}
                      </td>
                      <td className="py-2 px-1 text-center font-bold text-zinc-900">{fila.pts}</td>
                      <td className="py-2 px-1 text-center">{fila.jj}</td>
                      <td className="py-2 px-1 text-center">{fila.jg}</td>
                      <td className="py-2 px-1 text-center">{fila.je}</td>
                      <td className="py-2 px-1 text-center">{fila.jp}</td>
                      <td className="py-2 px-1 text-center">{fila.dif}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div className="p-6">
              <p className={"text-xs uppercase tracking-wide mb-1 " + estilos.acento}>
                {nombreCampeonato}
              </p>
              <h3 className="font-bold text-lg mb-3">Grupo {numeroGrupo}</h3>
              <table className="w-full text-xs">
                <thead>
                  <tr className={"border-b " + estilos.borde}>
                    <th className="text-left py-1">Equipo</th>
                    <th className="py-1">PJ</th>
                    <th className="py-1">DIF</th>
                    <th className={"py-1 font-bold " + estilos.acento}>Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {tabla.map((fila, i) => (
                    <tr key={fila.equipoId} className={"border-b " + estilos.borde + " " + (i % 2 === 1 ? estilos.filaAlt : "")}>
                      <td className="py-1">
                        {i + 1}. <EscudoMini equipo={buscarEquipo(fila.equipoId)} />
                        {fila.nombre}
                      </td>
                      <td className="text-center py-1">{fila.jj}</td>
                      <td className="text-center py-1">{fila.dif}</td>
                      <td className={"text-center py-1 font-bold " + estilos.acento}>{fila.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {plantillaInfo?.premium && <MarcaDeAgua />}
        </div>
      </div>

      {plantillaInfo?.premium ? (
        <div className="mt-4 flex items-center gap-3">
          <button
            disabled
            className="bg-zinc-200 text-zinc-500 text-sm rounded-full px-5 py-2 cursor-not-allowed"
          >
            Bloqueado - proximamente con plan premium
          </button>
        </div>
      ) : (
        <button
          onClick={descargar}
          disabled={descargando}
          className="mt-4 bg-black text-white text-sm rounded-full px-5 py-2 hover:bg-zinc-800 disabled:opacity-50"
        >
          {descargando ? "Generando..." : "Descargar imagen"}
        </button>
      )}
    </div>
  );
}