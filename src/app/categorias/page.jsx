"use client";
import CategoriasCRUD from "../../components/crud/CategoriasCRUD";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CategoriasPage() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user, router]);
  if (!user) return null;
  return (
    <div className="p-6">
      <CategoriasCRUD />
    </div>
  );
}
