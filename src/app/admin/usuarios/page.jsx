"use client";
import React, { useState } from "react";
import UsuarioForm from "../../../components/crud/UsuarioForm";

// Simulación de datos iniciales (reemplaza por fetch a tu API)
const initialUsuarios = [
  { ID_Usuario: 1, Nombre: "Admin", Email: "admin@demo.com", Rol: "admin" },
  { ID_Usuario: 2, Nombre: "Operador", Email: "op@demo.com", Rol: "operador" },
];

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState(initialUsuarios);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAdd = (data) => {
    setLoading(true);
    setTimeout(() => {
      if (editIndex !== null) {
        const updated = [...usuarios];
        updated[editIndex] = { ...updated[editIndex], ...data };
        setUsuarios(updated);
      } else {
        setUsuarios([...usuarios, { ...data, ID_Usuario: Date.now() }]);
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
    setUsuarios(usuarios.filter((_, i) => i !== idx));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 mb-4"
        onClick={() => { setModalOpen(true); setEditIndex(null); }}
      >
        Agregar Usuario
      </button>
      <table className="min-w-full text-sm mb-6">
        <thead>
          <tr className="bg-slate-100">
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Rol</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, idx) => (
            <tr key={u.ID_Usuario} className="border-b">
              <td className="px-4 py-2">{u.Nombre}</td>
              <td className="px-4 py-2">{u.Email}</td>
              <td className="px-4 py-2">{u.Rol}</td>
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
              {editIndex !== null ? "Editar Usuario" : "Agregar Usuario"}
            </h3>
            <UsuarioForm
              initialData={editIndex !== null ? usuarios[editIndex] : {}}
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
