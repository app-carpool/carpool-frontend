"use client";

import { X, Pencil } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Separator from "../ui/Separator";

interface Props {
  vehicle: Vehicle;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function VehicleActionsModal({ vehicle, isOpen, onClose, onEdit, onDelete }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      // esperar animación antes de desmontar
      const timer = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible && !isOpen) return null;

  return (
    <div className="fixed inset-0 z-90 flex items-end justify-center">
      {/* Fondo gris semi-transparente */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-200 ${
          isOpen ? "opacity-30" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Contenedor del modal */}
      <div
        className={`relative w-full max-w-md bg-white rounded-t-2xl p-6 z-50 shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Arrastre visual */}
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-300" />

        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-12 h-12">
            <Image src="/car-placeholder.webp" alt="Auto" fill className="object-contain" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            {vehicle.brand?.toUpperCase()} {vehicle.model?.toUpperCase()}
          </h2>
        </div>
        
        {/* Separator entre los datos del vehículo y los botones */}
        <Separator/>

        <button
          onClick={onEdit}
          className="flex items-center gap-2 mb-4 text-gray-800 hover:text-blue-600"
        >
          <Pencil size={18} />
          Editar vehículo
        </button>

        <button
          onClick={onDelete}
          className="flex items-center gap-2 text-red-600 hover:text-red-800"
        >
          <X size={18} />
          Dar de baja el automóvil
        </button>
      </div>
    </div>
  );
}
