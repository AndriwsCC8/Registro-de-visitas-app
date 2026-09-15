import { useState } from "react";
import senasaLogo from "../assets/logoSeNaSa.jpg";
import backgroundImage from "../assets/background SeNaSa.jpg";
import type { AppUser } from "../App";

export default function Login({ onLogin }: { onLogin: (user: AppUser) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      // Mock login logic based on username
      let role = "Recepcionista";
      let branch = "Sede Central";
      let permissions: string[] = [];

      if (username === "admin") {
        role = "Administrador";
        permissions = ["recepciones"];
      } else if (username === "rec_norte") {
        role = "Recepcionista";
        branch = "Sucursal Norte";
        permissions = ["recepciones"];
      } else if (username === "rec_naco") {
        role = "Recepcionista";
        branch = "Naco";
        permissions = ["recepciones"];
      } else if (username === "supervisor") {
        role = "Supervisor";
        permissions = ["recepciones"];
      }

      onLogin({ name: username, role, branch, permissions });
    }
  };

  return (
    <div
      className="relative flex h-screen items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(8, 29, 36, 0.55), rgba(8, 29, 36, 0.6)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#0E2A35]/20" />
      <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/40">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-white shadow-lg mb-4 border border-[#E8F5EE] p-1.5 overflow-hidden">
            <img
              src={senasaLogo}
              alt="Logo de SeNaSa"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h1 className="text-2xl font-bold" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>SeNaSa</h1>
          <p className="text-sm text-[#5A7099]">Registro de Visitas</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-[#5A7099]">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2"
              style={{ borderColor: "#D1DDED", color: "#0D1B3E" }}
              placeholder="Ingrese su usuario"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-[#5A7099]">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2"
              style={{ borderColor: "#D1DDED", color: "#0D1B3E" }}
              placeholder="Ingrese su contraseña"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-sm font-bold text-white mt-6 transition-opacity hover:opacity-90"
            style={{ background: "#00A651" }}
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
