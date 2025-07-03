"use client";
import React, { useState, useEffect } from "react";

export default function ModeloForm({ initialData = {}, marcas = [], onSubmit, loading }) {
  const [form, setForm] = useState({
    Descripcion: initialData.Descripcion || "",
    ID_Marca: initialData.ID_Marca || "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setForm({
      Descripcion: initialData.Descripcion || "",
      ID_Marca: initialData.ID_Marca || "",
    });
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.Descripcion || !form.ID_Marca) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");
    onSubmit(form);
  };

  return (
    <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
      <input
        name="Descripcion"
        value={form.Descripcion}
        onChange={handleChange}
        placeholder="Descripción"
        className="border rounded px-3 py-2"
        required
      />
      <select
        name="ID_Marca"
        value={form.ID_Marca}
        onChange={handleChange}
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
        disabled={loading}
      >
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
