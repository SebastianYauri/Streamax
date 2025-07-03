"use client";
import MovimientosCRUD from "../../components/crud/MovimientosCRUD";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MovimientosPage() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user, router]);
  if (!user) return null;
  return <MovimientosCRUD />;
}
