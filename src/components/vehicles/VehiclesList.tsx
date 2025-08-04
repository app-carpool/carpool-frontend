"use client";
import { myVehicles } from "@/services/vehiclesService";
import { useEffect, useState } from "react";

export function VehiclesList(){
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      const result = await myVehicles();
      if (result.success && result.data) {
        setVehicles(result.data.data); // adaptá si el key no es `vehicles`
      } else {
        setError(result.message || "Error al obtener vehículos");
      }
      setLoading(false);
    };

    fetchVehicles();
  }, []);

  if (loading) return <p>Cargando vehículos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (vehicles.length === 0) return <p>No tenés vehículos registrados.</p>;

    return (
        <ul className="space-y-4">
        {vehicles.map((vehicle, index) => (
            <li key={index} className="p-4 border rounded shadow">
            <pre className="text-sm">{JSON.stringify(vehicle, null, 2)}</pre>
            </li>
        ))}
        </ul>
    );
}