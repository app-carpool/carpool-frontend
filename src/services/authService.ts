import { LoginFormData, RegisterFormData } from "@/types/forms";
import { User } from "@/types/user";

interface LoginResponse {
  token: string;
  user: User;
}

interface RegisterResponse{
    token: string;
    user: User;
}


export async function loginUser(data: LoginFormData): Promise<{
    success: boolean; 
    data?:LoginResponse; 
    message?: string}
> {
    try {
        const res = await fetch('/api/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })

        if (!res.ok) {
            throw new Error('Credenciales inválidas')
        }

        const response: LoginResponse = await res.json();

        return {success: true, data: response}
    } catch (err: any) {
        return {success: false, message: err.message}
    }
    
}

export async function registerUser(data: RegisterFormData): Promise<{
    success:boolean;
    data?:RegisterResponse;
    message?: string}
> {
    try {
        const res = await fetch('/api/register',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })

        if (!res.ok){
            throw new Error('Datos inválidos')
        }

        const response: RegisterResponse = await res.json();

        return {success: true, data: response}
    } catch (err: any) {
        return {success: false, message: err.message}
    }
}
