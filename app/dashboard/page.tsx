import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import CerrarSesionBoton from "@/components/CerrarSesionBoton";
import { eliminarCampeonato } from "./actions";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: perfil } = await supabase
    .from("perfiles")
    .select("nombre, rol")
    .eq("id", user.id)
    .single();

  const { data: misCampeonatos } =
    perfil?.rol === "organizador"
      ? await supabase
          .from("campeonatos")
          .select("id, nombre, categoria")
          .eq("organizador_id", user.id)
          .order("created_at", { ascending: true })
      : { data: null };

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          Hola, {perfil?.nombre ?? "usuario"}
        </h1>
        <CerrarSesionBoton />
      </div>

      <p className="text-gray-600 mb-8">
        Estás registrado como{" "}
        <span className="font-semibold">{perfil?.rol}</span>.
      </p>

      {perfil?.rol === "organizador" ? (
        <div className="border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Mis campeonatos</h2>
            <Link
              href="/dashboard/nuevo"
              className="inline-block bg-black text-white rounded-full px-4 py-2 text-sm"
            >
              Crear campeonato
            </Link>
          </div>

          {!misCampeonatos || misCampeonatos.length === 0 ? (
            <p className="text-sm text-gray-600">
              Aún no has creado ningún campeonato.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {misCampeonatos.map((camp) => (
                <li
                  key={camp.id}
                  className="flex items-center justify-between border rounded-md px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{camp.nombre}</p>
                    <p className="text-xs text-gray-500">{camp.categoria}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/dashboard/editar/${camp.id}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <form action={eliminarCampeonato}>
                      <input
                        type="hidden"
                        name="campeonato_id"
                        value={camp.id}
                      />
                      <button
                        type="submit"
                        className="text-sm text-red-600 hover:underline"
                      >
                        Eliminar
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="border rounded-lg p-5">
          <h2 className="font-semibold mb-2">Panel de participante</h2>
          <p className="text-sm text-gray-600">
            Aquí vas a poder ver e inscribirte a campeonatos disponibles.
          </p>
        </div>
      )}
    </main>
  );
}