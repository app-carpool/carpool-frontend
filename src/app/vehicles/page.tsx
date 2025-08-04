import { VehiclesList } from "@/components/vehicles/VehiclesList";

export default function VehiclesPage(){
    return (
        <div className="max-w-md mx-auto p-4 py-12">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">
                Mis vehículos
                </h1>
            </div>
            <VehiclesList />
        </div>
    );
}