"use client";

import React, { useState, useEffect } from "react";
import BarcodeScanner from "../ui/BarcodeScanner";
import MarcaForm from "./MarcaForm";
import ModeloForm from "./ModeloForm";
import CategoriaForm from "./CategoriaForm";

export default function ProductoForm({ initialData = {}, modelos = [], marcas = [], categorias = [], onSubmit, loading, onAddMarca, onAddModelo, onAddCategoria }) {
  // Modales para crear marca/modelo/categoria
  const [modal, setModal] = useState(null); // 'marca' | 'modelo' | 'categoria' | null

  // Handlers para agregar y refrescar selects
  const handleAddMarca = async (data) => {
    if (onAddMarca) await onAddMarca(data);
    setModal(null);
  };
  const handleAddModelo = async (data) => {
    if (onAddModelo) await onAddModelo(data);
    setModal(null);
  };
  const handleAddCategoria = async (data) => {
    if (onAddCategoria) await onAddCategoria(data);
    setModal(null);
  };
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
      <div className="flex gap-2 items-center">
        <select
          name="ID_Marca"
          value={form.ID_Marca}
          onChange={handleChange}
          className="border rounded px-3 py-2 flex-1"
          required
        >
          <option value="">Selecciona marca</option>
          {marcas.map((m) => (
            <option key={m.ID_Marca || m.id} value={m.ID_Marca || m.id}>{m.Nombre || m.nombre}</option>
          ))}
        </select>
        <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white rounded px-2 py-1 text-lg" title="Agregar marca" onClick={() => setModal('marca')}>+</button>
      </div>
      {/* Modelo (filtrado por marca) */}
      <div className="flex gap-2 items-center">
        <select
          name="ID_Modelo"
          value={form.ID_Modelo}
          onChange={handleChange}
          className="border rounded px-3 py-2 flex-1"
          required
          disabled={!form.ID_Marca}
        >
          <option value="">Selecciona modelo</option>
          {modelos.filter((m) => String(m.ID_Marca || m.id_marca || m.idMarca || m.IDMARCA || m.id) === String(form.ID_Marca)).map((m) => (
            <option key={m.ID_Modelo || m.id} value={m.ID_Modelo || m.id}>{m.Descripcion || m.descripcion || m.nombre}</option>
          ))}
        </select>
        <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white rounded px-2 py-1 text-lg" title="Agregar modelo" onClick={() => setModal('modelo')}>+</button>
      </div>
      {/* Categoría */}
      <div className="flex gap-2 items-center">
        <select
          name="ID_Categoria"
          value={form.ID_Categoria}
          onChange={handleChange}
          className="border rounded px-3 py-2 flex-1"
          required
        >
          <option value="">Selecciona categoría</option>
          {categorias.map((c) => (
            <option key={c.ID_Categoria || c.id || c.id_categoria} value={c.ID_Categoria || c.id || c.id_categoria}>{c.Nombre || c.nombre}</option>
          ))}
        </select>
        <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white rounded px-2 py-1 text-lg" title="Agregar categoría" onClick={() => setModal('categoria')}>+</button>
      </div>
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
    {/* Modales para agregar marca/modelo/categoria */}
    {modal === 'marca' && (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative animate-fadeInScale">
          <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold" onClick={() => setModal(null)} aria-label="Cerrar">×</button>
          <h3 className="text-lg font-semibold mb-2">Agregar Marca</h3>
          <MarcaForm onSubmit={handleAddMarca} loading={loading} />
        </div>
      </div>
    )}
    {modal === 'modelo' && (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative animate-fadeInScale">
          <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold" onClick={() => setModal(null)} aria-label="Cerrar">×</button>
          <h3 className="text-lg font-semibold mb-2">Agregar Modelo</h3>
          <ModeloForm onSubmit={handleAddModelo} marcas={marcas} loading={loading} />
        </div>
      </div>
    )}
    {modal === 'categoria' && (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative animate-fadeInScale">
          <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold" onClick={() => setModal(null)} aria-label="Cerrar">×</button>
          <h3 className="text-lg font-semibold mb-2">Agregar Categoría</h3>
          <CategoriaForm onSubmit={handleAddCategoria} loading={loading} />
        </div>
      </div>
    )}
  </form>
  );
}
