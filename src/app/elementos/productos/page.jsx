"use client";
import InventarioCRUD from "../../../components/crud/InventarioCRUD";
import BarcodeScanner from "../../../components/BarcodeScanner";
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
  const handleBarcode = (code) => {
    // Aquí puedes manejar el código escaneado, por ejemplo buscar producto, llenar formulario, etc.
    alert("Código escaneado: " + code);
    // TODO: Integrar con InventarioCRUD o lógica de productos
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Registro de Productos</h2>
      <div className="mb-6">
        <BarcodeScanner onDetected={handleBarcode} />
      </div>
      <InventarioCRUD />
    </div>
  );
}
