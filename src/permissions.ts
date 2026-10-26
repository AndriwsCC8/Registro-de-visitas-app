// Permisos simulados para el modo demostración; no corresponden a autorización real del backend.
export const rolePermissions: Record<string, string[]> = {
  Administrador: ["Ver Dashboard", "Registrar Visitas", "Gestionar Visitantes", "Ver Reportes", "Exportar Reportes", "Gestionar Usuarios", "Configurar Sistema", "Ver Logs de Auditoría"],
  Supervisor: ["Ver Dashboard", "Registrar Visitas", "Gestionar Visitantes", "Ver Reportes", "Exportar Reportes"],
  Recepcionista: ["Ver Dashboard", "Registrar Visitas", "Gestionar Visitantes"],
  Seguridad: ["Ver Dashboard", "Registrar Visitas", "Ver Visitantes"],
  Auditor: ["Ver Dashboard", "Ver Reportes", "Exportar Reportes", "Ver Logs de Auditoría"],
  "Solo Lectura": ["Ver Dashboard", "Ver Reportes"],
};

export function can(user: { permissions: string[] }, permission: string) {
  return user.permissions.includes(permission);
}

// null = visible para cualquier perfil.
const viewRules: Record<string, (user: { role: string; permissions: string[] }) => boolean> = {
  dashboard: (u) => can(u, "Ver Dashboard"),
  visits: (u) => can(u, "Registrar Visitas"),
  visitors: (u) => can(u, "Gestionar Visitantes") || can(u, "Ver Visitantes"),
  reports: (u) => can(u, "Ver Reportes"),
  users: (u) => can(u, "Gestionar Usuarios"),
  config: (u) => can(u, "Configurar Sistema"),
  notifications: () => true,
  recepciones: (u) => ["Administrador", "Supervisor", "Recepcionista"].includes(u.role) || can(u, "recepciones"),
};

export function canAccessView(user: { role: string; permissions: string[] }, view: string) {
  return viewRules[view]?.(user) ?? false;
}
