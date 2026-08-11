"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("participante");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setCargando(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError || !data.user) {
      setError(signUpError?.message ?? "No se pudo crear la cuenta.");
      setCargando(false);
      return;
    }

    const { error: perfilError } = await supabase.from("perfiles").insert({
      id: data.user.id,
      nombre,
      rol,
    });

    if (perfilError) {
      setError("Cuenta creada, pero hubo un error al guardar el perfil.");
      setCargando(false);
      return;
    }

    router.push("/login");
  }

  return (
    <main className="max-w-sm mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Crear cuenta</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="border rounded-md px-4 py-2"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded-md px-4 py-2"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="border rounded-md px-4 py-2"
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Quiero registrarme como:</label>
          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            className="border rounded-md px-4 py-2"
          >
            <option value="participante">Participante</option>
            <option value="organizador">Organizador</option>
          </select>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={cargando}
          className="bg-black text-white rounded-full py-2 mt-2 disabled:opacity-50"
        >
          {cargando ? "Creando cuenta..." : "Registrarme"}
        </button>
      </form>
    </main>
  );
}