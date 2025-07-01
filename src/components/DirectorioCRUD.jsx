"use client";
import React, { useState } from "react";

const initialDirectorio = [
  // Ejemplo de registro
  // { ID_Directorio: 1, ID_Sucursal: 1, razonSocial: "Empresa S.A.", ruc: "12345678901" }
];

export default function DirectorioCRUD() {
  const [directorio, setDirectorio] = useState(initialDirectorio);
  const [form, setForm] = useState({
    ID_Directorio: "",
    ID_Sucursal: "",
    razonSocial: "",
    ruc: ""
  });
  const [editIndex, setEditIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...directorio];
      updated[editIndex] = form;
      setDirectorio(updated);
      setEditIndex(null);
    } else {
      setDirectorio([...directorio, form]);
    }
    setForm({ ID_Directorio: "", ID_Sucursal: "", razonSocial: "", ruc: "" });
    setModalOpen(false);
  };

  const handleEdit = (idx) => {
    setForm(directorio[idx]);
    setEditIndex(idx);
    setModalOpen(true);
  };

  const handleDelete = (idx) => {
    setDirectorio(directorio.filter((_, i) => i !== idx));
    if (editIndex === idx) {
      setForm({ ID_Directorio: "", ID_Sucursal: "", razonSocial: "", ruc: "" });
      setEditIndex(null);
    }
  };

  const handleOpenModal = () => {
    setForm({ ID_Directorio: "", ID_Sucursal: "", razonSocial: "", ruc: "" });
    setEditIndex(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setForm({ ID_Directorio: "", ID_Sucursal: "", razonSocial: "", ruc: "" });
    setEditIndex(null);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6 mb-8 overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Directorio</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 transition"
          onClick={handleOpenModal}
        >
          Agregar Registro
        </button>
      </div>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm bg-black/10">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg animate-fadeInScale relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              onClick={handleCloseModal}
              aria-label="Cerrar"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {editIndex !== null ? "Editar Registro" : "Agregar Registro"}
            </h3>
            <form className="flex flex-col gap-4" onSubmit={handleAdd}>
              <input
                name="ID_Directorio"
                value={form.ID_Directorio}
                onChange={handleChange}
                placeholder="ID Directorio"
                className="border rounded px-3 py-2"
                required
              />
              <input
                name="ID_Sucursal"
                value={form.ID_Sucursal}
                onChange={handleChange}
                placeholder="ID Sucursal"
                className="border rounded px-3 py-2"
                required
              />
              <input
                name="razonSocial"
                value={form.razonSocial}
                onChange={handleChange}
                placeholder="Razón Social"
                className="border rounded px-3 py-2"
                required
              />
              <input
                name="ruc"
                value={form.ruc}
                onChange={handleChange}
                placeholder="RUC"
                className="border rounded px-3 py-2"
                required
              />
              <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">
                {editIndex !== null ? "Actualizar" : "Agregar"}
              </button>
            </form>
          </div>
        </div>
      )}
      <table className="min-w-full text-sm overflow-x-auto block md:table">
        <thead>
          <tr className="bg-slate-100">
            <th className="px-4 py-2 text-left">ID Directorio</th>
            <th className="px-4 py-2 text-left">ID Sucursal</th>
            <th className="px-4 py-2 text-left">Razón Social</th>
            <th className="px-4 py-2 text-left">RUC</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {directorio.map((item, idx) => (
            <tr key={idx} className="border-b">
              <td className="px-4 py-2">{item.ID_Directorio}</td>
              <td className="px-4 py-2">{item.ID_Sucursal}</td>
              <td className="px-4 py-2">{item.razonSocial}</td>
              <td className="px-4 py-2">{item.ruc}</td>
              <td className="px-4 py-2">
                <div className="flex flex-col gap-2 md:flex-row md:gap-2 w-full">
                  <button
                    className="bg-yellow-400 text-white px-2 py-1 rounded w-full md:w-auto"
                    onClick={() => handleEdit(idx)}
                    type="button"
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded w-full md:w-auto"
                    onClick={() => handleDelete(idx)}
                    type="button"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
