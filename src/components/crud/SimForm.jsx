"use client";
import React, { useState, useEffect } from "react";

export default function SimForm({ initialData = {}, productos = [], onSubmit, loading }) {
  const [form, setForm] = useState({
    Numero: initialData.Numero || "",
    ID_Producto: initialData.ID_Producto || "",
    Plan: initialData.Plan || "",
    Estado: initialData.Estado || "Activo",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setForm({
      Numero: initialData.Numero || "",
      ID_Producto: initialData.ID_Producto || "",
      Plan: initialData.Plan || "",
      Estado: initialData.Estado || "Activo",
    });
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.Numero || !form.Plan || !form.Estado) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");
    onSubmit(form);
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
      <input
        name="Numero"
        value={form.Numero}
        onChange={handleChange}
        placeholder="Número SIM"
        className="border rounded px-3 py-2"
        required
      />
      <select
        name="ID_Producto"
        value={form.ID_Producto}
        onChange={handleChange}
        className="border rounded px-3 py-2"
      >
        <option value="">Sin producto asociado</option>
        {productos.map((p) => (
          <option key={p.ID_Producto} value={p.ID_Producto}>{p.Nombre || p.ID_Producto}</option>
        ))}
      </select>
      <input
        name="Plan"
        value={form.Plan}
        onChange={handleChange}
        placeholder="Plan"
        className="border rounded px-3 py-2"
        required
      />
      <select
        name="Estado"
        value={form.Estado}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        required
      >
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>
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
