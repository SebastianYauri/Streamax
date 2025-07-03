"use client";
import React, { useState, useEffect } from "react";

export default function MarcaForm({ initialData = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    Nombre: initialData.Nombre || "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setForm({ Nombre: initialData.Nombre || "" });
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.Nombre) {
      setError("El nombre es obligatorio");
      return;
    }
    setError("");
    onSubmit(form);
  };

  return (
    <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
      <input
        name="Nombre"
        value={form.Nombre}
        onChange={handleChange}
        placeholder="Nombre"
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
