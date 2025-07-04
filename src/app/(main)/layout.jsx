import Navbar from "../../components/layout/Navbar";
import MobileTabBar from "../../components/layout/MobileTabBar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar solo en desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:left md:block md:w-64 md:z-20">
        <Navbar />
      </div>
      <main className="flex-1 p-1 md:p-4 bg-white transition-all duration-300 md:pl-64 pl-[72px] md:pl-64">
        <div className="w-full max-w-5xl mx-auto">{children}</div>
      </main>
      {/* Navbar móvil solo en mobile */}
      <MobileTabBar />
    </div>
  );
}
