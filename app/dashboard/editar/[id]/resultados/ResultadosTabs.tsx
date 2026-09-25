"use client";

import { useState } from "react";
import ResultadoForm from "./ResultadoForm";
import TablaPosiciones from "./TablaPosiciones";
import DescargarTabla from "./DescargarTabla";

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
  vuelta: string | null;
  fecha: string | null;
  hora: string | null;
  jornada: number | null;
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
  nombreCampeonato,
}: {
  equipos: Equipo[];
  partidos: Partido[];
  puntos: Puntos;
  grupoNumeros: number[];
  campeonatoId: string;
  nombreCampeonato: string;
}) {
  const [pestaña, setPestaña] = useState<"clasificacion" | "partidos">("clasificacion");
  const [jornadasAbiertas, setJornadasAbiertas] = useState<Set<string>>(new Set());

  function alternarJornada(clave: string) {
    setJornadasAbiertas((prev) => {
      const copia = new Set(prev);
      if (copia.has(clave)) {
        copia.delete(clave);
      } else {
        copia.add(clave);
      }
      return copia;
    });
  }

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
            <DescargarTabla
              equipos={equipos}
              partidos={partidos as any}
              puntos={puntos}
              numeroGrupo={numeroGrupo}
              nombreCampeonato={nombreCampeonato}
            />
          </div>
        ))
      ) : (
        grupoNumeros.map((numeroGrupo) => {
          const partidosDelGrupo = partidos.filter((p) => p.grupo === numeroGrupo);
          const jornadas = Array.from(
            new Set(partidosDelGrupo.map((p) => p.jornada).filter((j) => j !== null))
          ).sort((a, b) => (a as number) - (b as number)) as number[];

          return (
            <div key={numeroGrupo} className="mb-8">
              <h3 className="font-semibold text-lg mb-3">Grupo {numeroGrupo}</h3>
              {jornadas.map((numeroJornada) => {
                const clave = `${numeroGrupo}-${numeroJornada}`;
                const partidosDeEstaFecha = partidosDelGrupo.filter(
                  (p) => p.jornada === numeroJornada
                );
                const jugados = partidosDeEstaFecha.filter((p) => p.jugado).length;
                const abierta = jornadasAbiertas.has(clave);

                return (
                  <div key={numeroJornada} className="border rounded-lg mb-3 overflow-hidden">
                    <button
                      onClick={() => alternarJornada(clave)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-zinc-50 hover:bg-zinc-100 text-left"
                    >
                      <span className="text-sm font-semibold text-zinc-700">
                        Fecha {numeroJornada}
                      </span>
                      <span className="flex items-center gap-3">
                        <span className="text-xs text-zinc-500">
                          {jugados}/{partidosDeEstaFecha.length} jugados
                        </span>
                        <span className="text-lg leading-none text-zinc-400">
                          {abierta ? "−" : "+"}
                        </span>
                      </span>
                    </button>

                    {abierta && (
                      <div className="p-3 space-y-2">
                        {partidosDeEstaFecha.map((partido) => (
                          <ResultadoForm
                            key={partido.id}
                            partido={partido}
                            campeonatoId={campeonatoId}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })
      )}
    </div>
  );
}