import type { View } from "../App";
import senasaLogo from "../assets/logoSeNaSa.jpg";

interface NavItem {
  id: View;
  label: string;
  icon: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "grid_view" },
  { id: "visits", label: "Registro de Visitas", icon: "badge" },
  { id: "visitors", label: "Gestión de Visitantes", icon: "groups" },
  { id: "recepciones", label: "Recepciones", icon: "store" },
  { id: "reports", label: "Reportería", icon: "analytics" },
  { id: "users", label: "Usuarios y Permisos", icon: "manage_accounts" },
  { id: "notifications", label: "Notificaciones", icon: "notifications", badge: 3 },
  { id: "config", label: "Configuración", icon: "settings" },
];

interface Props {
  view: View;
  setView: (v: View) => void;
  open: boolean;
  canViewRecepciones: boolean;
}

export default function Sidebar({ view, setView, open, canViewRecepciones }: Props) {
  const items = navItems.filter((item) => item.id !== "recepciones" || canViewRecepciones);

  return (
    <aside
      className="flex flex-col shrink-0 overflow-hidden transition-all duration-300"
      style={{
        width: open ? 256 : 72,
        background: "linear-gradient(180deg, #007338 0%, #00A651 100%)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <div
          className="shrink-0 flex items-center justify-center rounded-full bg-white/10 overflow-hidden border border-white/20"
          style={{ width: open ? 54 : 42, height: open ? 54 : 42 }}
        >
          <img
            src={senasaLogo}
            alt="SeNaSa logo"
            className="object-cover rounded-full"
            style={{ width: open ? 44 : 32, height: open ? 44 : 32 }}
          />
        </div>
        {open && (
          <div className="min-w-0">
            <p className="font-bold text-white text-lg leading-tight font-[Nunito]">SeNaSa</p>
            <p className="text-white/60 text-[11px] truncate">Control de Visitas</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2.5 space-y-2.5">
        {items.map((item) => {
          const active = view === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 relative group"
              style={{
                background: active ? "rgba(255,255,255,0.15)" : "transparent",
                color: "#FFFFFF",
              }}
              onMouseEnter={(e) => {
                if (!active) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                if (!active) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              {active && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full"
                  style={{ height: 24, background: "#00A651" }}
                />
              )}
              <span className="material-symbols-outlined shrink-0" style={{ fontSize: 21 }}>
                {item.icon}
              </span>
              {open && (
                <span className="text-[15.5px] font-semibold truncate flex-1 text-left">{item.label}</span>
              )}
              {open && item.badge && (
                <span
                  className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: "#00A651", color: "#fff", minWidth: 20, textAlign: "center" }}
                >
                  {item.badge}
                </span>
              )}
              {!open && item.badge && (
                <span
                  className="absolute top-1 right-1 w-2 h-2 rounded-full"
                  style={{ background: "#00A651" }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-white/10 mt-auto">
        <div className="flex items-center gap-3">
          <div
            className="shrink-0 flex items-center justify-center rounded-full text-white font-bold text-sm"
            style={{ width: 36, height: 36, background: "#00A651" }}
          >
            AM
          </div>
          {open && (
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">Ana Martínez</p>
              <p className="text-white/50 text-xs truncate">Administrador</p>
            </div>
          )}
        </div>
      </div>

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
    </aside>
  );
}
