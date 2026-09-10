"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { provinciasEcuador } from "@/lib/ecuador-ubicaciones";

export default function FiltroUbicacion({
  provinciaActual,
  cantonActual,
}: {
  provinciaActual?: string;
  cantonActual?: string;
}) {
  const router = useRouter();
  const [provincia, setProvincia] = useState(provinciaActual ?? "");

  const cantones =
    provinciasEcuador.find((p) => p.provincia === provincia)?.cantones ?? [];

  function actualizarUrl(nuevaProvincia: string, nuevoCanton: string) {
    const params = new URLSearchParams();
    if (nuevaProvincia) params.set("provincia", nuevaProvincia);
    if (nuevoCanton) params.set("canton", nuevoCanton);
    const query = params.toString();
    router.push(`/campeonatos${query ? `?${query}` : ""}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <select
        value={provincia}
        onChange={(e) => {
          const valor = e.target.value;
          setProvincia(valor);
          actualizarUrl(valor, "");
        }}
        className="border rounded-md px-3 py-2 text-sm"
      >
        <option value="">Todas las provincias</option>
        {provinciasEcuador.map((p) => (
          <option key={p.provincia} value={p.provincia}>
            {p.provincia}
          </option>
        ))}
      </select>

      <select
        value={cantonActual ?? ""}
        onChange={(e) => actualizarUrl(provincia, e.target.value)}
        disabled={!provincia}
        className="border rounded-md px-3 py-2 text-sm disabled:bg-gray-100 disabled:text-gray-400"
      >
        <option value="">
          {provincia ? "Todos los cantones" : "Elige una provincia primero"}
        </option>
        {cantones.map((c) => (
          <option key={c.canton} value={c.canton}>
            {c.canton}
          </option>
        ))}
      </select>

      {(provincia || cantonActual) && (
        <button
          onClick={() => {
            setProvincia("");
            router.push("/campeonatos");
          }}
          className="text-sm text-blue-600 hover:underline"
        >
          Quitar filtro
        </button>
      )}
    </div>
  );
}