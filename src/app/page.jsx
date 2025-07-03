// Página vacía, el login está en /login
import { redirect } from "next/navigation";

export default function Page() {
  redirect("/login");
  return null;
}
