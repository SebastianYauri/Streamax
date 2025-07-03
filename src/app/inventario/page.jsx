"use client";
import InventarioCRUD from "../../components/crud/InventarioCRUD";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InventarioPage() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user, router]);
  if (!user) return null;
  return (
    <div className="p-6">
      <InventarioCRUD />
    </div>
  );
}
