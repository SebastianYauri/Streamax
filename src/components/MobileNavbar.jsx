"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Productos", href: "/elementos/productos", icon: "inventory_2" },
  { label: "Movimientos", href: "/movimientos", icon: "swap_horiz" },
  { label: "Directorio", href: "/directorio", icon: "business" },
  { label: "Categorías", href: "/categorias", icon: "category" },
];

export default function MobileNavbar() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-slate-200 flex justify-around items-center h-16 md:hidden shadow-lg"
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex flex-col items-center justify-center flex-1 h-full text-xs font-medium transition-colors duration-150 ${pathname.startsWith(item.href) ? "text-blue-600" : "text-slate-500"}`}
          style={{ minWidth: 0, width: "20%", maxWidth: "20vw" }}
        >
          <span className="material-icons text-2xl mb-1">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
