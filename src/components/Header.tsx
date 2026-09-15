import type { View, AppUser } from "../App";

const viewTitles: Record<View, string> = {
  dashboard: "Dashboard",
  visits: "Registro de Visitas",
  visitors: "Gestión de Visitantes",
  reports: "Reportería",
  users: "Usuarios y Permisos",
  config: "Configuración",
  notifications: "Notificaciones",
  recepciones: "Recepciones",
};

interface Props {
  view: View;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  user: AppUser;
  onLogout: () => void;
}

export default function Header({ view, sidebarOpen, setSidebarOpen, user, onLogout }: Props) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("es-DO", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <header className="shrink-0 bg-white border-b flex items-center justify-between px-6 py-3" style={{ borderColor: "#D1DDED" }}>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg transition-colors hover:bg-[#E8EFF8]"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#5A7099" }}>
            {sidebarOpen ? "menu_open" : "menu"}
          </span>
        </button>
        <div>
          <h1 className="font-bold text-lg leading-tight" style={{ color: "#00A651", fontFamily: "Nunito, sans-serif" }}>
            {viewTitles[view]}
          </h1>
          <p className="text-xs capitalize" style={{ color: "#5A7099" }}>{dateStr}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar visitante, cédula..."
            className="pl-9 pr-4 py-2 rounded-xl text-sm border outline-none focus:ring-2 transition-all"
            style={{
              borderColor: "#D1DDED",
              background: "#F0F4F9",
              color: "#0D1B3E",
              width: 240,
            }}
          />
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2" style={{ fontSize: 18, color: "#5A7099" }}>
            search
          </span>
        </div>

        <button className="relative p-2 rounded-xl hover:bg-[#E8EFF8] transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#5A7099" }}>notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00A651]" />
        </button>

        <div className="flex items-center gap-2 pl-3 border-l" style={{ borderColor: "#D1DDED" }}>
          <div
            className="flex items-center justify-center rounded-full text-white text-sm font-bold"
            style={{ width: 34, height: 34, background: "#00A651" }}
          >
            {user.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight capitalize" style={{ color: "#0D1B3E" }}>{user.name}</p>
            <p className="text-xs" style={{ color: "#00A651" }}>{user.role} - {user.branch}</p>
          </div>
          <button onClick={onLogout} className="ml-2 text-xs text-[#5A7099] underline">Salir</button>
        </div>
      </div>
    </header>
  );
}
