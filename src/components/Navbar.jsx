"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Productos", href: "/elementos/productos", icon: "inventory_2" },
  { label: "Movimientos", href: "/movimientos", icon: "swap_horiz" },
  { label: "Usuarios", href: "/usuarios", icon: "people" },
  { label: "Categorías", href: "/categorias", icon: "category" },
  { label: "Reportes", href: "/reportes", icon: "bar_chart" },
  { label: "Mi Cuenta", href: "/cuenta", icon: "account_circle" },
  { label: "Salir", href: "/logout", icon: "logout" },
];

export default function Navbar() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  return (
    <nav className="h-full w-60 bg-blue-900 text-white flex flex-col py-6 px-4 gap-2 fixed left-0 top-0 min-h-screen shadow-lg z-20">
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
  );
}
