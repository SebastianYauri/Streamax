
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  {
    label: "Inventario",
    icon: "inventory_2",
    children: [
      { label: "Productos", href: "/elementos/productos", icon: "inventory_2" },
      { label: "Modelos", href: "/elementos/modelos", icon: "view_list" },
      { label: "Marcas", href: "/elementos/marcas", icon: "branding_watermark" },
      { label: "Accesorios", href: "/elementos/accesorios", icon: "extension" },
      { label: "SIM", href: "/elementos/sim", icon: "sim_card" },
    ],
  },
  { label: "Movimientos", href: "/movimientos", icon: "swap_horiz" },
  {
    label: "Directorio",
    icon: "business",
    children: [
      { label: "Directorio", href: "/directorio", icon: "business" },
      { label: "Sucursales", href: "/directorio/sucursales", icon: "store" },
      { label: "Contactos", href: "/directorio/contactos", icon: "contacts" },
    ],
  },
  { label: "Categorías", href: "/categorias", icon: "category" },
  { label: "Usuarios", href: "/admin/usuarios", icon: "people" },
  { label: "Mi Cuenta", href: "/cuenta", icon: "account_circle" },
  // El botón de salir se maneja aparte
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
  const [dropdownOpen, setDropdownOpen] = useState(null); // For mobile dropdowns
  const { logout } = useAuth();
  // Responsive: track if mobile
  const [isMobile, setIsMobile] = useState(false);
  // Update isMobile on resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Cierra los desplegables al cerrar el menú lateral en móvil
  useEffect(() => {
    if (!open) setDropdownOpen(null);
  }, [open]);

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
        style={{ maxWidth: "100vw", overflowY: 'auto' }}
      >
        <div className="flex items-center gap-2 mb-8 px-2">
          <img src="/logo.svg" alt="Logo" className="h-9 w-9" />
          <span className="font-bold text-lg tracking-wide">Inventario</span>
        </div>
        <ul className="flex-1 flex flex-col gap-1">
          {navItems.map((item) => (
            item.children ? (
              <li key={item.label} className="group relative">
                <div
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-base font-medium cursor-pointer hover:bg-blue-800 select-none"
                  onClick={() => {
                    setDropdownOpen(dropdownOpen === item.label ? null : item.label);
                  }}
                >
                  <span className="material-icons text-lg opacity-80">{item.icon}</span>
                  {item.label}
                  <span className={`material-icons ml-auto transition-transform ${dropdownOpen === item.label ? "rotate-90" : ""}`}>expand_more</span>
                </div>
                <ul
                  className={`pl-6 flex flex-col gap-1 transition-all duration-200 overflow-hidden
                    ${dropdownOpen === item.label ? "max-h-96 py-1" : "max-h-0 p-0"}
                    bg-blue-900 rounded-lg`}
                >
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-150 text-base font-medium hover:bg-blue-800 focus:bg-blue-800 focus:outline-none ${pathname.startsWith(child.href) ? "bg-blue-800" : ""}`}
                        onClick={() => {
                          setOpen(false);
                          setDropdownOpen(null);
                        }}
                      >
                        <span className="material-icons text-lg opacity-80">{child.icon}</span>
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-150 text-base font-medium hover:bg-blue-800 focus:bg-blue-800 focus:outline-none ${pathname.startsWith(item.href) ? "bg-blue-800" : ""}`}
                  onClick={() => {
                    setOpen(false);
                    setDropdownOpen(null);
                  }}
                >
                  <span className="material-icons text-lg opacity-80">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            )
          ))}
        </ul>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-150 text-base font-medium hover:bg-blue-800 focus:bg-blue-800 focus:outline-none w-full text-left mt-2"
        >
          <span className="material-icons text-lg opacity-80">logout</span>
          Salir
        </button>
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
