"use client";
import React, { useState } from "react";
import SimForm from "../../../components/crud/SimForm";

// Simulación de datos iniciales (reemplaza por fetch a tu API)
const initialSims = [
  { ID_SIM: 1, Numero: "999111222", ID_Producto: "", Plan: "Prepago", Estado: "Activo" },
];

export default function SimPage() {
  const [sims, setSims] = useState(initialSims);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulación de productos (reemplaza por fetch a tu API)
  const productos = [
    { ID_Producto: 1, Nombre: "Producto 1" },
    { ID_Producto: 2, Nombre: "Producto 2" },
  ];

  const handleAdd = (data) => {
    setLoading(true);
    setTimeout(() => {
      if (editIndex !== null) {
        const updated = [...sims];
        updated[editIndex] = { ...updated[editIndex], ...data };
        setSims(updated);
      } else {
        setSims([...sims, { ...data, ID_SIM: Date.now() }]);
      }
      setModalOpen(false);
      setEditIndex(null);
      setLoading(false);
    }, 500);
  };

  const handleEdit = (idx) => {
    setEditIndex(idx);
    setModalOpen(true);
  };

  const handleDelete = (idx) => {
    setSims(sims.filter((_, i) => i !== idx));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Gestión de SIMs</h2>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
          onClick={() => { setModalOpen(true); setEditIndex(null); }}
        >
          Agregar SIM
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="px-4 py-2 text-left">Número</th>
              <th className="px-4 py-2 text-left">Plan</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Producto</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sims.map((sim, idx) => (
              <tr key={sim.ID_SIM} className="border-b hover:bg-slate-50">
                <td className="px-4 py-2">{sim.Numero}</td>
                <td className="px-4 py-2">{sim.Plan}</td>
                <td className="px-4 py-2">{sim.Estado}</td>
                <td className="px-4 py-2">{productos.find(p => p.ID_Producto === sim.ID_Producto)?.Nombre || "-"}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => handleEdit(idx)}
                  >Editar</button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(idx)}
                  >Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm bg-black/10">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg animate-fadeInScale relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              onClick={() => setModalOpen(false)}
              aria-label="Cerrar"
            >×</button>
            <h3 className="text-xl font-semibold mb-4">
              {editIndex !== null ? "Editar SIM" : "Agregar SIM"}
            </h3>
            <SimForm
              initialData={editIndex !== null ? sims[editIndex] : {}}
              productos={productos}
              onSubmit={handleAdd}
              loading={loading}
            />
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fadeInScale {
          animation: fadeInScale 0.2s ease;
        }
      `}</style>
    </div>
  );
}
