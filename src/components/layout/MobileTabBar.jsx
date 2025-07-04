"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Posts", href: "/admin", icon: "forum" },
  { label: "Usuarios", href: "/admin/usuarios", icon: "group" },
  { label: "Directorio", icon: "business", children: [
    { label: "Directorio", href: "/directorio", icon: "business" },
    { label: "Sucursales", href: "/directorio/sucursales", icon: "store" },
    { label: "Contactos", href: "/directorio/contactos", icon: "contacts" },
  ]},
  { label: "Inventario", icon: "inventory_2", children: [
    { label: "Productos", href: "/elementos/productos", icon: "inventory_2" },
    { label: "Modelos", href: "/elementos/modelos", icon: "view_list" },
    { label: "Marcas", href: "/elementos/marcas", icon: "branding_watermark" },
    { label: "Accesorios", href: "/elementos/accesorios", icon: "extension" },
    { label: "SIM", href: "/elementos/sim", icon: "sim_card" },
  ]},
  { label: "Kardex", icon: "list_alt", children: [
    { label: "Kardex Productos", href: "/movimientos/kardex-productos", icon: "list" },
    { label: "Kardex Accesorios", href: "/movimientos/kardex-accesorios", icon: "list" },
  ]},
  { label: "Movimientos", href: "/movimientos", icon: "swap_horiz" },
  { label: "Categorías", href: "/categorias", icon: "category" },
];

export default function MobileTabBar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);

  // Solo mostrar en mobile, navbar azul moderno
  return (
    <>
      {openDropdown && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setOpenDropdown(null)}
        />
      )}
      <aside className="md:hidden fixed top-0 left-0 h-full w-[72px] bg-blue-600 rounded-r-3xl shadow-2xl z-50 flex flex-col items-center py-6 gap-2 border-r border-blue-700">
        <div className="mb-8">
          <span className="material-icons text-3xl text-white">all_inclusive</span>
        </div>
        <nav className="flex flex-col gap-2 w-full items-center">
          {navItems.map((item) => (
            <div key={item.label} className="relative w-full flex flex-col items-center">
              {item.children ? (
                <>
                  <button
                    className={`flex flex-col items-center w-full py-2 rounded-xl transition-colors focus:outline-none ${openDropdown === item.label ? "bg-blue-100 text-blue-700" : pathname.startsWith(item.href || "") ? "bg-blue-200 text-blue-800" : "text-blue-100 hover:bg-blue-500/40"}`}
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  >
                    <span className="material-icons text-2xl">{item.icon}</span>
                  </button>
                  {openDropdown === item.label && (
                    <div className="fixed top-0 left-[72px] h-full w-[220px] bg-white rounded-r-3xl shadow-2xl border-l z-50 flex flex-col py-8 px-4 animate-fadeIn">
                      <button className="absolute top-4 right-4 text-gray-400 hover:text-blue-600" onClick={() => setOpenDropdown(null)}>
                        <span className="material-icons">close</span>
                      </button>
                      <div className="flex flex-col gap-2 mt-8">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${pathname.startsWith(child.href) ? "bg-blue-100 text-blue-700" : "text-blue-900 hover:bg-blue-50"}`}
                            onClick={() => setOpenDropdown(null)}
                          >
                            <span className="material-icons text-xl">{child.icon}</span>
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`flex flex-col items-center w-full py-2 rounded-xl transition-colors ${pathname.startsWith(item.href) ? "bg-blue-100 text-blue-700" : "text-blue-100 hover:bg-blue-500/40"}`}
                >
                  <span className="material-icons text-2xl">{item.icon}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
        <div className="mt-auto mb-2 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
            <span className="material-icons text-xl text-blue-700">person</span>
          </div>
        </div>
        <style jsx>{`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateX(10px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.18s ease;
          }
        `}</style>
      </aside>
    </>
  );
}

// Elimina cualquier rastro del antiguo navbar inferior si existe en tu layout principal, _app.js, o layouts relacionados. Si el antiguo navbar era un componente o estaba en otro archivo, asegúrate de eliminar su importación y uso para que solo quede este sidebar azul en mobile.
