import Navbar from "../../../components/Navbar";

export default function SimLayout({ children }) {
  return (
    <div className="flex">
      <Navbar />
      <main className="flex-1 ml-0 md:ml-60">{children}</main>
    </div>
  );
}
