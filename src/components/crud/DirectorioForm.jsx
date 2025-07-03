"use client";
import React, { useState, useEffect } from "react";

export default function DirectorioForm({ initialData = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    RazonSocial: initialData.RazonSocial || "",
    RUC: initialData.RUC || "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setForm({
      RazonSocial: initialData.RazonSocial || "",
      RUC: initialData.RUC || "",
    });
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.RazonSocial || !form.RUC) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");
    onSubmit(form);
  };

  return (
    <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
      <input
        name="RazonSocial"
        value={form.RazonSocial}
        onChange={handleChange}
        placeholder="Razón Social"
        className="border rounded px-3 py-2"
        required
      />
      <input
        name="RUC"
        value={form.RUC}
        onChange={handleChange}
        placeholder="RUC"
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
