"use client";

import { useTransition } from "react";
import Link from "next/link";
import { eliminarEquipo } from "./actions";

type Equipo = {
  id: string;
  nombre: string;
  escudo_url: string | null;
};

export default function EquiposList({
  equipos,
  campeonatoId,
}: {
  equipos: Equipo[];
  campeonatoId: string;
}) {
  const [isPending, startTransition] = useTransition();

  function manejarEliminar(equipoId: string) {
    if (!confirm("¿Eliminar este equipo? Se borrarán también sus jugadores.")) return;
    startTransition(() => {
      eliminarEquipo(equipoId, campeonatoId);
    });
  }

  if (equipos.length === 0) {
    return <p className="text-gray-500">Todavía no hay equipos inscritos en este campeonato.</p>;
  }

  return (
    <div className="grid gap-3">
      {equipos.map((equipo) => (
        <div
          key={equipo.id}
          className="flex items-center justify-between border rounded-lg p-3"
        >
          <div className="flex items-center gap-3">
            {equipo.escudo_url ? (
              <img
                src={equipo.escudo_url}
                alt={equipo.nombre}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                S/E
              </div>
            )}
            <span className="font-medium">{equipo.nombre}</span>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/dashboard/editar/${campeonatoId}/equipos/${equipo.id}/jugadores`}
              className="text-blue-600 text-sm hover:underline"
            >
              Ver jugadores
            </Link>
            <button
              onClick={() => manejarEliminar(equipo.id)}
              disabled={isPending}
              className="text-red-600 text-sm hover:underline disabled:opacity-50"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}