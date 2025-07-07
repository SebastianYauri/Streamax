"use client";
import React, { useState } from "react";
import BarcodeScanner from "../ui/BarcodeScanner";

import { useEffect } from "react";

// Hook para obtener productos desde la API real
const useProductosAPI = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/productos/listar');
      const text = await res.text();
      if (!res.ok) throw new Error(text);
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error('Respuesta no es JSON');
      }
      // Adaptar los datos a la estructura esperada por la tabla
      const adaptados = Array.isArray(data)
        ? data.map((prod) => ({
            Serie: prod.id_producto || '',
            ID_Modelo: prod.modelo?.descripcion || prod.modelo?.id || '',
            Marca: prod.modelo && prod.modelo.marca ? (prod.modelo.marca.nombre || prod.modelo.marca.nombre || prod.modelo.marca.id || '') : '',
            ID_Categoria: prod.categoria?.nombre || prod.categoria?.descripcion || prod.categoria?.id_categoria || '',
            Estado: prod.estado || ''
          }))
        : [];
      setProductos(adaptados);
    } catch (err) {
      setError(err.message);
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return { productos, loading, error, refetch: fetchProductos };
};

// Permite pasar un callback para setear la serie desde fuera (ej: escáner)
export default function InventarioCRUD({ onScanSerie }) {
  // Lista de marcas para el select
  const [marcas, setMarcas] = useState([]);

  // Cargar modelos, categorías y marcas al montar
  useEffect(() => {
    fetch('/api/modelos/listar')
      .then(res => res.json())
      .then(data => setModelos(Array.isArray(data) ? data : []))
      .catch(() => setModelos([]));
    fetch('/api/categorias/listar')
      .then(res => res.json())
      .then(data => setCategorias(Array.isArray(data) ? data : []))
      .catch(() => setCategorias([]));
    fetch('/api/marcas/listar')
      .then(res => res.json())
      .then(data => setMarcas(Array.isArray(data) ? data : []))
      .catch(() => setMarcas([]));
  }, []);
  // Listas para selects de modelos y categorías
  const [modelos, setModelos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  // Cargar modelos y categorías al montar
  useEffect(() => {
    // Cambia las rutas según tu backend
    fetch('/api/modelos/listar')
      .then(res => res.json())
      .then(data => setModelos(Array.isArray(data) ? data : []))
      .catch(() => setModelos([]));
    fetch('/api/categorias/listar')
      .then(res => res.json())
      .then(data => setCategorias(Array.isArray(data) ? data : []))
      .catch(() => setCategorias([]));
  }, []);
  // Usa la API real para obtener productos
  const { productos, loading, error, refetch } = useProductosAPI();
  const [form, setForm] = useState({
    Serie: "",
    ID_Modelo: "",
    ID_Categoria: "",
    Estado: ""
  });
  const [editIndex, setEditIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Si cambia el modelo, actualizar también la marca automáticamente
    if (name === 'ID_Modelo') {
      const modeloSel = modelos.find(m => String(m.id || m.ID_Modelo) === String(value));
      let idMarca = '';
      if (modeloSel && (modeloSel.marca || modeloSel.ID_Marca || modeloSel.id_marca)) {
        // Buscar la marca por id si existe
        const marcaId = modeloSel.marca?.id || modeloSel.ID_Marca || modeloSel.id_marca;
        idMarca = marcas.find(mk => String(mk.id || mk.ID_Marca) === String(marcaId))?.id || marcaId || '';
      }
      setForm(f => ({ ...f, [name]: value, ID_Marca: idMarca }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Guardar producto vía API real
  const handleAdd = async (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // --- EDICIÓN REAL ---
      try {
        const productoEdit = productos[editIndex];
        const id = productoEdit.Serie; // O el campo correcto de ID
        const payload = {
          id_producto: form.Serie,
          estado: form.Estado,
          modelo: { id: Number(form.ID_Modelo) },
          categoria: { id_categoria: Number(form.ID_Categoria) }
          // Agrega otros campos si tu backend los espera
        };
        console.log('Payload enviado a /productos/editar/' + id, payload);
        const res = await fetch(`/api/productos/editar/${id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }
        );
        const text = await res.text();
        if (!res.ok) {
          let errorInfo = `\nStatus: ${res.status} ${res.statusText}`;
          errorInfo += `\nHeaders: ` + JSON.stringify(Object.fromEntries(res.headers.entries()));
          try {
            const json = JSON.parse(text);
            errorInfo += `\nBody (JSON): ` + JSON.stringify(json);
          } catch {
            errorInfo += `\nBody (text): ` + text;
          }
          console.error('Error al editar producto:', errorInfo);
          alert('Error al editar producto (ver consola para detalles): ' + errorInfo);
          return;
        }
        if (typeof refetch === 'function') refetch();
        setForm({ Serie: "", ID_Modelo: "", ID_Categoria: "", Estado: "" });
        setModalOpen(false);
        setEditIndex(null);
      } catch (err) {
        alert('Error inesperado al editar producto: ' + err.message);
        console.error('Error inesperado al editar producto:', err);
      }
    } else {
      // ...alta (POST) como ya tienes...
      try {
        const payload = {
          id_producto: form.Serie,
          estado: form.Estado,
          modelo: { id: Number(form.ID_Modelo) },
          categoria: { id_categoria: Number(form.ID_Categoria) }
        };
        console.log('Payload enviado a /api/productos/guardar:', payload);
        const res = await fetch('/api/productos/guardar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const text = await res.text();
        if (!res.ok) {
          let errorInfo = `\nStatus: ${res.status} ${res.statusText}`;
          errorInfo += `\nHeaders: ` + JSON.stringify(Object.fromEntries(res.headers.entries()));
          try {
            const json = JSON.parse(text);
            errorInfo += `\nBody (JSON): ` + JSON.stringify(json);
          } catch {
            errorInfo += `\nBody (text): ` + text;
          }
          console.error('Error al guardar producto:', errorInfo);
          alert('Error al guardar producto (ver consola para detalles): ' + errorInfo);
          return;
        }
        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          throw new Error('Respuesta no es JSON');
        }
        if (typeof refetch === 'function') refetch();
        setForm({ Serie: "", ID_Modelo: "", ID_Categoria: "", Estado: "" });
        setModalOpen(false);
      } catch (err) {
        console.error('Error inesperado al guardar producto:', err);
        alert('Error inesperado al guardar producto: ' + err.message);
      }
    }
  };

  const handleEdit = (idx) => {
    // Mapear los datos del producto a los valores de los selects
    const prod = productos[idx];
    setForm({
      Serie: prod.Serie || '',
      ID_Modelo: modelos.find(m => (m.descripcion === prod.ID_Modelo || m.id === prod.ID_Modelo || m.ID_Modelo === prod.ID_Modelo))?.id || prod.ID_Modelo || '',
      ID_Marca: marcas.find(mk => (mk.nombre === prod.Marca || mk.id === prod.Marca || mk.ID_Marca === prod.Marca))?.id || prod.Marca || '',
      ID_Categoria: categorias.find(c => (c.nombre === prod.ID_Categoria || c.id_categoria === prod.ID_Categoria || c.ID_Categoria === prod.ID_Categoria))?.id_categoria || prod.ID_Categoria || '',
      Estado: prod.Estado || ''
    });
    setEditIndex(idx);
    setModalOpen(true);
  };

  // Eliminar producto vía API real (ajusta el endpoint según tu backend)
  const handleDelete = async (idx) => {
    const producto = productos[idx];
    if (!producto || !producto.Serie) return;
    if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;
    try {
      // Suponiendo que tu backend acepta DELETE por Serie
      const res = await fetch(`/api/productos/eliminar?serie=${encodeURIComponent(producto.Serie)}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error(await res.text());
      if (typeof refetch === 'function') refetch();
      if (editIndex === idx) {
        setForm({ Serie: "", ID_Modelo: "", ID_Categoria: "", Estado: "" });
        setEditIndex(null);
      }
    } catch (err) {
      alert('Error al eliminar producto: ' + err.message);
    }
  };

  const handleOpenModal = () => {
    setForm({ Serie: "", ID_Modelo: "", ID_Categoria: "", Estado: "" });
    setEditIndex(null);
    setModalOpen(true);
  };

  // Permite setear la serie desde el escáner
  const handleScanSerie = (code) => {
    setForm((prev) => ({ ...prev, Serie: code }));
    if (onScanSerie) onScanSerie(code);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setForm({ Serie: "", ID_Modelo: "", ID_Categoria: "", Estado: "" });
    setEditIndex(null);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6 mb-8 overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Inventario de Productos</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 transition"
          onClick={handleOpenModal}
        >
          Agregar Producto
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
              {editIndex !== null ? "Editar Producto" : "Agregar Producto"}
            </h3>
            {/* Escáner integrado solo al agregar producto */}
            {editIndex === null && (
              <div className="mb-4">
                <BarcodeScanner onDetected={handleScanSerie} />
              </div>
            )}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleAdd}>
              <input
                name="Serie"
                value={form.Serie}
                onChange={handleChange}
                placeholder="Serie"
                className="border rounded px-3 py-2"
                required
              />
              <select
                name="ID_Modelo"
                value={form.ID_Modelo}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              >
                <option value="">Selecciona un modelo</option>
                {modelos.map((m) => (
                  <option key={m.id || m.ID_Modelo} value={m.id || m.ID_Modelo}>
                    {m.descripcion || m.nombre || m.ID_Modelo}
                  </option>
                ))}
              </select>
              <select
                name="ID_Marca"
                value={form.ID_Marca || ''}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              >
                <option value="">Selecciona una marca</option>
                {marcas.map((marca) => (
                  <option key={marca.id || marca.ID_Marca} value={marca.id || marca.ID_Marca}>
                    {marca.nombre || marca.ID_Marca}
                  </option>
                ))}
              </select>
              <select
                name="ID_Categoria"
                value={form.ID_Categoria}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((c) => (
                  <option key={c.id_categoria || c.ID_Categoria} value={c.id_categoria || c.ID_Categoria}>
                    {c.nombre || c.descripcion || c.ID_Categoria}
                  </option>
                ))}
              </select>
              <select
                name="Estado"
                value={form.Estado}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              >
                <option value="">Selecciona un estado</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Asignado">Asignado</option>
                <option value="De baja">De baja</option>
              </select>
              <button
                type="submit"
                className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 mt-2 transition"
              >
                {editIndex !== null ? "Actualizar" : "Agregar"}
              </button>
            </form>
          </div>
        </div>
      )}

      <table className="min-w-full text-sm overflow-x-auto block md:table">
        <thead>
          <tr className="bg-slate-100">
            <th className="px-4 py-2 text-left">Serie</th>
            <th className="px-4 py-2 text-left">ID Modelo</th>
            <th className="px-4 py-2 text-left">Marca</th>
            <th className="px-4 py-2 text-left">ID Categoría</th>
            <th className="px-4 py-2 text-left">Estado</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod, idx) => (
            <tr key={idx} className="border-b">
              <td className="px-4 py-2">{prod.Serie}</td>
              <td className="px-4 py-2">{prod.ID_Modelo}</td>
              <td className="px-4 py-2">{prod.Marca}</td>
              <td className="px-4 py-2">{prod.ID_Categoria}</td>
              <td className="px-4 py-2">{prod.Estado}</td>
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
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Animación para el modal */}
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
