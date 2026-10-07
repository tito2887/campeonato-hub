"use client";

import { useEffect, useState } from "react";

type EquipoAsignado = { id: string; nombre: string; grupo: number };

export default function SorteoAnimado({
  equipos,
  numeroGrupos,
  onTerminado,
}: {
  equipos: EquipoAsignado[];
  numeroGrupos: number;
  onTerminado: () => void;
}) {
  const [revelados, setRevelados] = useState<EquipoAsignado[]>([]);
  const [sorteando, setSorteando] = useState(true);

  useEffect(() => {
    let indice = 0;
    const intervalo = setInterval(() => {
      if (indice >= equipos.length) {
        clearInterval(intervalo);
        setSorteando(false);
        return;
      }
      setRevelados((prev) => [...prev, equipos[indice]]);
      indice++;
    }, 700);

    return () => clearInterval(intervalo);
  }, [equipos]);

  const grupos = Array.from({ length: numeroGrupos }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 bg-zinc-900/95 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-zinc-900">
            {sorteando ? "Sorteando equipos..." : "¡Sorteo completado!"}
          </h3>
          <p className="text-sm text-zinc-500">
            {revelados.length}/{equipos.length} equipos asignados
          </p>
        </div>

        <div
          className="grid gap-4 mb-6"
          style={{ gridTemplateColumns: `repeat(${Math.min(numeroGrupos, 3)}, minmax(0, 1fr))` }}
        >
          {grupos.map((numeroGrupo) => (
            <div key={numeroGrupo} className="border rounded-xl overflow-hidden">
              <div className="bg-zinc-900 text-white text-center text-xs font-semibold py-2">
                Grupo {numeroGrupo}
              </div>
              <div className="p-2 flex flex-col gap-1 min-h-[80px]">
                {revelados
                  .filter((e) => e.grupo === numeroGrupo)
                  .map((e, i) => (
                    <div
                      key={e.id}
                      className="bg-zinc-100 rounded px-2 py-1.5 text-xs font-medium text-zinc-800 animate-[entrar_0.4s_ease-out]"
                    >
                      {e.nombre}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {sorteando && (
          <div className="flex justify-center">
            <div className="w-10 h-10 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
          </div>
        )}

        {!sorteando && (
          <div className="flex justify-center">
            <button
              onClick={onTerminado}
              className="bg-black text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-zinc-800"
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}