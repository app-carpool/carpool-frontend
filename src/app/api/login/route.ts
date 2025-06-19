import { NextRequest } from "next/server";

const apiUrl=process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const response = await fetch(`${apiUrl}/login`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        })

        const data = await response.json()

        return new Response(JSON.stringify(data),{
            status: response.status,
            headers: {'Content-Type': 'application/json'},
        })
    } catch (error:any) {
        return new Response(
            JSON.stringify({ message: "Error en la API de login", detail: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

