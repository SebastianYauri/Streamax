"use client";
import React, { useState } from "react";

// TODO: Reemplazar initialCategorias y lógica local por datos y operaciones de la API
const initialCategorias = [];

export default function CategoriasCRUD() {
  const [categorias, setCategorias] = useState(initialCategorias);
  const [form, setForm] = useState({ nombre: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...categorias];
      updated[editIndex] = form;
      setCategorias(updated);
      setEditIndex(null);
    } else {
      setCategorias([...categorias, form]);
    }
    setForm({ nombre: "" });
    setModalOpen(false);
  };

  const handleEdit = (idx) => {
    setForm(categorias[idx]);
    setEditIndex(idx);
    setModalOpen(true);
  };

  const handleDelete = (idx) => {
    setCategorias(categorias.filter((_, i) => i !== idx));
    if (editIndex === idx) {
      setForm({ nombre: "" });
      setEditIndex(null);
    }
  };

  const handleOpenModal = () => {
    setForm({ nombre: "" });
    setEditIndex(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setForm({ nombre: "" });
    setEditIndex(null);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6 mb-8 overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Categorías</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 transition"
          onClick={handleOpenModal}
        >
          Agregar Categoría
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm bg-black/10">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg animate-fadeInScale relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              onClick={handleCloseModal}
              aria-label="Cerrar"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {editIndex !== null ? "Editar Categoría" : "Agregar Categoría"}
            </h3>
            <form className="flex flex-col gap-4" onSubmit={handleAdd}>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre de la categoría"
                className="border rounded px-3 py-2 flex-1"
                required
              />
              <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">
                {editIndex !== null ? "Actualizar" : "Agregar"}
              </button>
            </form>
          </div>
        </div>
      )}

      <table className="min-w-full text-sm overflow-x-auto block md:table">
        <thead>
          <tr className="bg-slate-100">
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((cat, idx) => (
            <tr key={idx} className="border-b">
              <td className="px-4 py-2">{cat.nombre}</td>
              <td className="px-4 py-2">
                <div className="flex flex-col gap-2 md:flex-row md:gap-2 w-full">
                  <button
                    className="bg-yellow-400 text-white px-2 py-1 rounded w-full md:w-auto"
                    onClick={() => handleEdit(idx)}
                    type="button"
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded w-full md:w-auto"
                    onClick={() => handleDelete(idx)}
                    type="button"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
