"use client";

import { useState } from "react";
import CampeonatoCard from "@/components/CampeonatoCard";

interface Campeonato {
  id: string;
  nombre: string;
  descripcion: string;
}

interface CampeonatosFiltradosProps {
  campeonatos: Campeonato[];
}

export default function CampeonatosFiltrados({
  campeonatos,
}: CampeonatosFiltradosProps) {
  const [busqueda, setBusqueda] = useState("");

  const campeonatosFiltrados = campeonatos.filter((camp) =>
    camp.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar campeonato por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="border rounded-md px-4 py-2 mb-6 w-full max-w-sm"
      />

      {campeonatosFiltrados.length === 0 ? (
        <p className="text-gray-500 text-sm">No se encontraron campeonatos.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campeonatosFiltrados.map((camp) => (
            <CampeonatoCard key={camp.id} {...camp} />
          ))}
        </div>
      )}
    </div>
  );
}