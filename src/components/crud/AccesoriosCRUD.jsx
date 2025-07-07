import React, { useState, useEffect } from "react";
import { useCrudApi } from "../../hooks/useCrudApi";

export default function AccesoriosCRUD() {
  const { data: accesorios, loading, error, create, update, remove } = useCrudApi({
    baseUrl: "/api/accesorios",
    adaptIn: (row) => ({
      id: row.id || row.id_accesorio || row.ID_Accesorio,
      ID_Categoria: row.categoria?.id_categoria || row.ID_Categoria || row.id_categoria,
      CategoriaNombre: row.categoria?.nombre || row.CategoriaNombre || row.NombreCategoria,
      Nombre: row.nombre || row.Nombre,
      Descripcion: row.descripcion || row.Descripcion,
      Cantidad: row.cantidad || row.Cantidad,
    }),
    adaptOut: (form) => ({
      id: form.id,
      id_categoria: form.ID_Categoria,
      nombre: form.Nombre,
      descripcion: form.Descripcion,
      cantidad: form.Cantidad,
    }),
  });

  const [categorias, setCategorias] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ ID_Categoria: "", Nombre: "", Descripcion: "", Cantidad: 0 });
  const [editIndex, setEditIndex] = useState(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetch('/api/categorias/listar')
      .then(res => res.json())
      .then(data => setCategorias(Array.isArray(data) ? data : []))
      .catch(() => setCategorias([]));
  }, []);

  const handleAddOrEdit = async (e) => {
    e.preventDefault();
    if (!form.ID_Categoria || !form.Nombre) {
      setFormError("Categoría y nombre son obligatorios");
      return;
    }
    setFormError("");
    if (editIndex !== null) {
      await update(accesorios[editIndex].id, form);
    } else {
      await create(form);
    }
    setForm({ ID_Categoria: "", Nombre: "", Descripcion: "", Cantidad: 0 });
    setEditIndex(null);
    setModalOpen(false);
  };

  const handleEdit = (idx) => {
    setForm(accesorios[idx]);
    setEditIndex(idx);
    setModalOpen(true);
  };

  const handleDelete = async (idx) => {
    await remove(accesorios[idx].id);
    setEditIndex(null);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Accesorios</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 transition"
          onClick={() => { setModalOpen(true); setEditIndex(null); }}
        >
          Agregar Accesorio
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
              {editIndex !== null ? "Editar Accesorio" : "Agregar Accesorio"}
            </h3>
            <form className="grid grid-cols-1 gap-4" onSubmit={handleAddOrEdit}>
              <select
                name="ID_Categoria"
                value={form.ID_Categoria}
                onChange={e => setForm({ ...form, ID_Categoria: e.target.value })}
                className="border rounded px-3 py-2"
                required
              >
                <option value="">Selecciona categoría</option>
                {categorias.map((c) => (
                  <option key={c.id_categoria || c.ID_Categoria || c.id} value={c.id_categoria || c.ID_Categoria || c.id}>{c.nombre || c.Nombre}</option>
                ))}
              </select>
              <input
                name="Nombre"
                value={form.Nombre}
                onChange={e => setForm({ ...form, Nombre: e.target.value })}
                placeholder="Nombre"
                className="border rounded px-3 py-2"
                required
              />
              <input
                name="Descripcion"
                value={form.Descripcion}
                onChange={e => setForm({ ...form, Descripcion: e.target.value })}
                placeholder="Descripción"
                className="border rounded px-3 py-2"
              />
              <input
                name="Cantidad"
                value={form.Cantidad}
                onChange={e => setForm({ ...form, Cantidad: e.target.value })}
                type="number"
                min={0}
                placeholder="Cantidad"
                className="border rounded px-3 py-2"
              />
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
            <th className="px-4 py-2 text-left">Categoría</th>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Descripción</th>
            <th className="px-4 py-2 text-left">Cantidad</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {accesorios.map((a, idx) => (
            <tr key={idx} className="border-b">
              <td className="px-4 py-2">{a.CategoriaNombre || categorias.find(c => (c.id_categoria || c.ID_Categoria || c.id) === a.ID_Categoria)?.nombre || a.ID_Categoria}</td>
              <td className="px-4 py-2">{a.Nombre}</td>
              <td className="px-4 py-2">{a.Descripcion}</td>
              <td className="px-4 py-2">{a.Cantidad}</td>
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
          ))}
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
