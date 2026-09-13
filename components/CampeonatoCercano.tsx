"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Resultado = {
  campeonato: {
    id: string;
    nombre: string;
    categoria: string;
    descripcion: string | null;
    canton: string;
    provincia: string;
  } | null;
  ubicacionDetectada: string | null;
};

export default function CampeonatoCercano() {
  const [estado, setEstado] = useState("cargando");
  const [resultado, setResultado] = useState(null as Resultado | null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setEstado("error");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (posicion) => {
        setEstado("buscando");
        try {
          const latitude = posicion.coords.latitude;
          const longitude = posicion.coords.longitude;
          const res = await fetch("/api/campeonato-cercano?lat=" + latitude + "&lon=" + longitude);
          const data = await res.json();
          setResultado(data);
          setEstado(data.campeonato ? "listo" : "sin_resultado");
        } catch (e) {
          setEstado("error");
        }
      },
      () => {
        setEstado("sin_permiso");
      }
    );
  }, []);

  if (estado === "cargando" || estado === "buscando") {
    return (
      <div className="bg-white/10 rounded-xl p-5 text-center text-sm text-zinc-200 animate-pulse">
        Buscando campeonatos cerca de ti...
      </div>
    );
  }

  if (estado === "listo" && resultado && resultado.campeonato) {
    const c = resultado.campeonato;
    return (
      <div className="bg-white rounded-xl p-5 text-left max-w-md mx-auto shadow-lg">
        <p className="text-xs text-green-600 font-medium mb-1">
          Cerca de ti - {c.canton}, {c.provincia}
        </p>
        <h3 className="font-bold text-lg text-zinc-900">{c.nombre}</h3>
        {c.descripcion && (
          <p className="text-sm text-zinc-600 mt-1 line-clamp-2">{c.descripcion}</p>
        )}
        <Link href={"/campeonatos/" + c.id} className="inline-block mt-3 text-sm bg-black text-white rounded-full px-4 py-2 hover:bg-zinc-800">
          Ver campeonato
        </Link>
      </div>
    );
  }

  return (
    <Link href="/campeonatos" className="text-sm text-zinc-300 hover:text-white underline">
      Explorar campeonatos disponibles
    </Link>
  );
}