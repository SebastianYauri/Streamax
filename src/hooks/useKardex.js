"use client";
import { useState } from "react";
import { kardex as kardexMock } from "../features/inventarioData";

// Hook para manejar kardex (mock, preparado para backend)
export function useKardex() {
  const [kardex, setKardex] = useState(kardexMock);

  // Simular fetch de kardex
  const fetchKardex = async () => {
    // Aquí iría la llamada a backend
    setKardex(kardexMock);
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
