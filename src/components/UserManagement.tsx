import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  dept: string;
  lastLogin: string;
  status: "Activo" | "Inactivo" | "Suspendido";
  avatar: string;
}

const roles = ["Administrador", "Supervisor", "Recepcionista", "Seguridad", "Auditor", "Solo Lectura"];
const depts = ["Administración", "Seguridad", "Operaciones", "TI", "RRHH", "Finanzas"];

const roleColors: Record<string, { bg: string; color: string }> = {
  Administrador: { bg: "#EFF6FF", color: "#00A651" },
  Supervisor: { bg: "#E8F5EE", color: "#00A651" },
  Recepcionista: { bg: "#FEF3C7", color: "#F59E0B" },
  Seguridad: { bg: "#FEE2E2", color: "#DC2626" },
  Auditor: { bg: "#F3E8FF", color: "#7C3AED" },
  "Solo Lectura": { bg: "#F1F5F9", color: "#5A7099" },
};

const permissions: Record<string, string[]> = {
  Administrador: ["Ver Dashboard", "Registrar Visitas", "Gestionar Visitantes", "Ver Reportes", "Exportar Reportes", "Gestionar Usuarios", "Configurar Sistema", "Ver Logs de Auditoría"],
  Supervisor: ["Ver Dashboard", "Registrar Visitas", "Gestionar Visitantes", "Ver Reportes", "Exportar Reportes"],
  Recepcionista: ["Ver Dashboard", "Registrar Visitas", "Gestionar Visitantes"],
  Seguridad: ["Ver Dashboard", "Registrar Visitas", "Ver Visitantes"],
  Auditor: ["Ver Dashboard", "Ver Reportes", "Exportar Reportes", "Ver Logs de Auditoría"],
  "Solo Lectura": ["Ver Dashboard", "Ver Reportes"],
};

const users: User[] = [
  { id: "USR-001", name: "Ana Martínez", email: "a.martinez@senasa.gob.do", role: "Administrador", dept: "Administración", lastLogin: "Hoy 09:14", status: "Activo", avatar: "AM" },
  { id: "USR-002", name: "Roberto Díaz", email: "r.diaz@senasa.gob.do", role: "Supervisor", dept: "Operaciones", lastLogin: "Hoy 08:45", status: "Activo", avatar: "RD" },
  { id: "USR-003", name: "Carmen López", email: "c.lopez@senasa.gob.do", role: "Recepcionista", dept: "Administración", lastLogin: "Hoy 08:00", status: "Activo", avatar: "CL" },
  { id: "USR-004", name: "Miguel Vargas", email: "m.vargas@senasa.gob.do", role: "Seguridad", dept: "Seguridad", lastLogin: "Ayer 16:30", status: "Activo", avatar: "MV" },
  { id: "USR-005", name: "Patricia Santos", email: "p.santos@senasa.gob.do", role: "Auditor", dept: "Finanzas", lastLogin: "08 Sep", status: "Activo", avatar: "PS" },
  { id: "USR-006", name: "José Reyes", email: "j.reyes@senasa.gob.do", role: "Recepcionista", dept: "Operaciones", lastLogin: "05 Sep", status: "Inactivo", avatar: "JR" },
  { id: "USR-007", name: "Laura Castillo", email: "l.castillo@senasa.gob.do", role: "Solo Lectura", dept: "RRHH", lastLogin: "01 Sep", status: "Suspendido", avatar: "LC" },
];

