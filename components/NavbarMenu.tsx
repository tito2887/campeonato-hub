"use client";

import { useState } from "react";
import Link from "next/link";
import CerrarSesionBoton from "@/components/CerrarSesionBoton";

export default function NavbarMenu({
  logueado,
  nombre,
}: {
  logueado: boolean;
  nombre: string | null;
}) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="relative">
      {/* Botón hamburguesa, solo visible en móvil */}
      <button
        onClick={() => setAbierto(!abierto)}
        className="sm:hidden flex flex-col gap-1.5 p-2"
        aria-label="Abrir menú"
      >
        <span className="w-6 h-0.5 bg-black"></span>
        <span className="w-6 h-0.5 bg-black"></span>
        <span className="w-6 h-0.5 bg-black"></span>
      </button>

      {/* Links en escritorio, siempre visibles */}
      <div className="hidden sm:flex items-center gap-6 text-sm">
        {logueado ? (
          <>
            <Link href="/dashboard" className="hover:underline">
              Hola, {nombre}
            </Link>
            <CerrarSesionBoton />
          </>
        ) : (
          <>
            <Link href="/campeonatos" className="hover:underline">
              Campeonatos
            </Link>
            <Link href="/login" className="hover:underline">
              Iniciar sesión
            </Link>
            <Link href="/register" className="hover:underline">
              Registrarse
            </Link>
          </>
        )}
      </div>

      {/* Menú desplegable en móvil */}
      {abierto && (
        <div className="sm:hidden absolute right-0 top-full mt-2 bg-white border rounded-lg shadow-lg py-2 w-48 z-50 flex flex-col text-sm">
          {logueado ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setAbierto(false)}
                className="px-4 py-2 hover:bg-zinc-50"
              >
                Hola, {nombre}
              </Link>
              <div className="px-4 py-2">
                <CerrarSesionBoton />
              </div>
            </>
          ) : (
            <>
              <Link
                href="/campeonatos"
                onClick={() => setAbierto(false)}
                className="px-4 py-2 hover:bg-zinc-50"
              >
                Campeonatos
              </Link>
              <Link
                href="/login"
                onClick={() => setAbierto(false)}
                className="px-4 py-2 hover:bg-zinc-50"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                onClick={() => setAbierto(false)}
                className="px-4 py-2 hover:bg-zinc-50"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}