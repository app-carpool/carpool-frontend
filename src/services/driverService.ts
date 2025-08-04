import { DriverData } from "@/schemas/auth/driverSchema";
import { DriverResponse } from "@/types/response/driver";

export async function registerDriver( data: DriverData): Promise<{
  success:boolean;
  data?:DriverResponse;
  message?: string}
> {
  try {
    const body = { ...data};

    const res = await fetch(`/api/drivers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include', 
    });
    
    if (!res.ok){
      const errorMessage = await res.json();
      throw new Error(errorMessage.message);
    }

    const response: DriverResponse = await res.json();

    return {success: true, data: response}
  } catch (err: any) {
    return {success: false, message: err.message}
  }
}