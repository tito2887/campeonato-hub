"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { generarSorteo } from "./actions";
import SorteoAnimado from "./SorteoAnimado";

type EquipoAsignado = { id: string; nombre: string; grupo: number };

export default function SorteoForm({
  campeonatoId,
  totalEquipos,
}: {
  campeonatoId: string;
  totalEquipos: number;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [animacion, setAnimacion] = useState<{
    equipos: EquipoAsignado[];
    numeroGrupos: number;
  } | null>(null);

  const sugerido = totalEquipos <= 10 ? 1 : totalEquipos <= 24 ? 2 : 4;

  async function manejarEnvio(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const resultado = await generarSorteo(campeonatoId, formData);
      if (resultado?.error) {
        setError(resultado.error);
      } else if (resultado?.success && resultado.equiposAnimacion) {
        setAnimacion({
          equipos: resultado.equiposAnimacion,
          numeroGrupos: resultado.numeroGrupos ?? 1,
        });
      }
    });
  }

  function manejarTerminado() {
    setAnimacion(null);
    router.refresh();
  }

  return (
    <>
      <form action={manejarEnvio} className="border rounded-lg p-4 mb-6 space-y-3">
        <h3 className="font-semibold text-lg">Generar sorteo de grupos</h3>
        <p className="text-sm text-gray-500">
          {totalEquipos} equipos inscritos. Sugerencia: {sugerido} grupo{sugerido > 1 ? "s" : ""}.
        </p>

        <div>
          <label className="block text-sm font-medium mb-1">Cantidad de grupos</label>
          <input
            type="number"
            name="numeroGrupos"
            min={1}
            max={totalEquipos}
            defaultValue={sugerido}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Formato de partidos</label>
          <select name="formato" defaultValue="unico" className="w-full border rounded px-3 py-2">
            <option value="unico">Solo ida (todos contra todos, una vez)</option>
            <option value="ida_vuelta">Ida y vuelta (todos contra todos, dos veces)</option>
          </select>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isPending || totalEquipos < 2}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "Generando..." : "🎲 Generar sorteo"}
        </button>

        <p className="text-xs text-gray-400">
          Repetir el sorteo borra y vuelve a generar todos los partidos de este campeonato.
        </p>
      </form>

      {animacion && (
        <SorteoAnimado
          equipos={animacion.equipos}
          numeroGrupos={animacion.numeroGrupos}
          onTerminado={manejarTerminado}
        />
      )}
    </>
  );
}