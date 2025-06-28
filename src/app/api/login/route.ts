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

    const responseData = await response.json();

    if (!response.ok) {
      // Si hubo error, lo devolvés directamente
      return new Response(JSON.stringify(responseData), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    // token está en responseData.data
    const token = responseData.data;

    // Armás la cookie con el token
    const cookie = `token=${token}; Path=/; Max-Age=3600; HttpOnly; Secure; SameSite=Lax`;

    return new Response(
      JSON.stringify({
        status: responseData.status,
        message: responseData.message,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": cookie,
        },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Error en la API de login",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
