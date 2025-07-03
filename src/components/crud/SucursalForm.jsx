"use client";
import React, { useState, useEffect } from "react";

export default function SucursalForm({ initialData = {}, directorios = [], onSubmit, loading }) {
  const [form, setForm] = useState({
    Descripcion: initialData.Descripcion || "",
    Direccion: initialData.Direccion || "",
    ID_Directorio: initialData.ID_Directorio || "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setForm({
      Descripcion: initialData.Descripcion || "",
      Direccion: initialData.Direccion || "",
      ID_Directorio: initialData.ID_Directorio || "",
    });
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.Descripcion || !form.Direccion || !form.ID_Directorio) {
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
      <input
        name="Direccion"
        value={form.Direccion}
        onChange={handleChange}
        placeholder="Dirección"
        className="border rounded px-3 py-2"
        required
      />
      <select
        name="ID_Directorio"
        value={form.ID_Directorio}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        required
      >
        <option value="">Selecciona directorio</option>
        {directorios.map((d) => (
          <option key={d.ID_Directorio} value={d.ID_Directorio}>{d.RazonSocial}</option>
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
