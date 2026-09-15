import { useState } from "react";

interface Notif {
  id: number;
  type: "warning" | "info" | "success" | "error";
  title: string;
  msg: string;
  time: string;
  read: boolean;
  category: string;
}

const initial: Notif[] = [
  { id: 1, type: "warning", title: "Visita pendiente de aprobación", msg: "José Ramírez solicita visitar al Dr. Vargas en el Área Médica (Piso 3).", time: "hace 5 min", read: false, category: "Visitas" },
  { id: 2, type: "warning", title: "Visitante excede tiempo permitido", msg: "Ana Peña lleva 9 horas en instalaciones. Máximo permitido: 8 horas.", time: "hace 12 min", read: false, category: "Alertas" },
  { id: 3, type: "info", title: "Nuevo usuario registrado", msg: "Se creó el usuario Ing. Carmen López con rol de Recepcionista.", time: "hace 22 min", read: false, category: "Sistema" },
  { id: 4, type: "success", title: "Reporte mensual generado", msg: "El reporte de Agosto 2026 está disponible para descarga.", time: "hace 1 hora", read: true, category: "Reportes" },
  { id: 5, type: "info", title: "Pre-registro de visita", msg: "El Dr. Pérez registró una visita anticipada para mañana a las 10:00 AM.", time: "hace 2 horas", read: true, category: "Visitas" },
  { id: 6, type: "error", title: "Intento de acceso bloqueado", msg: "El visitante Rosa Méndez (bloqueada) intentó registrar entrada.", time: "hace 3 horas", read: true, category: "Alertas" },
  { id: 7, type: "success", title: "Backup completado", msg: "El respaldo automático del sistema se completó exitosamente.", time: "hace 5 horas", read: true, category: "Sistema" },
  { id: 8, type: "info", title: "Actualización de configuración", msg: "Ana Martínez modificó el tiempo de sesión de 60 a 30 minutos.", time: "Ayer 16:45", read: true, category: "Sistema" },
];

const typeConfig = {
  warning: { icon: "warning", bg: "#FEF3C7", color: "#F59E0B", iconBg: "#FDE68A" },
  info: { icon: "info", bg: "#EFF6FF", color: "#00A651", iconBg: "#DBEAFE" },
  success: { icon: "check_circle", bg: "#E8F5EE", color: "#00A651", iconBg: "#D1FAE5" },
  error: { icon: "error", bg: "#FEE2E2", color: "#DC2626", iconBg: "#FECACA" },
};

export default function Notifications() {
  const [notifs, setNotifs] = useState(initial);
  const [filter, setFilter] = useState("Todas");

  const categories = ["Todas", "Visitas", "Alertas", "Sistema", "Reportes"];
  const unread = notifs.filter((n) => !n.read).length;

  const filtered = notifs.filter((n) => filter === "Todas" || n.category === filter);

  const markRead = (id: number) => setNotifs(notifs.map((n) => n.id === id ? { ...n, read: true } : n));
  const markAll = () => setNotifs(notifs.map((n) => ({ ...n, read: true })));

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1 rounded-xl p-1 bg-white border" style={{ borderColor: "#D1DDED" }}>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{ background: filter === c ? "#00A651" : "transparent", color: filter === c ? "#fff" : "#5A7099" }}
              >
                {c}
              </button>
            ))}
          </div>
          {unread > 0 && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "#E8F5EE", color: "#00A651" }}>
              {unread} sin leer
            </span>
          )}
        </div>
        {unread > 0 && (
          <button onClick={markAll} className="text-xs font-semibold" style={{ color: "#00A651" }}>
            Marcar todas como leídas
          </button>
        )}
      </div>

      <div className="space-y-3">
        {filtered.map((n) => {
          const tc = typeConfig[n.type];
          return (
            <div
              key={n.id}
              className="bg-white rounded-2xl border p-4 flex gap-4 transition-all cursor-pointer"
              style={{ borderColor: n.read ? "#D1DDED" : "#00A651", borderWidth: n.read ? 1 : 1.5 }}
              onClick={() => markRead(n.id)}
            >
              <div
                className="shrink-0 flex items-center justify-center rounded-xl"
                style={{ width: 44, height: 44, background: tc.iconBg }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: tc.color }}>{tc.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#0D1B3E" }}>{n.title}</p>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#5A7099" }}>{n.msg}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="text-xs whitespace-nowrap" style={{ color: "#5A7099" }}>{n.time}</span>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full" style={{ background: "#00A651" }} />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: tc.bg, color: tc.color }}>{n.category}</span>
                  {n.type === "warning" && !n.read && (
                    <button className="text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ background: "#00A651", color: "#fff" }}>
                      Revisar
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="py-16 text-center bg-white rounded-2xl border" style={{ borderColor: "#D1DDED" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 40, color: "#D1DDED" }}>notifications_off</span>
            <p className="text-sm mt-2" style={{ color: "#5A7099" }}>No hay notificaciones en esta categoría</p>
          </div>
        )}
      </div>
    </div>
  );
}
