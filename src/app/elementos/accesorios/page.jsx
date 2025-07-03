"use client";
import React, { useState } from "react";
import AccesorioForm from "../../../components/crud/AccesorioForm";

// Simulación de datos iniciales (reemplaza por fetch a tu API)
const initialAccesorios = [
  { ID_Accesorio: 1, ID_Categoria: 1, Nombre: "Cargador", Descripcion: "Cargador USB", Cantidad: 10 },
];

export default function AccesoriosPage() {
  const [accesorios, setAccesorios] = useState(initialAccesorios);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulación de categorías (reemplaza por fetch a tu API)
  const categorias = [
    { ID_Categoria: 1, Nombre: "Cables" },
    { ID_Categoria: 2, Nombre: "Adaptadores" },
  ];

  const handleAdd = (data) => {
    setLoading(true);
    setTimeout(() => {
      if (editIndex !== null) {
        const updated = [...accesorios];
        updated[editIndex] = { ...updated[editIndex], ...data };
        setAccesorios(updated);
      } else {
        setAccesorios([...accesorios, { ...data, ID_Accesorio: Date.now() }]);
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
    setAccesorios(accesorios.filter((_, i) => i !== idx));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Accesorios</h2>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 mb-4"
        onClick={() => { setModalOpen(true); setEditIndex(null); }}
      >
        Agregar Accesorio
      </button>
      <table className="min-w-full text-sm mb-6">
        <thead>
          <tr className="bg-slate-100">
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Descripción</th>
            <th className="px-4 py-2 text-left">Categoría</th>
            <th className="px-4 py-2 text-left">Cantidad</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {accesorios.map((a, idx) => (
            <tr key={a.ID_Accesorio} className="border-b">
              <td className="px-4 py-2">{a.Nombre}</td>
              <td className="px-4 py-2">{a.Descripcion}</td>
              <td className="px-4 py-2">{categorias.find(c => c.ID_Categoria === a.ID_Categoria)?.Nombre || "-"}</td>
              <td className="px-4 py-2">{a.Cantidad}</td>
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
      {modalOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm bg-black/10">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg animate-fadeInScale relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              onClick={() => setModalOpen(false)}
              aria-label="Cerrar"
            >×</button>
            <h3 className="text-xl font-semibold mb-4">
              {editIndex !== null ? "Editar Accesorio" : "Agregar Accesorio"}
            </h3>
            <AccesorioForm
              initialData={editIndex !== null ? accesorios[editIndex] : {}}
              categorias={categorias}
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
