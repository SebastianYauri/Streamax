"use client";
import React, { useState } from "react";

export default function MarcaCRUD({ marcas = [], onAdd, onEdit, onDelete }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ Nombre: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.Nombre) {
      setError("El nombre es obligatorio");
      return;
    }
    setError("");
    if (editIndex !== null) {
      onEdit(editIndex, form);
    } else {
      onAdd(form);
    }
    setForm({ Nombre: "" });
    setEditIndex(null);
    setModalOpen(false);
  };

  const handleEdit = (idx) => {
    setForm(marcas[idx]);
    setEditIndex(idx);
    setModalOpen(true);
  };

  const handleDelete = (idx) => {
    onDelete(idx);
    setEditIndex(null);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Marcas</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 transition"
          onClick={() => { setModalOpen(true); setEditIndex(null); }}
        >
          Agregar Marca
        </button>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm bg-black/10">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg animate-fadeInScale relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              onClick={() => setModalOpen(false)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {editIndex !== null ? "Editar Marca" : "Agregar Marca"}
            </h3>
            <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
              <input
                name="Nombre"
                value={form.Nombre}
                onChange={e => setForm({ ...form, Nombre: e.target.value })}
                placeholder="Nombre"
                className="border rounded px-3 py-2"
                required
              />
              {error && <div className="text-red-600">{error}</div>}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 mt-2 transition"
              >
                {editIndex !== null ? "Actualizar" : "Agregar"}
              </button>
            </form>
          </div>
        </div>
      )}
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-slate-100">
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {marcas.map((marca, idx) => (
            <tr key={idx} className="border-b">
              <td className="px-4 py-2">{marca.Nombre}</td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded transition"
                  onClick={() => handleEdit(idx)}
                  type="button"
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition"
                  onClick={() => handleDelete(idx)}
                  type="button"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
