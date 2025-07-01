"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Productos", href: "/elementos/productos", icon: "inventory_2" },
  { label: "Movimientos", href: "/movimientos", icon: "swap_horiz" },
  { label: "Directorio", href: "/directorio", icon: "business" },
  { label: "Categorías", href: "/categorias", icon: "category" },
  { label: "Mi Cuenta", href: "/cuenta", icon: "account_circle" },
  { label: "Salir", href: "/logout", icon: "logout" },
];

export default function Navbar() {
  // usePathname solo en client component
  let pathname = "";
  try {
    // Si estamos en el cliente, usamos usePathname
    // Si no, dejamos pathname vacío para evitar hydration mismatch
    // eslint-disable-next-line react-hooks/rules-of-hooks
    pathname = require("next/navigation").usePathname?.() || "";
  } catch {}
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Botón hamburguesa solo visible en móvil */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 bg-blue-900 text-white p-2 rounded-full shadow-lg focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-label="Abrir menú"
      >
        <span className="material-icons">menu</span>
      </button>
      {/* Sidebar */}
      <nav
        className={`bg-blue-900 text-white flex flex-col py-6 px-4 gap-2 fixed left-0 top-0 min-h-screen shadow-lg z-20 w-60 transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:w-60`}
        style={{ maxWidth: "100vw" }}
      >
        <div className="flex items-center gap-2 mb-8 px-2">
          <img src="/logo.svg" alt="Logo" className="h-9 w-9" />
          <span className="font-bold text-lg tracking-wide">Inventario</span>
        </div>
        <ul className="flex-1 flex flex-col gap-1">
          {navItems.map((item, idx) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-150 text-base font-medium hover:bg-blue-800 focus:bg-blue-800 focus:outline-none ${pathname.startsWith(item.href) ? "bg-blue-800" : ""}`}
                onClick={() => setOpen(false)}
              >
                <span className="material-icons text-lg opacity-80">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-xs text-blue-200 text-center opacity-70">
          © 2025 Tu Empresa
        </div>
      </nav>
      {/* Fondo oscuro al abrir menú en móvil */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
