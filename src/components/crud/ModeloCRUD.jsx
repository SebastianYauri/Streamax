
import React, { useState } from "react";

import { useCrudApi } from "../../hooks/useCrudApi";

export default function ModeloCRUD() {
  const { data: modelos, loading, error, create, update, remove } = useCrudApi({
    baseUrl: "/api/modelos",
    adaptIn: (row) => ({
      id: row.id,
      Descripcion: row.descripcion || row.Descripcion,
      ID_Marca: row.marca?.id || row.ID_Marca
    }),
    adaptOut: (form) => ({
      id: form.id,
      descripcion: form.Descripcion,
      id_marca: form.ID_Marca
    }),
  });
  const [marcas, setMarcas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ Descripcion: "", ID_Marca: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [formError, setFormError] = useState("");

  React.useEffect(() => {
    fetch('/api/marcas/listar')
      .then(res => res.json())
      .then(data => setMarcas(Array.isArray(data) ? data : []))
      .catch(() => setMarcas([]));
  }, []);

  const handleAddOrEdit = async (e) => {
    e.preventDefault();
    if (!form.Descripcion || !form.ID_Marca) {
      setFormError("Todos los campos son obligatorios");
      return;
    }
    setFormError("");
    if (editIndex !== null) {
      await update(modelos[editIndex].id, form);
    } else {
      await create(form);
    }
    setForm({ Descripcion: "", ID_Marca: "" });
    setEditIndex(null);
    setModalOpen(false);
  };

  const handleEdit = (idx) => {
    setForm(modelos[idx]);
    setEditIndex(idx);
    setModalOpen(true);
  };

  const handleDelete = async (idx) => {
    await remove(modelos[idx].id);
    setEditIndex(null);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Modelos</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 transition"
          onClick={() => { setModalOpen(true); setEditIndex(null); }}
        >
          Agregar Modelo
        </button>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm bg-black/10">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg animate-fadeInScale relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              onClick={() => setModalOpen(false)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {editIndex !== null ? "Editar Modelo" : "Agregar Modelo"}
            </h3>
            <form className="grid grid-cols-1 gap-4" onSubmit={handleAddOrEdit}>
              <input
                name="Descripcion"
                value={form.Descripcion}
                onChange={e => setForm({ ...form, Descripcion: e.target.value })}
                placeholder="Descripción"
                className="border rounded px-3 py-2"
                required
              />
              <select
                name="ID_Marca"
                value={form.ID_Marca}
                onChange={e => setForm({ ...form, ID_Marca: e.target.value })}
                className="border rounded px-3 py-2"
                required
              >
                <option value="">Selecciona marca</option>
                {marcas.map((m) => (
                  <option key={m.id || m.ID_Marca} value={m.id || m.ID_Marca}>{m.nombre || m.Nombre}</option>
                ))}
              </select>
              {formError && <div className="text-red-600">{formError}</div>}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 mt-2 transition"
                disabled={loading}
              >
                {editIndex !== null ? "Actualizar" : "Agregar"}
              </button>
            </form>
          </div>
        </div>
      )}
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-slate-100">
            <th className="px-4 py-2 text-left">Descripción</th>
            <th className="px-4 py-2 text-left">Marca</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {modelos.map((modelo, idx) => {
            const marca = marcas.find((m) => (m.id || m.ID_Marca) === modelo.ID_Marca);
            return (
              <tr key={idx} className="border-b">
                <td className="px-4 py-2">{modelo.Descripcion}</td>
                <td className="px-4 py-2">{marca ? (marca.nombre || marca.Nombre) : ""}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded transition"
                    onClick={() => handleEdit(idx)}
                    type="button"
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition"
                    onClick={() => handleDelete(idx)}
                    type="button"
                    disabled={loading}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <style jsx>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fadeInScale {
          animation: fadeInScale 0.2s ease;
        }
      `}</style>
    </div>
  );
}
