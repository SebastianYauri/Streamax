import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
];

export default function MobileTabBar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);

  // Only show on mobile
  return (
    <>
      {/* Fondo para cerrar popover al tocar fuera */}
      {openDropdown && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setOpenDropdown(null)}
        />
      )}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t z-50 flex justify-around items-center h-16 shadow-lg">
        {navItems.map((item) => (
          <div key={item.label} className="relative flex-1 flex flex-col items-center">
            {item.children ? (
              <>
                <button
                  className={`flex flex-col items-center justify-center w-full pt-1 pb-0.5 focus:outline-none ${openDropdown === item.label ? "text-blue-600" : "text-gray-500"}`}
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                >
                  <span className="material-icons text-2xl">{item.icon}</span>
                  <span className="text-xs">{item.label}</span>
                </button>
                {/* Dropdown popover */}
                {openDropdown === item.label && (
                  <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg border px-2 py-2 min-w-[180px] flex flex-col animate-fadeIn z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors ${pathname.startsWith(child.href) ? "bg-blue-100 text-blue-700" : "text-gray-700"}`}
                        onClick={() => setOpenDropdown(null)}
                      >
                        <span className="material-icons text-base">{child.icon}</span>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href}
                className={`flex flex-col items-center justify-center w-full pt-1 pb-0.5 ${pathname.startsWith(item.href) ? "text-blue-600" : "text-gray-500"}`}
              >
                <span className="material-icons text-2xl">{item.icon}</span>
                <span className="text-xs">{item.label}</span>
              </Link>
            )}
          </div>
        ))}
        <style jsx>{`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.18s ease;
          }
        `}</style>
      </nav>
    </>
  );
}
