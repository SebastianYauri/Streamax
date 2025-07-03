"use client";
import React, { useState, useEffect } from "react";

import BarcodeScanner from "../BarcodeScanner";

export default function ProductoForm({ initialData = {}, modelos = [], marcas = [], categorias = [], onSubmit, loading }) {
  // Para UX óptima: primero selecciona marca, luego modelo filtrado por marca, luego categoría
  const [form, setForm] = useState({
    Serie: initialData.Serie || "",
    ID_Marca: initialData.ID_Marca || "",
    ID_Modelo: initialData.ID_Modelo || "",
    ID_Categoria: initialData.ID_Categoria || "",
    Estado: initialData.Estado || "Nuevo",
  });
  const [error, setError] = useState("");
  // No se necesita selectedMarca, ya está en form.ID_Marca

  useEffect(() => {
    setForm({
      Serie: initialData.Serie || "",
      ID_Marca: initialData.ID_Marca || "",
      ID_Modelo: initialData.ID_Modelo || "",
      ID_Categoria: initialData.ID_Categoria || "",
      Estado: initialData.Estado || "Nuevo",
    });
  }, [initialData]);

  // Escanear código de barras y setear Serie
  const handleScanSerie = (code) => {
    setForm((prev) => ({ ...prev, Serie: code }));
  };

  // Cuando cambia el modelo, autocompleta la marca
  useEffect(() => {
    if (form.ID_Modelo) {
      const modelo = modelos.find((m) => m.ID_Modelo === parseInt(form.ID_Modelo));
      if (modelo) {
        setForm((prev) => ({ ...prev, ID_Marca: modelo.ID_Marca }));
      }
    }
  }, [form.ID_Modelo, modelos]);

  // Si cambia la marca, limpia el modelo
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "ID_Marca") {
      setForm((prev) => ({ ...prev, ID_Marca: value, ID_Modelo: "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.ID_Marca || !form.ID_Modelo || !form.ID_Categoria || !form.Estado) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");
    onSubmit(form);
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
      {/* Escáner de código de barras */}
      <div className="md:col-span-2 mb-2">
        <BarcodeScanner onDetected={handleScanSerie} />
      </div>
      {/* Serie */}
      <input
        name="Serie"
        value={form.Serie}
        onChange={handleChange}
        placeholder="Serie (código de barras)"
        className="border rounded px-3 py-2"
        required
      />
      {/* Marca */}
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
      {/* Modelo (filtrado por marca) */}
      <select
        name="ID_Modelo"
        value={form.ID_Modelo}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        required
        disabled={!form.ID_Marca}
      >
        <option value="">Selecciona modelo</option>
        {modelos.filter((m) => String(m.ID_Marca) === String(form.ID_Marca)).map((m) => (
          <option key={m.ID_Modelo} value={m.ID_Modelo}>{m.Descripcion}</option>
        ))}
      </select>
      {/* Categoría */}
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
      {/* Estado */}
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
