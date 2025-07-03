"use client";
import React, { useState, useEffect } from "react";

export default function ContactoForm({ initialData = {}, directorios = [], onSubmit, loading }) {
  const [form, setForm] = useState({
    ID_Directorio: initialData.ID_Directorio || "",
    Nombre: initialData.Nombre || "",
    Cargo: initialData.Cargo || "",
    Telefono: initialData.Telefono || "",
    Correo: initialData.Correo || "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setForm({
      ID_Directorio: initialData.ID_Directorio || "",
      Nombre: initialData.Nombre || "",
      Cargo: initialData.Cargo || "",
      Telefono: initialData.Telefono || "",
      Correo: initialData.Correo || "",
    });
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.ID_Directorio || !form.Nombre || !form.Cargo || !form.Telefono || !form.Correo) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");
    onSubmit(form);
  };

  return (
    <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
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
      <input
        name="Nombre"
        value={form.Nombre}
        onChange={handleChange}
        placeholder="Nombre"
        className="border rounded px-3 py-2"
        required
      />
      <input
        name="Cargo"
        value={form.Cargo}
        onChange={handleChange}
        placeholder="Cargo"
        className="border rounded px-3 py-2"
        required
      />
      <input
        name="Telefono"
        value={form.Telefono}
        onChange={handleChange}
        placeholder="Teléfono"
        className="border rounded px-3 py-2"
        required
      />
      <input
        name="Correo"
        value={form.Correo}
        onChange={handleChange}
        placeholder="Correo"
        type="email"
        className="border rounded px-3 py-2"
        required
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
