import { VehicleList } from "@/components/vehicle/VehicleList";

export default function VehiclePage(){
    return (
        <div className="max-w-md mx-auto p-4 py-12">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">
                Mis vehículos
                </h1>
            </div>
            <VehicleList />

            {/* Botón registrar */}
            <button className="mt-6 w-full border border-blue-500 text-blue-600 font-medium rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-blue-50">
                <span className="text-lg">+</span>
                Registrar vehículo
            </button>
        </div>
    );
}