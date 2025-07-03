"use client";
import React, { useState, useEffect } from "react";

export default function KardexForm({ initialData = {}, productos = [], directorios = [], usuarios = [], onSubmit, loading }) {
  const [form, setForm] = useState({
    Tipo: initialData.Tipo || "Entrada",
    ID_Producto: initialData.ID_Producto || "",
    ID_Directorio: initialData.ID_Directorio || "",
    Fecha: initialData.Fecha || new Date().toISOString().slice(0, 10),
    ID_Usuario: initialData.ID_Usuario || "",
    Vehiculo: initialData.Vehiculo || "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setForm({
      Tipo: initialData.Tipo || "Entrada",
      ID_Producto: initialData.ID_Producto || "",
      ID_Directorio: initialData.ID_Directorio || "",
      Fecha: initialData.Fecha || new Date().toISOString().slice(0, 10),
      ID_Usuario: initialData.ID_Usuario || "",
      Vehiculo: initialData.Vehiculo || "",
    });
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.Tipo || !form.ID_Producto || !form.ID_Directorio || !form.Fecha || !form.ID_Usuario) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");
    onSubmit(form);
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
      <select
        name="Tipo"
        value={form.Tipo}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        required
      >
        <option value="Entrada">Entrada</option>
        <option value="Salida">Salida</option>
        <option value="Transferencia">Transferencia</option>
      </select>
      <select
        name="ID_Producto"
        value={form.ID_Producto}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        required
      >
        <option value="">Selecciona producto</option>
        {productos.map((p) => (
          <option key={p.ID_Producto} value={p.ID_Producto}>{p.Nombre || p.ID_Producto}</option>
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
      <input
        name="Vehiculo"
        value={form.Vehiculo}
        onChange={handleChange}
        placeholder="Vehículo (opcional)"
        className="border rounded px-3 py-2"
      />
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
