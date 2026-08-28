"use client";

import { useTransition } from "react";
import { eliminarJugador } from "./actions";

type Jugador = {
  id: string;
  nombre: string;
  numero: number | null;
  posicion: string | null;
};

export default function JugadoresList({
  jugadores,
  equipoId,
  campeonatoId,
}: {
  jugadores: Jugador[];
  equipoId: string;
  campeonatoId: string;
}) {
  const [isPending, startTransition] = useTransition();

  function manejarEliminar(jugadorId: string) {
    if (!confirm("¿Eliminar este jugador?")) return;
    startTransition(() => {
      eliminarJugador(jugadorId, equipoId, campeonatoId);
    });
  }

  if (jugadores.length === 0) {
    return <p className="text-gray-500">Todavía no hay jugadores registrados en este equipo.</p>;
  }

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b text-left text-sm text-gray-500">
          <th className="py-2">#</th>
          <th className="py-2">Nombre</th>
          <th className="py-2">Posición</th>
          <th className="py-2"></th>
        </tr>
      </thead>
      <tbody>
        {jugadores.map((jugador) => (
          <tr key={jugador.id} className="border-b">
            <td className="py-2">{jugador.numero ?? "—"}</td>
            <td className="py-2 font-medium">{jugador.nombre}</td>
            <td className="py-2 text-gray-600">{jugador.posicion ?? "—"}</td>
            <td className="py-2 text-right">
              <button
                onClick={() => manejarEliminar(jugador.id)}
                disabled={isPending}
                className="text-red-600 text-sm hover:underline disabled:opacity-50"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}