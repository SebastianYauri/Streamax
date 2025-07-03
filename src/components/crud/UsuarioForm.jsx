"use client";
import React, { useState, useEffect } from "react";

export default function UsuarioForm({ initialData = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    Nombre: initialData.Nombre || "",
    Email: initialData.Email || "",
    Password: "",
    Rol: initialData.Rol || "operador",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setForm({
      Nombre: initialData.Nombre || "",
      Email: initialData.Email || "",
      Password: "",
      Rol: initialData.Rol || "operador",
    });
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.Nombre || !form.Email || (!initialData.ID_Usuario && !form.Password)) {
      setError("Todos los campos son obligatorios");
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
      <input
        name="Email"
        value={form.Email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
        className="border rounded px-3 py-2"
        required
      />
      <input
        name="Password"
        value={form.Password}
        onChange={handleChange}
        placeholder="Contraseña"
        type="password"
        className="border rounded px-3 py-2"
        required={!initialData.ID_Usuario}
      />
      <select
        name="Rol"
        value={form.Rol}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        required
      >
        <option value="admin">Administrador</option>
        <option value="operador">Operador</option>
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
