"use client";
import React, { useState } from "react";
import ContactoForm from "../../../components/crud/ContactoForm";

// Simulación de datos iniciales (reemplaza por fetch a tu API)
const initialContactos = [
  { ID_Contacto: 1, ID_Directorio: 1, Nombre: "Juan Pérez", Cargo: "Gerente", Telefono: "999888777", Correo: "juan@empresa.com" },
];

export default function ContactosPage() {
  const [contactos, setContactos] = useState(initialContactos);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulación de directorios (reemplaza por fetch a tu API)
  const directorios = [
    { ID_Directorio: 1, RazonSocial: "Empresa S.A." },
    { ID_Directorio: 2, RazonSocial: "Comercial XYZ" },
  ];

  const handleAdd = (data) => {
    setLoading(true);
    setTimeout(() => {
      if (editIndex !== null) {
        const updated = [...contactos];
        updated[editIndex] = { ...updated[editIndex], ...data };
        setContactos(updated);
      } else {
        setContactos([...contactos, { ...data, ID_Contacto: Date.now() }]);
      }
      setModalOpen(false);
      setEditIndex(null);
      setLoading(false);
    }, 500);
  };

  const handleEdit = (idx) => {
    setEditIndex(idx);
    setModalOpen(true);
  };

  const handleDelete = (idx) => {
    setContactos(contactos.filter((_, i) => i !== idx));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Contactos</h2>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 mb-4"
        onClick={() => { setModalOpen(true); setEditIndex(null); }}
      >
        Agregar Contacto
      </button>
      <table className="min-w-full text-sm mb-6">
        <thead>
          <tr className="bg-slate-100">
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Cargo</th>
            <th className="px-4 py-2 text-left">Teléfono</th>
            <th className="px-4 py-2 text-left">Correo</th>
            <th className="px-4 py-2 text-left">Directorio</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contactos.map((c, idx) => (
            <tr key={c.ID_Contacto} className="border-b">
              <td className="px-4 py-2">{c.Nombre}</td>
              <td className="px-4 py-2">{c.Cargo}</td>
              <td className="px-4 py-2">{c.Telefono}</td>
              <td className="px-4 py-2">{c.Correo}</td>
              <td className="px-4 py-2">{directorios.find(d => d.ID_Directorio === c.ID_Directorio)?.RazonSocial || "-"}</td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(idx)}
                >Editar</button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(idx)}
                >Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm bg-black/10">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg animate-fadeInScale relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              onClick={() => setModalOpen(false)}
              aria-label="Cerrar"
            >×</button>
            <h3 className="text-xl font-semibold mb-4">
              {editIndex !== null ? "Editar Contacto" : "Agregar Contacto"}
            </h3>
            <ContactoForm
              initialData={editIndex !== null ? contactos[editIndex] : {}}
              directorios={directorios}
              onSubmit={handleAdd}
              loading={loading}
            />
          </div>
        </div>
      )}
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
