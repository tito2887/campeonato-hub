import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import CerrarSesionBoton from "@/components/CerrarSesionBoton";

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
          <h2 className="font-semibold mb-2">Panel de organizador</h2>
          <p className="text-sm text-gray-600">
            Aquí vas a poder crear y gestionar tus campeonatos.
          </p>
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