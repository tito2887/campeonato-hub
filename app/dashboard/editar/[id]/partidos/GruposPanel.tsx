"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import SorteoAnimado from "../sorteo/SorteoAnimado";
import { guardarGrupos, sortearGrupos, generarPartidosGrupos } from "./gruposActions";

type EquipoGrupo = { id: string; nombre: string; grupo: number | null };
type EquipoAsignado = { id: string; nombre: string; grupo: number };

function mapearAsignaciones(equipos: EquipoGrupo[]) {
  const resultado: Record<string, number | null> = {};
  equipos.forEach((e) => {
    resultado[e.id] = e.grupo ?? null;
  });
  return resultado;
}

export default function GruposPanel({
  campeonatoId,
  equipos,
  hayPartidos,
}: {
  campeonatoId: string;
  equipos: EquipoGrupo[];
  hayPartidos: boolean;
}) {
  const router = useRouter();

  const sugerido = equipos.length <= 10 ? 1 : equipos.length <= 24 ? 2 : 4;
  const maxGuardado = Math.max(0, ...equipos.map((e) => e.grupo ?? 0));

  const [numeroGrupos, setNumeroGrupos] = useState(maxGuardado > 0 ? maxGuardado : sugerido);
  const [asignaciones, setAsignaciones] = useState<Record<string, number | null>>(() =>
    mapearAsignaciones(equipos)
  );
  const [formato, setFormato] = useState("unico");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [animacion, setAnimacion] = useState<{
    equipos: EquipoAsignado[];
    numeroGrupos: number;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  // Cuando la página se actualiza desde el servidor, se vuelve a sincronizar con lo guardado
  useEffect(() => {
    setAsignaciones(mapearAsignaciones(equipos));
  }, [equipos]);

  // Si se reduce la cantidad de grupos, los equipos que quedaban en un grupo inexistente pasan a "Sin grupo"
  function grupoDe(equipoId: string): number | null {
    const g = asignaciones[equipoId] ?? null;
    return g !== null && g <= numeroGrupos ? g : null;
  }

  const hayCambios = equipos.some((e) => (e.grupo ?? null) !== grupoDe(e.id));
  const nadaGuardado = equipos.every((e) => e.grupo === null);
  const equiposOrdenados = [...equipos].sort((a, b) => a.nombre.localeCompare(b.nombre));
  const listaGrupos = Array.from({ length: numeroGrupos }, (_, i) => i + 1);

  function guardar() {
    setError(null);
    setMensaje(null);

    if (
      hayPartidos &&
      hayCambios &&
      !window.confirm(
        "Ya hay partidos de grupos generados. Cambiar los grupos los borrará y tendrás que volver a generarlos. ¿Continuar?"
      )
    ) {
      return;
    }

    startTransition(async () => {
      const payload = equipos.map((e) => ({ equipoId: e.id, grupo: grupoDe(e.id) }));
      const resultado = await guardarGrupos(campeonatoId, payload);
      if (resultado?.error) {
        setError(resultado.error);
      } else {
        setMensaje(resultado?.cambios ? "Grupos guardados." : "No hay cambios para guardar.");
      }
    });
  }

  function sortear() {
    setError(null);
    setMensaje(null);

    if (equipos.length < 2) {
      setError("Necesitas al menos 2 equipos para sortear.");
      return;
    }

    if (
      hayPartidos &&
      !window.confirm(
        "Ya hay partidos de grupos generados. El sorteo cambiará los grupos y los borrará. ¿Continuar?"
      )
    ) {
      return;
    }

    startTransition(async () => {
      const resultado = await sortearGrupos(campeonatoId, numeroGrupos);
      if (resultado?.error) {
        setError(resultado.error);
      } else if (resultado?.equiposAnimacion) {
        setAnimacion({
          equipos: resultado.equiposAnimacion,
          numeroGrupos: resultado.numeroGrupos ?? numeroGrupos,
        });
      }
    });
  }

  function generar() {
    setError(null);
    setMensaje(null);

    if (
      hayPartidos &&
      !window.confirm(
        "Ya hay partidos generados. Se borrarán los partidos de la fase de grupos y se crearán de nuevo. ¿Continuar?"
      )
    ) {
      return;
    }

    startTransition(async () => {
      const resultado = await generarPartidosGrupos(campeonatoId, formato);
      if (resultado?.error) {
        setError(resultado.error);
      } else {
        const aviso = resultado?.sinGrupo
          ? ` ${resultado.sinGrupo} equipo(s) sin grupo no se incluyeron.`
          : "";
        setMensaje(`Partidos generados: ${resultado?.totalPartidos ?? 0}.${aviso}`);
      }
    });
  }

  function terminarAnimacion() {
    setAnimacion(null);
    router.refresh();
  }

  return (
    <>
      <div className="space-y-4 mb-6">
        <div className="border rounded-lg p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg">1. Grupos</h3>
            <p className="text-sm text-gray-500">
              Asigna cada equipo a su grupo según tu sorteo, o deja que la app lo sortee al azar.
            </p>
          </div>

          {equipos.length === 0 ? (
            <p className="text-sm text-gray-500">
              Primero registra equipos en la pestaña &quot;Equipos y jugadores&quot;.
            </p>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Cantidad de grupos</label>
                <input
                  type="number"
                  min={1}
                  max={equipos.length}
                  value={numeroGrupos}
                  onChange={(ev) => {
                    const n = parseInt(ev.target.value, 10);
                    if (!isNaN(n)) {
                      setNumeroGrupos(Math.min(Math.max(n, 1), equipos.length));
                    }
                  }}
                  className="w-20 border rounded px-2 py-1 text-sm"
                />
                <span className="text-xs text-gray-400">Sugerencia: {sugerido}</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-2">
                {equiposOrdenados.map((e) => (
                  <div
                    key={e.id}
                    className="flex items-center justify-between gap-2 border rounded px-3 py-2"
                  >
                    <span className="text-sm font-medium truncate">{e.nombre}</span>
                    <select
                      value={grupoDe(e.id) ?? ""}
                      onChange={(ev) => {
                        const valor = ev.target.value;
                        setAsignaciones((prev) => ({
                          ...prev,
                          [e.id]: valor === "" ? null : parseInt(valor, 10),
                        }));
                      }}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="">Sin grupo</option>
                      {listaGrupos.map((g) => (
                        <option key={g} value={g}>
                          Grupo {g}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                {listaGrupos.map((g) => (
                  <span key={g} className="bg-zinc-100 rounded-full px-2.5 py-1">
                    Grupo {g}: {equipos.filter((e) => grupoDe(e.id) === g).length}
                  </span>
                ))}
                <span className="bg-zinc-100 rounded-full px-2.5 py-1">
                  Sin grupo: {equipos.filter((e) => grupoDe(e.id) === null).length}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={guardar}
                  disabled={isPending || !hayCambios}
                  className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {isPending ? "Guardando..." : "Guardar grupos"}
                </button>
                <button
                  onClick={sortear}
                  disabled={isPending}
                  className="border border-zinc-300 text-sm px-4 py-2 rounded hover:bg-zinc-50 disabled:opacity-50"
                >
                  🎲 Sorteo al azar (con animación)
                </button>
                {hayCambios && (
                  <span className="text-xs text-amber-600">Hay cambios sin guardar</span>
                )}
              </div>
            </>
          )}
        </div>

        <div className="border rounded-lg p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg">2. Generar partidos</h3>
            <p className="text-sm text-gray-500">
              Crea las fechas de cada grupo con los equipos ya asignados.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Formato de partidos</label>
            <select
              value={formato}
              onChange={(ev) => setFormato(ev.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              <option value="unico">Solo ida (todos contra todos, una vez)</option>
              <option value="ida_vuelta">Ida y vuelta (todos contra todos, dos veces)</option>
            </select>
          </div>

          <button
            onClick={generar}
            disabled={isPending || hayCambios || nadaGuardado}
            className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-zinc-800 disabled:opacity-50"
          >
            {isPending ? "Generando..." : "⚽ Generar partidos"}
          </button>

          {nadaGuardado && equipos.length > 0 && (
            <p className="text-xs text-gray-400">Primero guarda los grupos para poder generar partidos.</p>
          )}
          {hayCambios && !nadaGuardado && (
            <p className="text-xs text-amber-600">Guarda los cambios de grupos antes de generar partidos.</p>
          )}
          <p className="text-xs text-gray-400">
            Repetir esto borra y vuelve a crear los partidos de la fase de grupos (no afecta la fase
            eliminatoria).
          </p>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {mensaje && <p className="text-green-600 text-sm">{mensaje}</p>}
      </div>

      {animacion && (
        <SorteoAnimado
          equipos={animacion.equipos}
          numeroGrupos={animacion.numeroGrupos}
          onTerminado={terminarAnimacion}
        />
      )}
    </>
  );
}