import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { provinciasEcuador } from "@/lib/ecuador-ubicaciones";

function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim();
}

export async function GET(request: NextRequest) {
  const lat = request.nextUrl.searchParams.get("lat");
  const lon = request.nextUrl.searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Faltan coordenadas" }, { status: 400 });
  }

  try {
    // 1. Geocodificación inversa con Nominatim (OpenStreetMap, gratuito)
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`,
      { headers: { "User-Agent": "CampeonatoHub/1.0" } }
    );
    const geoData = await geoRes.json();
    const address = geoData?.address ?? {};

    const posiblesNombres: string[] = [
      address.county,
      address.city,
      address.town,
      address.municipality,
      address.state_district,
    ].filter(Boolean);

    // 2. Buscar coincidencia con nuestra lista oficial de cantones
    let cantonEncontrado: string | null = null;
    let provinciaEncontrada: string | null = null;

    for (const provincia of provinciasEcuador) {
      for (const canton of provincia.cantones) {
        const nombreCanton = normalizar(canton.canton);
        if (
          posiblesNombres.some((n) => normalizar(n).includes(nombreCanton) || nombreCanton.includes(normalizar(n)))
        ) {
          cantonEncontrado = canton.canton;
          provinciaEncontrada = provincia.provincia;
          break;
        }
      }
      if (cantonEncontrado) break;
    }

    if (!cantonEncontrado) {
      return NextResponse.json({ campeonato: null, ubicacionDetectada: null });
    }

    // 3. Buscar un campeonato en ese cantón
    const supabase = await createClient();
    const { data: campeonato } = await supabase
      .from("campeonatos")
      .select("id, nombre, categoria, descripcion, canton, provincia")
      .eq("canton", cantonEncontrado)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    return NextResponse.json({
      campeonato: campeonato ?? null,
      ubicacionDetectada: cantonEncontrado,
      provinciaDetectada: provinciaEncontrada,
    });
  } catch (error) {
    return NextResponse.json({ error: "No se pudo determinar la ubicación" }, { status: 500 });
  }
}