export default function UserManagement() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [tab, setTab] = useState<"usuarios" | "roles">("usuarios");
  const [search, setSearch] = useState("");
  const [showNewUserModal, setShowNewUserModal] = useState(false);

  const filtered = users.filter((u) =>
    !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search)
  );

  return (
    <div className="space-y-5">
      {showNewUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl mx-4 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#D1DDED", background: "#00A651" }}>
              <h2 className="text-white font-bold text-base" style={{ fontFamily: "Nunito" }}>Crear Nuevo Usuario</h2>
              <button onClick={() => setShowNewUserModal(false)}>
                <span className="material-symbols-outlined text-white/70" style={{ fontSize: 22 }}>close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "#5A7099" }}>Nombre Completo</label>
                  <input placeholder="Ej. Juana Pérez" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none" style={{ borderColor: "#D1DDED", color: "#0D1B3E" }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "#5A7099" }}>Correo</label>
                  <input placeholder="usuario@senasa.gob.do" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none" style={{ borderColor: "#D1DDED", color: "#0D1B3E" }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "#5A7099" }}>Rol</label>
                  <select className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none" style={{ borderColor: "#D1DDED", color: "#0D1B3E" }}>
                    {roles.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "#5A7099" }}>Departamento</label>
                  <select className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none" style={{ borderColor: "#D1DDED", color: "#0D1B3E" }}>
                    {depts.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "#5A7099" }}>Contraseña</label>
                <input type="password" placeholder="Ingrese una contraseña" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none" style={{ borderColor: "#D1DDED", color: "#0D1B3E" }} />
              </div>
              <div className="rounded-xl p-3" style={{ background: "#F8FAFC" }}>
                
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t" style={{ borderColor: "#D1DDED" }}>
              <button onClick={() => setShowNewUserModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold border" style={{ borderColor: "#D1DDED", color: "#5A7099" }}>
                Cancelar
              </button>
              <button onClick={() => setShowNewUserModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "#00A651" }}>
                Crear Usuario
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 rounded-xl p-1 bg-white border" style={{ borderColor: "#D1DDED" }}>
          {(["usuarios", "roles"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{ background: tab === t ? "#00A651" : "transparent", color: tab === t ? "#fff" : "#5A7099" }}
            >
              {t === "usuarios" ? "Usuarios" : "Roles y Permisos"}
            </button>
          ))}
        </div>
        {tab === "usuarios" && (
          <div className="flex items-center gap-3">
            <div className="relative">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar usuario..."
                className="pl-8 pr-4 py-2 rounded-xl text-sm border outline-none"
                style={{ borderColor: "#D1DDED", background: "#fff", width: 200 }} />
              <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2" style={{ fontSize: 17, color: "#5A7099" }}>search</span>
            </div>
            <button onClick={() => setShowNewUserModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#00A651" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
              Nuevo Usuario
            </button>
          </div>
        )}
      </div>

      {tab === "usuarios" && (
        <div className="grid gap-4" style={{ gridTemplateColumns: selectedUser ? "1fr 360px" : "1fr" }}>
          <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#D1DDED" }}>
            <table className="w-full">
              <thead>
                <tr style={{ background: "#F8FAFC" }}>
                  {["Usuario", "Correo", "Rol", "Departamento", "Último Acceso", "Estado", ""].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "#5A7099" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => {
                  const rc = roleColors[u.role];
                  const sc = { Activo: { bg: "#E8F5EE", c: "#00A651" }, Inactivo: { bg: "#F0F4F9", c: "#5A7099" }, Suspendido: { bg: "#FEE2E2", c: "#DC2626" } }[u.status];
                  return (
                    <tr key={u.id} className="border-t cursor-pointer transition-colors" style={{ borderColor: "#F0F4F9", background: selectedUser?.id === u.id ? "#F0F6FF" : "transparent" }}
                      onMouseEnter={(e) => { if (selectedUser?.id !== u.id) e.currentTarget.style.background = "#F8FAFC"; }}
                      onMouseLeave={(e) => { if (selectedUser?.id !== u.id) e.currentTarget.style.background = "transparent"; }}
                      onClick={() => setSelectedUser(selectedUser?.id === u.id ? null : u)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center rounded-full text-white text-sm font-bold shrink-0"
                            style={{ width: 36, height: 36, background: u.role === "Administrador" ? "#00A651" : u.role === "Supervisor" ? "#00A651" : "#5A7099" }}>
                            {u.avatar}
                          </div>
                          <p className="text-sm font-semibold" style={{ color: "#0D1B3E" }}>{u.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm" style={{ color: "#5A7099" }}>{u.email}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: rc.bg, color: rc.color }}>{u.role}</span>
                      </td>
                      <td className="px-4 py-3 text-sm" style={{ color: "#5A7099" }}>{u.dept}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: "#5A7099" }}>{u.lastLogin}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: sc.bg, color: sc.c }}>{u.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-[#E8EFF8]" onClick={(e) => e.stopPropagation()}>
                            <span className="material-symbols-outlined" style={{ fontSize: 17, color: "#5A7099" }}>edit</span>
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-[#FEE2E2]" onClick={(e) => e.stopPropagation()}>
                            <span className="material-symbols-outlined" style={{ fontSize: 17, color: "#DC2626" }}>delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Detail panel */}
          {selectedUser && (
            <div className="bg-white rounded-2xl border p-5 space-y-4" style={{ borderColor: "#D1DDED" }}>
              <div className="flex items-center justify-between">
                <h3 className="font-bold" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>Detalle de Usuario</h3>
                <button onClick={() => setSelectedUser(null)}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#5A7099" }}>close</span>
                </button>
              </div>
              <div className="flex flex-col items-center py-4 border-b" style={{ borderColor: "#F0F4F9" }}>
                <div className="flex items-center justify-center rounded-full text-white font-bold text-2xl mb-2"
                  style={{ width: 64, height: 64, background: "#00A651" }}>
                  {selectedUser.avatar}
                </div>
                <p className="font-bold text-base" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>{selectedUser.name}</p>
                <p className="text-sm" style={{ color: "#5A7099" }}>{selectedUser.email}</p>
                <span className="mt-2 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: roleColors[selectedUser.role].bg, color: roleColors[selectedUser.role].color }}>
                  {selectedUser.role}
                </span>
              </div>

              <div>
                <p className="text-xs font-semibold mb-3" style={{ color: "#5A7099" }}>PERMISOS ASIGNADOS</p>
                <div className="space-y-2">
                  {(permissions[selectedUser.role] || []).map((p) => (
                    <div key={p} className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: "#F0F4F9" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#00A651" }}>check_circle</span>
                      <span className="text-xs" style={{ color: "#0D1B3E" }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "#00A651" }}>
                Editar Usuario
              </button>
            </div>
          )}
        </div>
      )}

      {tab === "roles" && (
        <div className="grid grid-cols-3 gap-4">
          {roles.map((role) => {
            const rc = roleColors[role];
            const perms = permissions[role] || [];
            const userCount = users.filter((u) => u.role === role).length;
            return (
              <div key={role} className="bg-white rounded-2xl border p-5" style={{ borderColor: "#D1DDED" }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: rc.bg, color: rc.color }}>{role}</span>
                    <p className="mt-2 text-sm" style={{ color: "#5A7099" }}>{userCount} usuario{userCount !== 1 ? "s" : ""}</p>
                  </div>
                  <button className="p-1.5 rounded-lg hover:bg-[#E8EFF8]">
                    <span className="material-symbols-outlined" style={{ fontSize: 17, color: "#5A7099" }}>edit</span>
                  </button>
                </div>
                <div className="space-y-1.5">
                  {perms.map((p) => (
                    <div key={p} className="flex items-center gap-2 text-xs">
                      <span className="material-symbols-outlined shrink-0" style={{ fontSize: 14, color: "#00A651" }}>check</span>
                      <span style={{ color: "#5A7099" }}>{p}</span>
                    </div>
                  ))}
                  {["Ver Dashboard", "Registrar Visitas", "Gestionar Visitantes", "Ver Reportes", "Exportar Reportes", "Gestionar Usuarios", "Configurar Sistema", "Ver Logs de Auditoría"]
                    .filter((p) => !perms.includes(p))
                    .map((p) => (
                      <div key={p} className="flex items-center gap-2 text-xs opacity-40">
                        <span className="material-symbols-outlined shrink-0" style={{ fontSize: 14, color: "#DC2626" }}>close</span>
                        <span style={{ color: "#5A7099" }}>{p}</span>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
