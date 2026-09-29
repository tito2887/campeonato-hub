"use client";

import { useState, useTransition } from "react";
import EliminatoriaForm from "../eliminatoria/EliminatoriaForm";
import BracketEliminatoria from "../eliminatoria/BracketEliminatoria";
import AgregarPartidoManual from "../eliminatoria/AgregarPartidoManual";
import FaseBloque from "./FaseBloque";
import { eliminarFaseEliminatoria } from "../eliminatoria/actions";

const ORDEN_FASE: Record<string, number> = {
  dieciseisavos: 1,
  octavos: 2,
  cuartos: 3,
  semifinal: 4,
  final: 5,
};

export default function EliminatoriaSeccion({
  campeonatoId,
  nombreCampeonato,
  partidosEliminatoria = [],
  equipos = [],
}: {
  campeonatoId: string;
  nombreCampeonato: string;
  partidosEliminatoria: any[];
  equipos: { id: string; nombre: string }[];
}) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [confirmandoEliminar, setConfirmandoEliminar] = useState(false);
  const [isPending, startTransition] = useTransition();

  const fases = Array.from(new Set(partidosEliminatoria.map((p) => p.fase))).sort(
    (a, b) => (ORDEN_FASE[a] ?? 99) - (ORDEN_FASE[b] ?? 99)
  );
  const hayEliminatoria = fases.length > 0;

  function manejarEliminar() {
    startTransition(async () => {
      await eliminarFaseEliminatoria(campeonatoId);
      setConfirmandoEliminar(false);
    });
  }

  return (
    <div className="mt-10 pt-8 border-t">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h3 className="font-semibold text-lg">Fase eliminatoria</h3>

        {hayEliminatoria && (
          <>
            {!confirmandoEliminar ? (
              <button
                onClick={() => setConfirmandoEliminar(true)}
                className="text-xs text-red-600 hover:underline"
              >
                Eliminar fase eliminatoria
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5">
                <span className="text-xs text-red-700">¿Eliminar toda la fase eliminatoria?</span>
                <button
                  onClick={manejarEliminar}
                  disabled={isPending}
                  className="text-xs bg-red-600 text-white rounded-full px-3 py-1 hover:bg-red-700 disabled:opacity-50"
                >
                  {isPending ? "..." : "Sí, eliminar"}
                </button>
                <button
                  onClick={() => setConfirmandoEliminar(false)}
                  className="text-xs border border-zinc-300 rounded-full px-3 py-1 hover:bg-white"
                >
                  Cancelar
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {!hayEliminatoria && !mostrarFormulario && (
        <button
          onClick={() => setMostrarFormulario(true)}
          className="w-full sm:w-auto bg-zinc-900 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-zinc-800"
        >
          🏆 Agregar segunda fase (eliminatoria)
        </button>
      )}

      {!hayEliminatoria && mostrarFormulario && (
        <div>
          <button
            onClick={() => setMostrarFormulario(false)}
            className="text-xs text-gray-500 hover:underline mb-2"
          >
            Cancelar
          </button>
          <EliminatoriaForm campeonatoId={campeonatoId} />
        </div>
      )}

      {hayEliminatoria && (
        <>
          <div className="border rounded-xl bg-zinc-50 p-4 mb-6">
            <BracketEliminatoria partidos={partidosEliminatoria as any} />
          </div>

          <div>
            {fases.map((fase) => {
              const partidosDeEstaFase = partidosEliminatoria.filter((p) => p.fase === fase);
              return (
                <FaseBloque
                  key={fase}
                  nombreCampeonato={nombreCampeonato}
                  fase={fase}
                  partidos={partidosDeEstaFase as any}
                  campeonatoId={campeonatoId}
                />
              );
            })}
          </div>
        </>
      )}

      <div className="mt-4">
        <AgregarPartidoManual
          campeonatoId={campeonatoId}
          equipos={equipos}
          fasesExistentes={fases}
        />
      </div>
    </div>
  );
}