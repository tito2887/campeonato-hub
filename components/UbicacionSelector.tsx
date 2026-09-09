"use client";

import { useState } from "react";
import { provinciasEcuador } from "@/lib/ecuador-ubicaciones";

export default function UbicacionSelector({
  provinciaInicial,
  cantonInicial,
  parroquiaInicial,
}: {
  provinciaInicial?: string;
  cantonInicial?: string;
  parroquiaInicial?: string;
}) {
  const [provincia, setProvincia] = useState(provinciaInicial ?? "");
  const [canton, setCanton] = useState(cantonInicial ?? "");
  const [parroquia, setParroquia] = useState(parroquiaInicial ?? "");

  const provinciaData = provinciasEcuador.find((p) => p.provincia === provincia);
  const cantones = provinciaData?.cantones ?? [];
  const cantonData = cantones.find((c) => c.canton === canton);
  const parroquias = cantonData?.parroquias ?? [];

  return (
    <div className="flex flex-col gap-4">
      <select
        name="provincia"
        required
        value={provincia}
        onChange={(e) => {
          setProvincia(e.target.value);
          setCanton("");
          setParroquia("");
        }}
        className="border rounded-md px-4 py-2"
      >
        <option value="">Selecciona una provincia</option>
        {provinciasEcuador.map((p) => (
          <option key={p.provincia} value={p.provincia}>
            {p.provincia}
          </option>
        ))}
      </select>

      <select
        name="canton"
        required
        value={canton}
        onChange={(e) => {
          setCanton(e.target.value);
          setParroquia("");
        }}
        disabled={!provincia}
        className="border rounded-md px-4 py-2 disabled:bg-gray-100 disabled:text-gray-400"
      >
        <option value="">
          {provincia ? "Selecciona un cantón" : "Primero elige una provincia"}
        </option>
        {cantones.map((c) => (
          <option key={c.canton} value={c.canton}>
            {c.canton}
          </option>
        ))}
      </select>

      <select
        name="parroquia"
        value={parroquia}
        onChange={(e) => setParroquia(e.target.value)}
        disabled={!canton}
        className="border rounded-md px-4 py-2 disabled:bg-gray-100 disabled:text-gray-400"
      >
        <option value="">
          {canton ? "Selecciona una parroquia (opcional)" : "Primero elige un cantón"}
        </option>
        {parroquias.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
    </div>
  );
}