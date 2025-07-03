"use client";
import React, { useState, useEffect } from "react";

export default function ProductoForm({ initialData = {}, modelos = [], categorias = [], onSubmit, loading }) {
  const [form, setForm] = useState({
    ID_Modelo: initialData.ID_Modelo || "",
    ID_Categoria: initialData.ID_Categoria || "",
    Estado: initialData.Estado || "Nuevo",
    // Puedes agregar más campos según tu modelo
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setForm({
      ID_Modelo: initialData.ID_Modelo || "",
      ID_Categoria: initialData.ID_Categoria || "",
      Estado: initialData.Estado || "Nuevo",
    });
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.ID_Modelo || !form.ID_Categoria || !form.Estado) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");
    onSubmit(form);
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
      <select
        name="ID_Modelo"
        value={form.ID_Modelo}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        required
      >
        <option value="">Selecciona modelo</option>
        {modelos.map((m) => (
          <option key={m.ID_Modelo} value={m.ID_Modelo}>
            {m.Descripcion} ({m.MarcaNombre})
          </option>
        ))}
      </select>
      <select
        name="ID_Categoria"
        value={form.ID_Categoria}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        required
      >
        <option value="">Selecciona categoría</option>
        {categorias.map((c) => (
          <option key={c.ID_Categoria} value={c.ID_Categoria}>
            {c.Nombre}
          </option>
        ))}
      </select>
      <select
        name="Estado"
        value={form.Estado}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        required
      >
        <option value="Nuevo">Nuevo</option>
        <option value="Usado">Usado</option>
        <option value="Dañado">Dañado</option>
      </select>
      {/* Puedes agregar más campos aquí */}
      {error && <div className="col-span-2 text-red-600">{error}</div>}
      <button
        type="submit"
        className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 mt-2 transition"
        disabled={loading}
      >
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
