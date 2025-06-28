import { NextRequest } from "next/server";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    // Si es un error antes de recibir la respuesta del backend
    return new Response(
      JSON.stringify({
        state: "ERROR",
        messages: ["Error en la API de login", error.message],
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
