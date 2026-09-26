type EquipoRef = { nombre: string } | null;

type Partido = {
  id: string;
  fase: string;
  llave: number;
  jugado: boolean;
  gol_local: number | null;
  gol_visitante: number | null;
  equipo_local: EquipoRef;
  equipo_visitante: EquipoRef;
};

const ORDEN_FASE: Record<string, number> = {
  dieciseisavos: 1,
  octavos: 2,
  cuartos: 3,
  semifinal: 4,
  final: 5,
};

function resumenLlave(partidosLlave: Partido[]) {
  if (partidosLlave.length === 0) return null;
  const primero = partidosLlave[0];
  const nombreA = primero.equipo_local?.nombre ?? "?";
  const nombreB = primero.equipo_visitante?.nombre ?? "?";

  let golesA = 0;
  let golesB = 0;
  let todosJugados = true;

  for (const p of partidosLlave) {
    if (!p.jugado) {
      todosJugados = false;
      continue;
    }
    if (p.equipo_local?.nombre === nombreA) {
      golesA += p.gol_local ?? 0;
      golesB += p.gol_visitante ?? 0;
    } else {
      golesA += p.gol_visitante ?? 0;
      golesB += p.gol_local ?? 0;
    }
  }

  return { nombreA, nombreB, golesA, golesB, jugado: todosJugados };
}

function CajaLlave({ resumen }: { resumen: ReturnType<typeof resumenLlave> }) {
  if (!resumen) return null;
  const ganadorA = resumen.jugado && resumen.golesA > resumen.golesB;
  const ganadorB = resumen.jugado && resumen.golesB > resumen.golesA;

  return (
    <div className="border rounded-lg bg-white text-xs w-44 shadow-sm">
      <div className={"flex items-center justify-between px-2 py-1.5 " + (ganadorA ? "font-bold" : "text-gray-600")}>
        <span className="truncate">{resumen.nombreA}</span>
        <span>{resumen.jugado ? resumen.golesA : ""}</span>
      </div>
      <div className={"flex items-center justify-between px-2 py-1.5 border-t " + (ganadorB ? "font-bold" : "text-gray-600")}>
        <span className="truncate">{resumen.nombreB}</span>
        <span>{resumen.jugado ? resumen.golesB : ""}</span>
      </div>
    </div>
  );
}

export default function BracketEliminatoria({ partidos }: { partidos: Partido[] }) {
  const fases = Array.from(new Set(partidos.map((p) => p.fase))).sort(
    (a, b) => (ORDEN_FASE[a] ?? 99) - (ORDEN_FASE[b] ?? 99)
  );

  const fasesSinFinal = fases.filter((f) => f !== "final");
  const tieneFinal = fases.includes("final");

  if (fasesSinFinal.length === 0 && !tieneFinal) return null;

  // Total de llaves en la primera ronda, para saber cuáles van a la izquierda vs la derecha
  const primeraFase = fasesSinFinal[0];
  const llavesPrimeraFase = primeraFase
    ? Array.from(new Set(partidos.filter((p) => p.fase === primeraFase).map((p) => p.llave)))
    : [];
  const totalLlavesInicial = llavesPrimeraFase.length;
  const mitad = Math.ceil(totalLlavesInicial / 2);

  function columnaDeFase(fase: string, lado: "izquierda" | "derecha") {
    const llaves = Array.from(
      new Set(partidos.filter((p) => p.fase === fase).map((p) => p.llave))
    ).sort((a, b) => a - b);

    const llavesDelLado = llaves.filter((llave) =>
      lado === "izquierda" ? llave <= Math.ceil(llaves.length / 2) : llave > Math.ceil(llaves.length / 2)
    );

    return (
      <div key={fase + lado} className="flex flex-col justify-around gap-4 h-full">
        {llavesDelLado.map((llave) => {
          const partidosLlave = partidos.filter((p) => p.fase === fase && p.llave === llave);
          return <CajaLlave key={llave} resumen={resumenLlave(partidosLlave)} />;
        })}
      </div>
    );
  }

  const golpeIzquierda = fasesSinFinal.map((fase) => columnaDeFase(fase, "izquierda"));
  const golpeDerecha = [...fasesSinFinal].reverse().map((fase) => columnaDeFase(fase, "derecha"));

  const partidosFinal = tieneFinal ? partidos.filter((p) => p.fase === "final") : [];

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex items-stretch gap-6 min-w-max py-2">
        {golpeIzquierda}

        {tieneFinal && (
          <div className="flex flex-col justify-center items-center gap-2 px-2">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
              Final
            </span>
            <CajaLlave resumen={resumenLlave(partidosFinal)} />
          </div>
        )}

        {golpeDerecha}
      </div>
    </div>
  );
}