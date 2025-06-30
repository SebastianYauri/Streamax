import Image from "next/image";

// Next.js best practice: use 'Page' as the component name for app directory pages
export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400 px-2">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Login Panel */}
        <div className="w-full md:w-1/2 bg-white p-6 md:p-12 flex flex-col justify-center relative">
          {/* Logo arriba de Login */}
          <div className="mb-8 flex flex-col items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={600}
              height={600}
              className="w-32 h-32 sm:w-40 sm:h-40 max-w-full max-h-48 mb-4 object-contain"
              priority
            />
            <span className="text-blue-900 text-2xl font-bold">Login</span>
          </div>
          <form className="space-y-6">
            <div>
              <label
                className="block text-blue-700 text-sm mb-1"
                htmlFor="username"
              >
                Usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className="w-full px-3 py-2 bg-transparent border-b border-blue-400 text-blue-900 focus:outline-none"
              />
            </div>
            <div>
              <label
                className="block text-blue-700 text-sm mb-1"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full px-3 py-2 bg-transparent border-b border-blue-400 text-blue-900 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
            >
              LOGIN
            </button>
          </form>
        </div>
        {/* Cuadro azul vacío */}
        <div className="hidden md:flex w-1/2 bg-blue-900 p-12 flex-col justify-center relative"></div>
      </div>
    </div>
  );
}
