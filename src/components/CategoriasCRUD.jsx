"use client";
import React, { useState } from "react";

const initialCategorias = [];

export default function CategoriasCRUD() {
  const [categorias, setCategorias] = useState(initialCategorias);
  const [form, setForm] = useState({ nombre: "" });
  const [editIndex, setEditIndex] = useState(null);

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
  };

  const handleEdit = (idx) => {
    setForm(categorias[idx]);
    setEditIndex(idx);
  };

  const handleDelete = (idx) => {
    setCategorias(categorias.filter((_, i) => i !== idx));
    if (editIndex === idx) {
      setForm({ nombre: "" });
      setEditIndex(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6 mb-8 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Registrar Categoría</h2>
      <form className="flex flex-col md:flex-row gap-4 mb-6" onSubmit={handleAdd}>
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
              <td className="px-4 py-2 flex gap-2">
                <button
                  className="bg-yellow-400 text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(idx)}
                  type="button"
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
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
    </div>
  );
}
