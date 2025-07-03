"use client";
import React, { useState, useEffect } from "react";

export default function KardexAccesorioForm({ initialData = {}, accesorios = [], directorios = [], usuarios = [], onSubmit, loading }) {
  const [form, setForm] = useState({
    ID_Accesorio: initialData.ID_Accesorio || "",
    Cantidad: initialData.Cantidad || 0,
    Fecha: initialData.Fecha || new Date().toISOString().slice(0, 10),
    ID_Usuario: initialData.ID_Usuario || "",
    ID_Directorio: initialData.ID_Directorio || "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setForm({
      ID_Accesorio: initialData.ID_Accesorio || "",
      Cantidad: initialData.Cantidad || 0,
      Fecha: initialData.Fecha || new Date().toISOString().slice(0, 10),
      ID_Usuario: initialData.ID_Usuario || "",
      ID_Directorio: initialData.ID_Directorio || "",
    });
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.ID_Accesorio || !form.Cantidad || !form.Fecha || !form.ID_Usuario || !form.ID_Directorio) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");
    onSubmit(form);
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
      <select
        name="ID_Accesorio"
        value={form.ID_Accesorio}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        required
      >
        <option value="">Selecciona accesorio</option>
        {accesorios.map((a) => (
          <option key={a.ID_Accesorio} value={a.ID_Accesorio}>{a.Nombre}</option>
        ))}
      </select>
      <input
        name="Cantidad"
        value={form.Cantidad}
        onChange={handleChange}
        type="number"
        min={1}
        placeholder="Cantidad"
        className="border rounded px-3 py-2"
        required
      />
      <input
        name="Fecha"
        value={form.Fecha}
        onChange={handleChange}
        type="date"
        className="border rounded px-3 py-2"
        required
      />
      <select
        name="ID_Usuario"
        value={form.ID_Usuario}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        required
      >
        <option value="">Selecciona usuario</option>
        {usuarios.map((u) => (
          <option key={u.ID_Usuario} value={u.ID_Usuario}>{u.Nombre}</option>
        ))}
      </select>
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
