import { VehicleResponse } from "@/types/response/vehicle";

export async function myVehicles(): Promise<{
  success: boolean;
  data?: VehicleResponse;
  message?: string;
}> {
  try {
    const res = await fetch("/api/vehicle", {
      method: "GET",
      credentials: "include", // incluye las cookies (donde está el token)
    });

    if (!res.ok) {
      const errorMessage = await res.json();
      throw new Error(errorMessage.message);
    }

    const response: VehicleResponse = await res.json();

    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, message: error.message || "Network error" };
  }
}