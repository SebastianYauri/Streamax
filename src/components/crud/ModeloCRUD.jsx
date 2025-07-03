"use client";
import React, { useState } from "react";

export default function ModeloCRUD({ modelos = [], marcas = [], onAdd, onEdit, onDelete }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ Descripcion: "", ID_Marca: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.Descripcion || !form.ID_Marca) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");
    if (editIndex !== null) {
      onEdit(editIndex, form);
    } else {
      onAdd(form);
    }
    setForm({ Descripcion: "", ID_Marca: "" });
    setEditIndex(null);
    setModalOpen(false);
  };

  const handleEdit = (idx) => {
    setForm(modelos[idx]);
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
        <h2 className="text-2xl font-bold">Modelos</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 transition"
          onClick={() => { setModalOpen(true); setEditIndex(null); }}
        >
          Agregar Modelo
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
              {editIndex !== null ? "Editar Modelo" : "Agregar Modelo"}
            </h3>
            <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
              <input
                name="Descripcion"
                value={form.Descripcion}
                onChange={e => setForm({ ...form, Descripcion: e.target.value })}
                placeholder="Descripción"
                className="border rounded px-3 py-2"
                required
              />
              <select
                name="ID_Marca"
                value={form.ID_Marca}
                onChange={e => setForm({ ...form, ID_Marca: e.target.value })}
                className="border rounded px-3 py-2"
                required
              >
                <option value="">Selecciona marca</option>
                {marcas.map((m) => (
                  <option key={m.ID_Marca} value={m.ID_Marca}>{m.Nombre}</option>
                ))}
              </select>
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
            <th className="px-4 py-2 text-left">Descripción</th>
            <th className="px-4 py-2 text-left">Marca</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {modelos.map((modelo, idx) => {
            const marca = marcas.find((m) => m.ID_Marca === modelo.ID_Marca);
            return (
              <tr key={idx} className="border-b">
                <td className="px-4 py-2">{modelo.Descripcion}</td>
                <td className="px-4 py-2">{marca ? marca.Nombre : ""}</td>
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
            );
          })}
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
