import React, { useState, useEffect } from "react";
import { useCrudApi } from "../../hooks/useCrudApi";

export default function SimCRUD() {
  const { data: sims, loading, error, create, update, remove } = useCrudApi({
    baseUrl: "/api/sim",
    adaptIn: (row) => ({
      id: row.id || row.id_sim,
      Numero: row.numero || row.Numero,
      ID_Producto: row.producto?.id_producto || row.ID_Producto || row.id_producto || "",
      Plan: row.plan || row.Plan,
      Estado: row.estado || row.Estado,
    }),
    adaptOut: (form) => ({
      id: form.id,
      numero: form.Numero,
      id_producto: form.ID_Producto,
      plan: form.Plan,
      estado: form.Estado,
    }),
  });

  const [productos, setProductos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ Numero: "", ID_Producto: "", Plan: "", Estado: "Activo" });
  const [editIndex, setEditIndex] = useState(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetch('/api/productos/listar')
      .then(res => res.json())
      .then(data => setProductos(Array.isArray(data) ? data : []))
      .catch(() => setProductos([]));
  }, []);

  const handleAddOrEdit = async (e) => {
    e.preventDefault();
    if (!form.Numero || !form.Plan || !form.Estado) {
      setFormError("Todos los campos son obligatorios");
      return;
    }
    setFormError("");
    if (editIndex !== null) {
      await update(sims[editIndex].id, form);
    } else {
      await create(form);
    }
    setForm({ Numero: "", ID_Producto: "", Plan: "", Estado: "Activo" });
    setEditIndex(null);
    setModalOpen(false);
  };

  const handleEdit = (idx) => {
    setForm(sims[idx]);
    setEditIndex(idx);
    setModalOpen(true);
  };

  const handleDelete = async (idx) => {
    await remove(sims[idx].id);
    setEditIndex(null);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">SIM Cards</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 transition"
          onClick={() => { setModalOpen(true); setEditIndex(null); }}
        >
          Agregar SIM
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
              {editIndex !== null ? "Editar SIM" : "Agregar SIM"}
            </h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleAddOrEdit}>
              <input
                name="Numero"
                value={form.Numero}
                onChange={e => setForm({ ...form, Numero: e.target.value })}
                placeholder="Número SIM"
                className="border rounded px-3 py-2"
                required
              />
              <select
                name="ID_Producto"
                value={form.ID_Producto}
                onChange={e => setForm({ ...form, ID_Producto: e.target.value })}
                className="border rounded px-3 py-2"
              >
                <option value="">Sin producto asociado</option>
                {productos.map((p) => (
                  <option key={p.ID_Producto || p.id} value={p.ID_Producto || p.id}>{p.Nombre || p.ID_Producto || p.id}</option>
                ))}
              </select>
              <input
                name="Plan"
                value={form.Plan}
                onChange={e => setForm({ ...form, Plan: e.target.value })}
                placeholder="Plan"
                className="border rounded px-3 py-2"
                required
              />
              <select
                name="Estado"
                value={form.Estado}
                onChange={e => setForm({ ...form, Estado: e.target.value })}
                className="border rounded px-3 py-2"
                required
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
              {formError && <div className="col-span-2 text-red-600">{formError}</div>}
              <button
                type="submit"
                className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 mt-2 transition"
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
            <th className="px-4 py-2 text-left">Número</th>
            <th className="px-4 py-2 text-left">Producto</th>
            <th className="px-4 py-2 text-left">Plan</th>
            <th className="px-4 py-2 text-left">Estado</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sims.map((sim, idx) => (
            <tr key={idx} className="border-b">
              <td className="px-4 py-2">{sim.Numero}</td>
              <td className="px-4 py-2">{productos.find(p => (p.ID_Producto || p.id) === sim.ID_Producto)?.Nombre || sim.ID_Producto}</td>
              <td className="px-4 py-2">{sim.Plan}</td>
              <td className="px-4 py-2">{sim.Estado}</td>
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
