import { useState } from "react";

interface HistoryEntry {
  id: string;
  date: string;
  entry: string;
  exit: string;
  host: string;
  dept: string;
  gerencia?: string;
  piso: string;
  purpose: string;
  carnet: string;
  equipment?: string;
}

interface Visitor {
  id: string;
  name: string;
  cedula: string;
  passport?: string;
  phone: string;
  email: string;
  company: string;
  visits: number;
  lastVisit: string;
  status: "Activo" | "Bloqueado";
  type: "Externo" | "Proveedor" | "Contratista";
  branch: string;
  history: HistoryEntry[];
}

const visitors: Visitor[] = [
  {
    id: "VST-001", name: "Carlos Rodríguez", cedula: "001-1234567-8", phone: "809-555-0101", email: "c.rodriguez@email.com", company: "Independiente", visits: 12, lastVisit: "Hoy", status: "Activo", type: "Externo", branch: "Sede Central",
    history: [
      { id: "V-00234", date: "14 Sep 2026", entry: "09:14 AM", exit: "--", host: "Dr. Pérez", dept: "Área Médica", gerencia: "Gerencia de Salud", piso: "Piso 2", purpose: "Consulta Médica", carnet: "C-042", equipment: "Laptop Dell" },
      { id: "V-00198", date: "02 Sep 2026", entry: "08:30 AM", exit: "09:40 AM", host: "Dr. Pérez", dept: "Área Médica", gerencia: "Gerencia de Salud", piso: "Piso 2", purpose: "Consulta Médica", carnet: "C-018" },
      { id: "V-00151", date: "20 Ago 2026", entry: "10:05 AM", exit: "11:15 AM", host: "Dr. Pérez", dept: "Área Médica", gerencia: "Gerencia de Salud", piso: "Piso 2", purpose: "Consulta Médica", carnet: "C-009" },
    ],
  },
  {
    id: "VST-002", name: "María González", cedula: "002-9876543-1", phone: "829-555-0202", email: "m.gonzalez@techrd.com", company: "Tech RD", visits: 45, lastVisit: "Hoy", status: "Activo", type: "Proveedor", branch: "Sucursal Norte",
    history: [
      { id: "V-00233", date: "14 Sep 2026", entry: "09:02 AM", exit: "--", host: "Lic. Martínez", dept: "Administración", piso: "Piso 1", purpose: "Administrativo", carnet: "C-041" },
      { id: "V-00187", date: "10 Sep 2026", entry: "08:50 AM", exit: "12:20 PM", host: "Lic. Martínez", dept: "Administración", piso: "Piso 1", purpose: "Instalación de Equipos", carnet: "C-012", equipment: "Router y switch de red" },
      { id: "V-00142", date: "28 Ago 2026", entry: "09:10 AM", exit: "11:00 AM", host: "Lic. Martínez", dept: "Administración", piso: "Piso 1", purpose: "Soporte Técnico", carnet: "C-006", equipment: "Laptop y maletín de herramientas" },
    ],
  },
  {
    id: "VST-003", name: "Pedro Jiménez", cedula: "001-5556677-4", phone: "849-555-0303", email: "p.jimenez@solutech.com", company: "Solutech", visits: 8, lastVisit: "Ayer", status: "Activo", type: "Contratista", branch: "Sede Central",
    history: [
      { id: "V-00232", date: "13 Sep 2026", entry: "08:47 AM", exit: "10:15 AM", host: "Ing. Sánchez", dept: "TI", gerencia: "Gerencia de Tecnología de la Información", piso: "Piso 3", purpose: "Soporte Técnico", carnet: "C-040", equipment: "Maletín de herramientas de red" },
      { id: "V-00160", date: "25 Ago 2026", entry: "09:00 AM", exit: "10:30 AM", host: "Ing. Sánchez", dept: "TI", gerencia: "Gerencia de Tecnología de la Información", piso: "Piso 3", purpose: "Soporte Técnico", carnet: "C-011" },
    ],
  },
  {
    id: "VST-004", name: "Lucía Fernández", cedula: "001-3334455-2", phone: "809-555-0404", email: "l.fernandez@email.com", company: "Independiente", visits: 3, lastVisit: "08 Sep", status: "Activo", type: "Externo", branch: "Sede Central",
    history: [
      { id: "V-00231", date: "08 Sep 2026", entry: "08:35 AM", exit: "09:55 AM", host: "Dr. Vargas", dept: "Área Médica", gerencia: "Gerencia de Salud", piso: "Piso 2", purpose: "Consulta Médica", carnet: "C-039" },
      { id: "V-00120", date: "15 Ago 2026", entry: "09:20 AM", exit: "10:05 AM", host: "Dr. Vargas", dept: "Área Médica", gerencia: "Gerencia de Salud", piso: "Piso 2", purpose: "Consulta Médica", carnet: "C-005" },
    ],
  },
  {
    id: "VST-005", name: "Juan Herrera", cedula: "002-7778899-5", phone: "829-555-0505", email: "j.herrera@email.com", company: "Servicios JH", visits: 5, lastVisit: "01 Sep", status: "Bloqueado", type: "Proveedor", branch: "Sucursal Norte",
    history: [
      { id: "V-00230", date: "01 Sep 2026", entry: "08:20 AM", exit: "08:50 AM", host: "Lic. Torres", dept: "RRHH", piso: "Piso 1", purpose: "Entrega de Documentos", carnet: "C-038" },
      { id: "V-00099", date: "12 Ago 2026", entry: "09:00 AM", exit: "09:35 AM", host: "Lic. Torres", dept: "RRHH", piso: "Piso 1", purpose: "Entrega de Documentos", carnet: "C-002" },
    ],
  },
];

