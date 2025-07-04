"use client";
import React from "react";
import { useProductos } from "../../hooks/useProductos";

export default function InventarioProductos() {
  const { productos } = useProductos();
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Inventario de Productos</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-slate-100">
            <th className="px-4 py-2 text-left">Serie</th>
            <th className="px-4 py-2 text-left">ID Modelo</th>
            <th className="px-4 py-2 text-left">ID Categoría</th>
            <th className="px-4 py-2 text-left">Estado</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod, idx) => (
            <tr key={idx} className="border-b">
              <td className="px-4 py-2">{prod.Serie}</td>
              <td className="px-4 py-2">{prod.ID_Modelo}</td>
              <td className="px-4 py-2">{prod.ID_Categoria}</td>
              <td className="px-4 py-2">{prod.Estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
