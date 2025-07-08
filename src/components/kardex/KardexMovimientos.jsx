"use client";
import React from "react";
import { useKardex } from "../../hooks/useKardex";

export default function KardexMovimientos() {
  const { kardex } = useKardex();
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Kardex de Movimientos</h2>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full text-sm whitespace-nowrap">
          <thead>
            <tr className="bg-slate-100">
              <th className="px-4 py-2 text-left">ID Kardex</th>
              <th className="px-4 py-2 text-left">Tipo</th>
              <th className="px-4 py-2 text-left">ID Producto</th>
              <th className="px-4 py-2 text-left">ID Directorio</th>
            </tr>
          </thead>
          <tbody>
            {kardex.map((mov, idx) => (
              <tr key={idx} className="border-b">
                <td className="px-4 py-2">{mov.ID_Kardex}</td>
                <td className="px-4 py-2">{mov.Tipo}</td>
                <td className="px-4 py-2">{mov.ID_Producto}</td>
                <td className="px-4 py-2">{mov.ID_Directorio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
