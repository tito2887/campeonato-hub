"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { guardarPenales } from "../resultados/actions";

type Kick = { equipo: "local" | "visitante"; resultado: "gol" | "fallo" };

export default function TandaPenales({
  partidoId,
  campeonatoId,
  fase,
  llave,
  nombreLocal,
  nombreVisitante,
  equipoLocalId,
  equipoVisitanteId,
}: {
  partidoId: string;
  campeonatoId: string;
  fase: string;
  llave: number;
  nombreLocal: string;
  nombreVisitante: string;
  equipoLocalId: string;
  equipoVisitanteId: string;
}) {
  const router = useRouter();
  const [iniciado, setIniciado] = useState(false);
  const [rondaInicial, setRondaInicial] = useState(3);
  const [kicks, setKicks] = useState<Kick[]>([]);
  const [isPending, startTransition] = useTransition();

  const golesLocal = kicks.filter((k) => k.equipo === "local" && k.resultado === "gol").length;
  const golesVisitante = kicks.filter((k) => k.equipo === "visitante" && k.resultado === "gol").length;

  const tandasLocal = kicks.filter((k) => k.equipo === "local").length;
  const tandasVisitante = kicks.filter((k) => k.equipo === "visitante").length;

  // Determinar si ya hay ganador: solo se evalúa al completar una ronda completa (ambos tiraron igual cantidad)
  let ganador: "local" | "visitante" | null = null;
  if (tandasLocal === tandasVisitante && tandasLocal > 0) {
    const rondasCompletas = tandasLocal;
    if (rondasCompletas >= rondaInicial) {
      if (golesLocal !== golesVisitante) {
        ganador = golesLocal > golesVisitante ? "local" : "visitante";
      }
    }
  }

  // Turno actual: local y visitante alternan, local siempre tira primero en cada ronda
  const turno: "local" | "visitante" = tandasLocal <= tandasVisitante ? "local" : "visitante";

  function registrarTiro(resultado: "gol" | "fallo") {
    setKicks((prev) => [...prev, { equipo: turno, resultado }]);
  }

  function deshacerUltimo() {
    setKicks((prev) => prev.slice(0, -1));
  }

  function guardar() {
    if (!ganador) return;
    const ganadorId = ganador === "local" ? equipoLocalId : equipoVisitanteId;
    startTransition(async () => {
      await guardarPenales(partidoId, campeonatoId, fase, llave, kicks, ganadorId);
      router.refresh();
    });
  }

  if (!iniciado) {
    return (
      <div className="border border-amber-300 bg-amber-50 rounded-lg p-3 mt-2">
        <p className="text-xs font-semibold text-amber-800 mb-2">
          Empate — definir por penales
        </p>
        <div className="flex items-center gap-2">
          <label className="text-xs text-amber-700">Penales por equipo:</label>
          <select
            value={rondaInicial}
            onChange={(e) => setRondaInicial(parseInt(e.target.value, 10))}
            className="border rounded px-2 py-1 text-xs"
          >
            <option value={3}>3 (fulbito)</option>
            <option value={5}>5 (fútbol)</option>
          </select>
          <button
            onClick={() => setIniciado(true)}
            className="text-xs bg-amber-600 text-white px-3 py-1.5 rounded-full hover:bg-amber-700 ml-auto"
          >
            Iniciar tanda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-amber-300 bg-amber-50 rounded-lg p-3 mt-2">
      <p className="text-xs font-semibold text-amber-800 mb-2">Tanda de penales</p>

      <div className="flex items-center justify-between mb-3">
        <div className="text-center flex-1">
          <p className="text-xs font-medium text-zinc-700 truncate">{nombreLocal}</p>
          <p className="text-xl font-black text-zinc-900">{golesLocal}</p>
        </div>
        <span className="text-zinc-300 px-2">-</span>
        <div className="text-center flex-1">
          <p className="text-xs font-medium text-zinc-700 truncate">{nombreVisitante}</p>
          <p className="text-xl font-black text-zinc-900">{golesVisitante}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1 mb-3 text-xs">
        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-zinc-500 w-16">{nombreLocal.slice(0, 12)}:</span>
          {kicks
            .filter((k) => k.equipo === "local")
            .map((k, i) => (
              <span key={i} className={k.resultado === "gol" ? "text-green-600" : "text-red-500"}>
                {k.resultado === "gol" ? "●" : "✕"}
              </span>
            ))}
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-zinc-500 w-16">{nombreVisitante.slice(0, 12)}:</span>
          {kicks
            .filter((k) => k.equipo === "visitante")
            .map((k, i) => (
              <span key={i} className={k.resultado === "gol" ? "text-green-600" : "text-red-500"}>
                {k.resultado === "gol" ? "●" : "✕"}
              </span>
            ))}
        </div>
      </div>

      {!ganador ? (
        <div>
          <p className="text-xs text-amber-800 mb-2">
            Tira: <span className="font-bold">{turno === "local" ? nombreLocal : nombreVisitante}</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => registrarTiro("gol")}
              className="flex-1 text-xs bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              ⚽ Gol
            </button>
            <button
              onClick={() => registrarTiro("fallo")}
              className="flex-1 text-xs bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              ✕ Falló
            </button>
            {kicks.length > 0 && (
              <button
                onClick={deshacerUltimo}
                className="text-xs text-amber-700 px-2 hover:underline"
              >
                Deshacer
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-green-700">
            Ganador: {ganador === "local" ? nombreLocal : nombreVisitante}
          </p>
          <button
            onClick={guardar}
            disabled={isPending}
            className="text-xs bg-black text-white px-4 py-1.5 rounded-full hover:bg-zinc-800 disabled:opacity-50"
          >
            {isPending ? "Guardando..." : "Guardar y avanzar"}
          </button>
        </div>
      )}
    </div>
  );
}