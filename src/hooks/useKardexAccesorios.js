"use client";
import { useState } from "react";
import { kardexAccesorios } from "../features/inventarioData";

// Hook para manejar kardex de accesorios (mock, preparado para backend)
export function useKardexAccesorios() {
  const [kardex, setKardex] = useState(kardexAccesorios);

  // Simular fetch de kardex accesorios
  const fetchKardex = async () => {
    setKardex(kardexAccesorios);
  };

  // Simular agregar movimiento
  const addMovimiento = (nuevo) => {
    setKardex((prev) => [...prev, nuevo]);
  };

  // Simular editar movimiento
  const updateMovimiento = (id, data) => {
    setKardex((prev) =>
      prev.map((k) => (k.ID_Kardex === id ? { ...k, ...data } : k))
    );
  };

  // Simular eliminar movimiento
  const deleteMovimiento = (id) => {
    setKardex((prev) => prev.filter((k) => k.ID_Kardex !== id));
  };

  return {
    kardex,
    fetchKardex,
    addMovimiento,
    updateMovimiento,
    deleteMovimiento,
  };
}
