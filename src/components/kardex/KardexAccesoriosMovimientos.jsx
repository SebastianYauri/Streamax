"use client";
import React from "react";
import { useKardexAccesorios } from "../../hooks/useKardexAccesorios";

export default function KardexAccesoriosMovimientos() {
  const { kardex } = useKardexAccesorios();
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Kardex de Accesorios</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-slate-100">
            <th className="px-4 py-2 text-left">ID Kardex</th>
            <th className="px-4 py-2 text-left">ID Accesorio</th>
            <th className="px-4 py-2 text-left">Cantidad</th>
            <th className="px-4 py-2 text-left">Fecha</th>
            <th className="px-4 py-2 text-left">ID Usuario</th>
            <th className="px-4 py-2 text-left">ID Directorio</th>
          </tr>
        </thead>
        <tbody>
          {kardex.map((mov, idx) => (
            <tr key={idx} className="border-b">
              <td className="px-4 py-2">{mov.ID_Kardex}</td>
              <td className="px-4 py-2">{mov.ID_Accesorio}</td>
              <td className="px-4 py-2">{mov.Cantidad}</td>
              <td className="px-4 py-2">{mov.Fecha}</td>
              <td className="px-4 py-2">{mov.ID_Usuario}</td>
              <td className="px-4 py-2">{mov.ID_Directorio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
