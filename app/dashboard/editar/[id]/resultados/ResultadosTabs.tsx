"use client";

import { useState } from "react";
import ResultadoForm from "./ResultadoForm";
import TablaPosiciones from "./TablaPosiciones";

type Equipo = {
  id: string;
  nombre: string;
  grupo: number | null;
};

type Partido = {
  id: string;
  grupo: number | null;
  jugado: boolean;
  gol_local: number | null;
  gol_visitante: number | null;
  equipo_local_id: string;
  equipo_visitante_id: string;
  equipo_local: { nombre: string } | null;
  equipo_visitante: { nombre: string } | null;
};

type Puntos = {
  puntos_victoria: number;
  puntos_empate: number;
  puntos_derrota: number;
};

export default function ResultadosTabs({
  equipos,
  partidos,
  puntos,
  grupoNumeros,
  campeonatoId,
}: {
  equipos: Equipo[];
  partidos: Partido[];
  puntos: Puntos;
  grupoNumeros: number[];
  campeonatoId: string;
}) {
  const [pestaña, setPestaña] = useState<"clasificacion" | "partidos">("clasificacion");

  return (
    <div>
      <div className="flex gap-2 border-b mb-6">
        <button
          onClick={() => setPestaña("clasificacion")}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            pestaña === "clasificacion"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          Clasificación
        </button>
        <button
          onClick={() => setPestaña("partidos")}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            pestaña === "partidos"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          Partidos
        </button>
      </div>

      {pestaña === "clasificacion" ? (
        grupoNumeros.map((numeroGrupo) => (
          <div key={numeroGrupo} className="mb-8">
            <h3 className="font-semibold text-lg mb-2">Grupo {numeroGrupo}</h3>
            <TablaPosiciones
              equipos={equipos}
              partidos={partidos as any}
              puntos={puntos}
              numeroGrupo={numeroGrupo}
            />
          </div>
        ))
      ) : (
        grupoNumeros.map((numeroGrupo) => (
          <div key={numeroGrupo} className="mb-8">
            <h3 className="font-semibold text-lg mb-2">Grupo {numeroGrupo}</h3>
            {partidos
              .filter((p) => p.grupo === numeroGrupo)
              .map((partido) => (
                <ResultadoForm key={partido.id} partido={partido} campeonatoId={campeonatoId} />
              ))}
          </div>
        ))
      )}
    </div>
  );
}