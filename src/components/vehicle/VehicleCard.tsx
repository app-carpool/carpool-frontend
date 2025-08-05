"use client";
import Image from "next/image";
import { useState } from "react";
import { VehicleActionsModal } from "./VehicleActionsModal";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => {
    console.log("Editar vehículo", vehicle.id);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    console.log("Eliminar vehículo", vehicle.id);
    setIsModalOpen(false);
  };
  
  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-between border border-blue-500 rounded-lg p-4 shadow hover:shadow-md transition-all bg-white cursor-pointer"
      >
        <div className="flex items-center gap-4">
          {/* Imagen del vehículo */}
          <div className="relative w-16 h-16">
            <Image
              src="/car-placeholder.webp"
              alt="Imagen del vehículo"
              fill
              className="object-contain"
            />
          </div>

          {/* Nombre del vehículo */}
          <span className="font-medium text-gray-900">
            {vehicle.brand} {vehicle.model}
          </span>
        </div>

        {/* Flechita */}
        <span className="text-blue-500 text-xl">&rsaquo;</span>
      </div>

      {/* Modal de acciones */}
      <VehicleActionsModal
        vehicle={vehicle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
}