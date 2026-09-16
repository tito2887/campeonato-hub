"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabsNav({ campeonatoId }: { campeonatoId: string }) {
  const pathname = usePathname();
  const base = `/dashboard/editar/${campeonatoId}`;

  const tabs = [
    { href: base, label: "Resumen", exact: true },
    { href: `${base}/equipos`, label: "Equipos y jugadores" },
    { href: `${base}/sorteo`, label: "Sorteo de grupos" },
    { href: `${base}/resultados`, label: "Resultados y posiciones" },
    { href: `${base}/datos`, label: "Datos del campeonato" },
  ];

  return (
    <nav className="flex flex-wrap gap-2 border-b pb-3">
      {tabs.map((tab) => {
        const activo = tab.exact ? pathname === tab.href : pathname?.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={
              "text-sm px-4 py-2 rounded-full border " +
              (activo
                ? "bg-black text-white border-black"
                : "bg-white text-zinc-600 border-zinc-300 hover:bg-zinc-50")
            }
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}