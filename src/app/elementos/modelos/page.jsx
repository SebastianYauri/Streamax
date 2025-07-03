"use client";
import { useState } from "react";
import ModeloCRUD from "../../../components/crud/ModeloCRUD";
import { modelos as mockModelos, marcas as mockMarcas } from "../../../features/inventarioData";

export default function ModelosPage() {
  // Simulación de estado local, reemplazar por fetch/backend
  const [modelos, setModelos] = useState(mockModelos);
  const [marcas] = useState(mockMarcas);

  const handleAdd = (data) => setModelos([...modelos, { ...data, ID_Modelo: Date.now() }]);
  const handleEdit = (idx, data) => setModelos(modelos.map((m, i) => i === idx ? { ...m, ...data } : m));
  const handleDelete = (idx) => setModelos(modelos.filter((_, i) => i !== idx));

  return <ModeloCRUD modelos={modelos} marcas={marcas} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />;
}
