// Página principal de Admin (Inventario y Kardex)
"use client";
import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import InventarioProductos from "../../components/inventario/InventarioProductos";
import KardexMovimientos from "../../components/kardex/KardexMovimientos";
import MobileTabBar from "../../components/layout/MobileTabBar";

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div></div>
        <img src="/icons/logo.svg" alt="Logo" className="h-8 w-8" />
      </header>
      {/* Bienvenida */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl p-8 mb-8 flex items-center gap-6 shadow">
        <img src="/icons/logo.svg" alt="Logo" className="h-20 w-20 rounded-full bg-white p-2 shadow" />
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-2">Bienvenido al Sistema de Inventario</h1>
          <p className="text-white/90 text-lg">Gestiona tu inventario de manera eficiente y profesional</p>
        </div>
      </section>
      {/* Cards resumen */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-slate-500 text-sm mb-2">USUARIOS</span>
          <span className="text-3xl font-bold mb-1 text-blue-700">1</span>
          <span className="text-xs text-green-500">↗ Total de usuarios</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-slate-500 text-sm mb-2">CATEGORÍAS</span>
          <span className="text-3xl font-bold mb-1 text-blue-700">0</span>
          <span className="text-xs text-cyan-500">↗ Total de categorías</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-slate-500 text-sm mb-2">PRODUCTOS</span>
          <span className="text-3xl font-bold mb-1 text-blue-700">0</span>
          <span className="text-xs text-cyan-500">↗ Total de productos</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-slate-500 text-sm mb-2">MOVIMIENTOS</span>
          <span className="text-3xl font-bold mb-1 text-blue-700">0</span>
          <span className="text-xs text-orange-500">↗ Movimientos del mes</span>
        </div>
      </section>
      {/* Aquí puedes renderizar children o widgets adicionales */}
      <InventarioProductos />
      <KardexMovimientos />
      {/* Tab bar móvil */}
      <MobileTabBar />
    </>
  );
}
