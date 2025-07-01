"use client";
import React, { useState } from "react";

// Simulación de datos iniciales (puedes reemplazar por fetch a una API o contexto)
const initialProductos = [
  // Ejemplo: { Serie: "123", ID_Modelo: "1", ID_Categoria: "2", Estado: "Nuevo" }
];

export default function InventarioCRUD() {
  const [productos, setProductos] = useState(initialProductos);
  const [form, setForm] = useState({
    Serie: "",
    ID_Modelo: "",
    ID_Categoria: "",
    Estado: ""
  });
  const [editIndex, setEditIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Handlers
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Update
      const updated = [...productos];
      updated[editIndex] = form;
      setProductos(updated);
      setEditIndex(null);
    } else {
      // Add
      setProductos([...productos, form]);
    }
    setForm({ Serie: "", ID_Modelo: "", ID_Categoria: "", Estado: "" });
    setModalOpen(false);
  };

  const handleEdit = (idx) => {
    setForm(productos[idx]);
    setEditIndex(idx);
    setModalOpen(true);
  };

  const handleDelete = (idx) => {
    setProductos(productos.filter((_, i) => i !== idx));
    if (editIndex === idx) {
      setForm({ Serie: "", ID_Modelo: "", ID_Categoria: "", Estado: "" });
      setEditIndex(null);
    }
  };

  const handleOpenModal = () => {
    setForm({ Serie: "", ID_Modelo: "", ID_Categoria: "", Estado: "" });
    setEditIndex(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setForm({ Serie: "", ID_Modelo: "", ID_Categoria: "", Estado: "" });
    setEditIndex(null);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6 mb-8 overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Inventario de Productos</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 transition"
          onClick={handleOpenModal}
        >
          Agregar Producto
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
              {editIndex !== null ? "Editar Producto" : "Agregar Producto"}
            </h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleAdd}>
              <input
                name="Serie"
                value={form.Serie}
                onChange={handleChange}
                placeholder="Serie"
                className="border rounded px-3 py-2"
                required
              />
              <input
                name="ID_Modelo"
                value={form.ID_Modelo}
                onChange={handleChange}
                placeholder="ID Modelo"
                className="border rounded px-3 py-2"
                required
              />
              <input
                name="ID_Categoria"
                value={form.ID_Categoria}
                onChange={handleChange}
                placeholder="ID Categoría"
                className="border rounded px-3 py-2"
                required
              />
              <input
                name="Estado"
                value={form.Estado}
                onChange={handleChange}
                placeholder="Estado"
                className="border rounded px-3 py-2"
                required
              />
              <button
                type="submit"
                className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 mt-2 transition"
              >
                {editIndex !== null ? "Actualizar" : "Agregar"}
              </button>
            </form>
          </div>
        </div>
      )}

      <table className="min-w-full text-sm overflow-x-auto block md:table">
        <thead>
          <tr className="bg-slate-100">
            <th className="px-4 py-2 text-left">Serie</th>
            <th className="px-4 py-2 text-left">ID Modelo</th>
            <th className="px-4 py-2 text-left">ID Categoría</th>
            <th className="px-4 py-2 text-left">Estado</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod, idx) => (
            <tr key={idx} className="border-b">
              <td className="px-4 py-2">{prod.Serie}</td>
              <td className="px-4 py-2">{prod.ID_Modelo}</td>
              <td className="px-4 py-2">{prod.ID_Categoria}</td>
              <td className="px-4 py-2">{prod.Estado}</td>
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
      {/* Animación para el modal */}
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
