"use client";
import React, { useState } from "react";
import { useKardex } from "../../hooks/useKardex";
import { useProductos } from "../../hooks/useProductos";

// TODO: Reemplazar hooks y lógica local por llamadas a la API para movimientos y productos
const tiposMovimiento = ["Ingreso", "Salida"];

export default function MovimientosCRUD() {
  const { kardex, addMovimiento, updateMovimiento, deleteMovimiento } = useKardex();
  const { productos } = useProductos();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    Tipo: "Ingreso",
    ID_Producto: productos[0]?.Serie || "",
    ID_Directorio: ""
  });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (editId !== null) {
      updateMovimiento(editId, form);
      setEditId(null);
    } else {
      addMovimiento({
        ID_Kardex: Date.now(),
        ...form
      });
    }
    setForm({ Tipo: "Ingreso", ID_Producto: productos[0]?.Serie || "", ID_Directorio: "" });
    setModalOpen(false);
  };

  const handleEdit = (mov) => {
    setForm({ Tipo: mov.Tipo, ID_Producto: mov.ID_Producto, ID_Directorio: mov.ID_Directorio });
    setEditId(mov.ID_Kardex);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteMovimiento(id);
  };

  const handleOpenModal = () => {
    setForm({ Tipo: "Ingreso", ID_Producto: productos[0]?.Serie || "", ID_Directorio: "" });
    setEditId(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setForm({ Tipo: "Ingreso", ID_Producto: productos[0]?.Serie || "", ID_Directorio: "" });
    setEditId(null);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6 mb-8 overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Movimientos (Kardex)</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 transition"
          onClick={handleOpenModal}
        >
          Agregar Movimiento
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
              {editId !== null ? "Editar Movimiento" : "Agregar Movimiento"}
            </h3>
            <form className="flex flex-col gap-4" onSubmit={handleAdd}>
              <select
                name="Tipo"
                value={form.Tipo}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              >
                {tiposMovimiento.map((tipo) => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
              <select
                name="ID_Producto"
                value={form.ID_Producto}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              >
                {productos.map((prod) => (
                  <option key={prod.Serie} value={prod.Serie}>{prod.Serie}</option>
                ))}
              </select>
              <input
                name="ID_Directorio"
                value={form.ID_Directorio}
                onChange={handleChange}
                placeholder="ID Directorio"
                className="border rounded px-3 py-2"
                required
              />
              <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">
                {editId !== null ? "Actualizar" : "Agregar"}
              </button>
            </form>
          </div>
        </div>
      )}
      <table className="min-w-full text-sm overflow-x-auto block md:table">
        <thead>
          <tr className="bg-slate-100">
            <th className="px-4 py-2 text-left">ID Kardex</th>
            <th className="px-4 py-2 text-left">Tipo</th>
            <th className="px-4 py-2 text-left">Producto</th>
            <th className="px-4 py-2 text-left">ID Directorio</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {kardex.map((mov, idx) => (
            <tr key={idx} className="border-b">
              <td className="px-4 py-2">{mov.ID_Kardex}</td>
              <td className="px-4 py-2">{mov.Tipo}</td>
              <td className="px-4 py-2">{mov.ID_Producto}</td>
              <td className="px-4 py-2">{mov.ID_Directorio}</td>
              <td className="px-4 py-2">
                <div className="flex flex-col gap-2 md:flex-row md:gap-2 w-full">
                  <button
                    className="bg-yellow-400 text-white px-2 py-1 rounded w-full md:w-auto"
                    onClick={() => handleEdit(mov)}
                    type="button"
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded w-full md:w-auto"
                    onClick={() => handleDelete(mov.ID_Kardex)}
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
