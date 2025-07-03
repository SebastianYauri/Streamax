"use client";
import { useState } from "react";
import MarcaCRUD from "../../../components/crud/MarcaCRUD";
import { marcas as mockMarcas } from "../../../features/inventarioData";

export default function MarcasPage() {
  // Simulación de estado local, reemplazar por fetch/backend
  const [marcas, setMarcas] = useState(mockMarcas);

  const handleAdd = (data) => setMarcas([...marcas, { ...data, ID_Marca: Date.now() }]);
  const handleEdit = (idx, data) => setMarcas(marcas.map((m, i) => i === idx ? { ...m, ...data } : m));
  const handleDelete = (idx) => setMarcas(marcas.filter((_, i) => i !== idx));

  return <MarcaCRUD marcas={marcas} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />;
}
