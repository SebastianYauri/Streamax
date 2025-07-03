"use client";
import React, { useState, useEffect } from "react";

export default function AccesorioForm({ initialData = {}, categorias = [], onSubmit, loading }) {
  const [form, setForm] = useState({
    ID_Categoria: initialData.ID_Categoria || "",
    Nombre: initialData.Nombre || "",
    Descripcion: initialData.Descripcion || "",
    Cantidad: initialData.Cantidad || 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setForm({
      ID_Categoria: initialData.ID_Categoria || "",
      Nombre: initialData.Nombre || "",
      Descripcion: initialData.Descripcion || "",
      Cantidad: initialData.Cantidad || 0,
    });
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.ID_Categoria || !form.Nombre) {
      setError("Categoría y nombre son obligatorios");
      return;
    }
    setError("");
    onSubmit(form);
  };

  return (
    <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
      <select
        name="ID_Categoria"
        value={form.ID_Categoria}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        required
      >
        <option value="">Selecciona categoría</option>
        {categorias.map((c) => (
          <option key={c.ID_Categoria} value={c.ID_Categoria}>{c.Nombre}</option>
        ))}
      </select>
      <input
        name="Nombre"
        value={form.Nombre}
        onChange={handleChange}
        placeholder="Nombre"
        className="border rounded px-3 py-2"
        required
      />
      <input
        name="Descripcion"
        value={form.Descripcion}
        onChange={handleChange}
        placeholder="Descripción"
        className="border rounded px-3 py-2"
      />
      <input
        name="Cantidad"
        value={form.Cantidad}
        onChange={handleChange}
        type="number"
        min={0}
        placeholder="Cantidad"
        className="border rounded px-3 py-2"
      />
      {error && <div className="text-red-600">{error}</div>}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 mt-2 transition"
        disabled={loading}
      >
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
