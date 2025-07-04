"use client";
import React, { useState, useRef, useEffect } from "react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Cierra sidebar al hacer click fuera
  useEffect(() => {
    if (!sidebarOpen) return;
    function handleClickOutside(e) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setSidebarOpen(false);
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  // Cierra sidebar al navegar
  useEffect(() => {
    setSidebarOpen(false);
    setOpenDropdown(null);
    // eslint-disable-next-line
  }, [pathname]);

  // Animación hamburguesa
  const HamburgerButton = ({ open, onClick }) => (
    <button
      ref={hamburgerRef}
      className="md:hidden fixed top-4 left-4 z-[100] flex flex-col justify-center items-center w-10 h-10 bg-blue-600 rounded-full shadow-lg focus:outline-none transition-all"
      aria-label={open ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={open}
      onClick={onClick}
    >
      <span
        className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`}
      ></span>
      <span
        className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 my-1 ${open ? "opacity-0" : ""}`}
      ></span>
      <span
        className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`}
      ></span>
    </button>
  );

  return (
    <>
      <HamburgerButton open={sidebarOpen} onClick={() => setSidebarOpen((v) => !v)} />
      {/* Overlay para cerrar sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={() => {
            setSidebarOpen(false);
            setOpenDropdown(null);
          }}
        />
      )}
      <aside
        ref={sidebarRef}
        className={`md:hidden fixed top-0 left-0 min-h-screen w-[72px] bg-blue-600 rounded-r-3xl shadow-2xl z-50 flex flex-col items-center py-6 gap-2 border-r border-blue-700 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ willChange: "transform" }}
      >
        <div className="mb-8">
          <span className="material-icons text-3xl text-white">all_inclusive</span>
        </div>
        <nav className="flex flex-col gap-2 w-full items-center">
          {navItems.map((item) => (
            <div key={item.label} className="relative w-full flex flex-col items-center">
              {item.children ? (
                <>
                  <button
                    className={`flex flex-col items-center w-full py-2 rounded-xl transition-colors focus:outline-none ${openDropdown === item.label ? "bg-blue-100 text-blue-700" : "text-blue-100 hover:bg-blue-500/40"}`}
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    aria-pressed={openDropdown === item.label}
                    tabIndex={0}
                  >
                    <span className="material-icons text-2xl">{item.icon}</span>
                  </button>
                  {/* Popover submenú */}
                  {openDropdown === item.label && sidebarOpen && (
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
                            onClick={() => {
                              setOpenDropdown(null);
                              setSidebarOpen(false);
                            }}
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
                  onClick={() => setSidebarOpen(false)}
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
