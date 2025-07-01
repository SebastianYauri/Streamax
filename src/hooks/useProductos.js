"use client";
import { useState } from "react";
import { productos as productosMock } from "../features/inventarioData";

// Hook para manejar productos (mock, preparado para backend)
export function useProductos() {
  const [productos, setProductos] = useState(productosMock);

  // Simular fetch de productos
  const fetchProductos = async () => {
    // Aquí iría la llamada a backend
    setProductos(productosMock);
  };

  // Simular agregar producto
  const addProducto = (nuevo) => {
    setProductos((prev) => [...prev, nuevo]);
  };

  // Simular editar producto
  const updateProducto = (serie, data) => {
    setProductos((prev) =>
      prev.map((p) => (p.Serie === serie ? { ...p, ...data } : p))
    );
  };

  // Simular eliminar producto
  const deleteProducto = (serie) => {
    setProductos((prev) => prev.filter((p) => p.Serie !== serie));
  };

  return {
    productos,
    fetchProductos,
    addProducto,
    updateProducto,
    deleteProducto,
  };
}
