"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Cargar usuario de localStorage si existe
    const stored = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (email, password) => {
    try {
      // PRUEBA ÚNICA: GET con parámetros en la URL
      const res = await fetch(`/api/usuarios/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
        method: 'GET',
        // No body ni Content-Type en GET
      });
      console.log('[LOGIN][GET] Status:', res.status);
      const text = await res.text();
      console.log('[LOGIN][GET] Respuesta texto:', text);
      if (res.ok) {
        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.error('[LOGIN][GET] Error al parsear JSON:', e);
          throw new Error('Respuesta no es JSON');
        }
        setUser(data.user || data);
        localStorage.setItem("user", JSON.stringify(data.user || data));
        return true;
      }

      throw new Error('Login fallido');
    } catch (err) {
      console.error('[LOGIN] Error:', err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
