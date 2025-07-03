"use client";
import InventarioCRUD from "../../../components/crud/InventarioCRUD";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProductosPage() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user, router]);
  if (!user) return null;
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Registro de Productos</h2>
      <InventarioCRUD />
    </div>
  );
}
