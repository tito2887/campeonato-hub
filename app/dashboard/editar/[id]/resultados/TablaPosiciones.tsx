type Partido = {
  grupo: number | null;
  jugado: boolean;
  gol_local: number | null;
  gol_visitante: number | null;
  equipo_local_id: string;
  equipo_visitante_id: string;
};

type Equipo = {
  id: string;
  nombre: string;
  grupo: number | null;
};

type Puntos = {
  puntos_victoria: number;
  puntos_empate: number;
  puntos_derrota: number;
};

type Fila = {
  equipoId: string;
  nombre: string;
  jj: number;
  jg: number;
  je: number;
  jp: number;
  gf: number;
  gc: number;
  dif: number;
  pts: number;
};

function calcularTabla(equipos: Equipo[], partidos: Partido[], puntos: Puntos): Fila[] {
  const tabla: Record<string, Fila> = {};

  for (const equipo of equipos) {
    tabla[equipo.id] = {
      equipoId: equipo.id,
      nombre: equipo.nombre,
      jj: 0,
      jg: 0,
      je: 0,
      jp: 0,
      gf: 0,
      gc: 0,
      dif: 0,
      pts: 0,
    };
  }

  for (const partido of partidos) {
    if (!partido.jugado || partido.gol_local === null || partido.gol_visitante === null) continue;

    const local = tabla[partido.equipo_local_id];
    const visitante = tabla[partido.equipo_visitante_id];
    if (!local || !visitante) continue;

    local.jj++;
    visitante.jj++;
    local.gf += partido.gol_local;
    local.gc += partido.gol_visitante;
    visitante.gf += partido.gol_visitante;
    visitante.gc += partido.gol_local;

    if (partido.gol_local > partido.gol_visitante) {
      local.jg++;
      local.pts += puntos.puntos_victoria;
      visitante.jp++;
      visitante.pts += puntos.puntos_derrota;
    } else if (partido.gol_local < partido.gol_visitante) {
      visitante.jg++;
      visitante.pts += puntos.puntos_victoria;
      local.jp++;
      local.pts += puntos.puntos_derrota;
    } else {
      local.je++;
      visitante.je++;
      local.pts += puntos.puntos_empate;
      visitante.pts += puntos.puntos_empate;
    }
  }

  for (const fila of Object.values(tabla)) {
    fila.dif = fila.gf - fila.gc;
  }

  // Orden base: Puntos -> Victorias -> Diferencia de gol -> Goles a favor
  const ordenada = Object.values(tabla).sort(
    (a, b) => b.pts - a.pts || b.jg - a.jg || b.dif - a.dif || b.gf - a.gf
  );

  // Desempate por conflicto directo: si exactamente 2 equipos quedan
  // totalmente empatados en pts/victorias/dif/gf, se revisa el resultado
  // entre ellos dos antes de dejarlos en ese orden.
  for (let i = 0; i < ordenada.length - 1; i++) {
    const actual = ordenada[i];
    const siguiente = ordenada[i + 1];

    const empatados =
      actual.pts === siguiente.pts &&
      actual.jg === siguiente.jg &&
      actual.dif === siguiente.dif &&
      actual.gf === siguiente.gf;

    if (!empatados) continue;

    const enfrentamiento = partidos.find(
      (p) =>
        p.jugado &&
        ((p.equipo_local_id === actual.equipoId && p.equipo_visitante_id === siguiente.equipoId) ||
          (p.equipo_local_id === siguiente.equipoId && p.equipo_visitante_id === actual.equipoId))
    );

    if (!enfrentamiento || enfrentamiento.gol_local === null || enfrentamiento.gol_visitante === null) {
      continue;
    }

    const golesActual =
      enfrentamiento.equipo_local_id === actual.equipoId
        ? enfrentamiento.gol_local
        : enfrentamiento.gol_visitante;
    const golesSiguiente =
      enfrentamiento.equipo_local_id === siguiente.equipoId
        ? enfrentamiento.gol_local
        : enfrentamiento.gol_visitante;

    if (golesSiguiente > golesActual) {
      // El equipo de abajo le ganó el cruce directo al de arriba: se intercambian
      ordenada[i] = siguiente;
      ordenada[i + 1] = actual;
    }
  }

  return ordenada;
}

export default function TablaPosiciones({
  equipos,
  partidos,
  puntos,
  numeroGrupo,
}: {
  equipos: Equipo[];
  partidos: Partido[];
  puntos: Puntos;
  numeroGrupo: number;
}) {
  const equiposDelGrupo = equipos.filter((e) => e.grupo === numeroGrupo);
  const partidosDelGrupo = partidos.filter((p) => p.grupo === numeroGrupo);
  const tabla = calcularTabla(equiposDelGrupo, partidosDelGrupo, puntos);

  return (
    <table className="w-full text-sm border-collapse mb-6">
      <thead>
        <tr className="border-b text-left text-gray-500">
          <th className="py-1">Equipo</th>
          <th className="py-1 text-center">PJ</th>
          <th className="py-1 text-center">G</th>
          <th className="py-1 text-center">E</th>
          <th className="py-1 text-center">P</th>
          <th className="py-1 text-center">GF</th>
          <th className="py-1 text-center">GC</th>
          <th className="py-1 text-center">DIF</th>
          <th className="py-1 text-center font-bold">Pts</th>
        </tr>
      </thead>
      <tbody>
        {tabla.map((fila, indice) => (
          <tr key={fila.equipoId} className="border-b">
            <td className="py-1">
              {indice + 1}. {fila.nombre}
            </td>
            <td className="py-1 text-center">{fila.jj}</td>
            <td className="py-1 text-center">{fila.jg}</td>
            <td className="py-1 text-center">{fila.je}</td>
            <td className="py-1 text-center">{fila.jp}</td>
            <td className="py-1 text-center">{fila.gf}</td>
            <td className="py-1 text-center">{fila.gc}</td>
            <td className="py-1 text-center">{fila.dif}</td>
            <td className="py-1 text-center font-bold">{fila.pts}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}