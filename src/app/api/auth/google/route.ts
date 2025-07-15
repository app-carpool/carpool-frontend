import { GoogleLoginResponse } from "@/types/response/auth";
import { NextRequest, NextResponse } from "next/server";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
    try {
        const {idToken} = await req.json();

        const res = await fetch(`${apiUrl}/auth-google`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({idToken})
        })

        const data: GoogleLoginResponse = await res.json();
        console.log('data desde el api route',data)

        if (!res.ok){
            return NextResponse.json({success: false, message: data.messages || 'Error desde backend'});
        }

        return NextResponse.json({success: true, ...data});
    } catch (error: any) {
        console.error('Error en api/auth/google:', error);
        return NextResponse.json({ success: false, message: 'Error interno en el servidor' }, { status: 500 });
    }
}