const typeColors: Record<string, { bg: string; color: string }> = {
  Externo: { bg: "#E8EFF8", color: "#00A651" },
  Proveedor: { bg: "#E8F5EE", color: "#00A651" },
  Contratista: { bg: "#FEF3C7", color: "#F59E0B" },
};

export default function Visitors({ user }: { user: { name: string; role: string; branch: string } }) {
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Visitor | null>(null);
  const [historyVisitor, setHistoryVisitor] = useState<Visitor | null>(null);

  const filtered = visitors.filter((v) => {
    const matchType = filter === "Todos" || v.type === filter;
    const matchSearch = search === "" || v.name.toLowerCase().includes(search.toLowerCase()) || v.cedula.includes(search) || (v.passport ?? "").toLowerCase().includes(search.toLowerCase());
    const matchBranch = user.role === "Administrador" || v.branch === user.branch;
    return matchType && matchSearch && matchBranch;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {["Todos", "Externo", "Proveedor", "Contratista"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all"
              style={{
                background: filter === f ? "#00A651" : "#fff",
                color: filter === f ? "#fff" : "#5A7099",
                borderColor: filter === f ? "#00A651" : "#D1DDED",
              }}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar visitante..."
            className="pl-8 pr-4 py-2 rounded-xl text-sm border outline-none"
            style={{ borderColor: "#D1DDED", background: "#fff", width: 220 }}
          />
          <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2" style={{ fontSize: 17, color: "#5A7099" }}>search</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Visitantes", value: visitors.length, icon: "groups", color: "#00A651" },
          { label: "Activos", value: visitors.filter((v) => v.status === "Activo").length, icon: "check_circle", color: "#00A651" },
          { label: "Bloqueados", value: visitors.filter((v) => v.status === "Bloqueado").length, icon: "block", color: "#DC2626" },
          { label: "Proveedores", value: visitors.filter((v) => v.type === "Proveedor").length, icon: "business", color: "#F59E0B" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border flex items-center gap-3" style={{ borderColor: "#D1DDED" }}>
            <div className="flex items-center justify-center rounded-xl" style={{ width: 40, height: 40, background: s.color + "18" }}>
              <span className="material-symbols-outlined" style={{ color: s.color, fontSize: 20 }}>{s.icon}</span>
            </div>
            <div>
              <p className="text-xl font-extrabold" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>{s.value}</p>
              <p className="text-xs" style={{ color: "#5A7099" }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.map((v) => {
          const tc = typeColors[v.type];
          return (
            <div
              key={v.id}
              className="bg-white rounded-2xl p-5 border cursor-pointer transition-all hover:shadow-md"
              style={{ borderColor: "#D1DDED" }}
              onClick={() => setSelected(v)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center rounded-full text-white font-bold"
                    style={{ width: 44, height: 44, background: "#00A651", fontSize: 16 }}>
                    {v.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>{v.name}</p>
                    <p className="text-xs" style={{ color: "#5A7099" }}>{v.company}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: tc.bg, color: tc.color }}>{v.type}</span>
              </div>

              <div className="space-y-2 text-xs" style={{ color: "#5A7099" }}>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>badge</span>
                  <span className="font-mono">{v.cedula}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>phone</span>
                  <span>{v.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>mail</span>
                  <span className="truncate">{v.email}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t flex items-center justify-between" style={{ borderColor: "#F0F4F9" }}>
                <div className="text-center">
                  <p className="font-extrabold text-base" style={{ color: "#00A651", fontFamily: "Nunito" }}>{v.visits}</p>
                  <p className="text-xs" style={{ color: "#5A7099" }}>Visitas</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm" style={{ color: "#0D1B3E" }}>{v.lastVisit}</p>
                  <p className="text-xs" style={{ color: "#5A7099" }}>Última visita</p>
                </div>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background: v.status === "Activo" ? "#E8F5EE" : "#FEE2E2",
                    color: v.status === "Activo" ? "#00A651" : "#DC2626",
                  }}
                >
                  {v.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#D1DDED", background: "#00A651", borderRadius: "1rem 1rem 0 0" }}>
              <h2 className="text-white font-bold" style={{ fontFamily: "Nunito" }}>Perfil de Visitante</h2>
              <button onClick={() => setSelected(null)}>
                <span className="material-symbols-outlined text-white/70" style={{ fontSize: 22 }}>close</span>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-5">
                <div className="flex items-center justify-center rounded-full text-white font-bold text-2xl"
                  style={{ width: 64, height: 64, background: "#00A651" }}>
                  {selected.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="font-bold text-lg" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>{selected.name}</p>
                  <p className="text-sm" style={{ color: "#5A7099" }}>{selected.email}</p>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full mt-1 inline-block"
                    style={{ background: typeColors[selected.type].bg, color: typeColors[selected.type].color }}>
                    {selected.type}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {[["Cédula", selected.cedula], selected.passport ? ["Pasaporte", selected.passport] : null, ["Teléfono", selected.phone], ["Correo Electrónico", selected.email], ["Empresa", selected.company], ["Total Visitas", String(selected.visits)], ["Última Visita", selected.lastVisit], ["Estado", selected.status]].filter((row): row is [string, string] => row !== null).map(([k, val]) => (
                  <div key={k} className="rounded-xl p-3" style={{ background: "#F8FAFC" }}>
                    <p className="text-xs mb-0.5" style={{ color: "#5A7099" }}>{k}</p>
                    <p className="font-semibold text-sm" style={{ color: "#0D1B3E" }}>{val}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setHistoryVisitor(selected)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold border" style={{ borderColor: "#D1DDED", color: "#5A7099" }}>
                  Ver Historial
                </button>
                <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: selected.status === "Activo" ? "#DC2626" : "#00A651" }}>
                  {selected.status === "Activo" ? "Bloquear" : "Activar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {historyVisitor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#D1DDED" }}>
              <div>
                <h2 className="font-bold text-base" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>Historial de Visitas</h2>
                <p className="text-xs" style={{ color: "#5A7099" }}>{historyVisitor.name} · {historyVisitor.visits} visitas totales</p>
              </div>
              <button onClick={() => setHistoryVisitor(null)}>
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#5A7099" }}>close</span>
              </button>
            </div>
            <div className="p-6 space-y-3 max-h-[70vh] overflow-y-auto">
              {historyVisitor.history.map((h) => (
                <div key={h.id} className="rounded-xl border p-4" style={{ borderColor: "#D1DDED" }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#00A651" }}>event</span>
                      <span className="text-sm font-semibold" style={{ color: "#0D1B3E" }}>{h.date}</span>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "#E8EFF8", color: "#00A651" }}>{h.carnet}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div><p style={{ color: "#5A7099" }}>Entrada</p><p className="font-semibold" style={{ color: "#0D1B3E" }}>{h.entry}</p></div>
                    <div><p style={{ color: "#5A7099" }}>Salida</p><p className="font-semibold" style={{ color: "#0D1B3E" }}>{h.exit}</p></div>
                    <div><p style={{ color: "#5A7099" }}>Piso</p><p className="font-semibold" style={{ color: "#0D1B3E" }}>{h.piso}</p></div>
                    <div><p style={{ color: "#5A7099" }}>Persona a quien visita</p><p className="font-semibold" style={{ color: "#0D1B3E" }}>{h.host}</p></div>
                    <div><p style={{ color: "#5A7099" }}>Departamento</p><p className="font-semibold" style={{ color: "#0D1B3E" }}>{h.dept}</p></div>
                    {h.gerencia && (
                      <div><p style={{ color: "#5A7099" }}>Gerencia</p><p className="font-semibold" style={{ color: "#0D1B3E" }}>{h.gerencia}</p></div>
                    )}
                    <div className="col-span-3"><p style={{ color: "#5A7099" }}>Motivo</p><p className="font-semibold" style={{ color: "#0D1B3E" }}>{h.purpose}</p></div>
                    {h.equipment && (
                      <div className="col-span-3 rounded-lg px-3 py-2 flex items-center gap-2" style={{ background: "#E8F5EE" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#00A651" }}>work</span>
                        <span style={{ color: "#00A651" }}>Trajo equipo: {h.equipment}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {historyVisitor.history.length === 0 && (
                <p className="text-sm text-center py-10" style={{ color: "#5A7099" }}>Sin historial de visitas registrado.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
