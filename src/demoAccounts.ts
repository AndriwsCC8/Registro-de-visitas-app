// SOLO DEMOSTRACIÓN: credenciales ficticias; no usar en producción ni reutilizar contraseñas reales.
import type { AppUser } from "./App";
import { rolePermissions } from "./permissions";

const demoAccounts: Record<string, { password: string; role: string }> = {
  "admin.demo": { password: "Admin-Demo-01", role: "Administrador" },
  "supervisor.demo": { password: "Super-Demo-02", role: "Supervisor" },
  "recepcion.demo": { password: "Recep-Demo-03", role: "Recepcionista" },
  "seguridad.demo": { password: "Segur-Demo-04", role: "Seguridad" },
  "auditor.demo": { password: "Audit-Demo-05", role: "Auditor" },
  "lectura.demo": { password: "Lectu-Demo-06", role: "Solo Lectura" },
};

export function authenticateDemo(username: string, password: string): AppUser | null {
  const name = username.trim();
  const account = Object.prototype.hasOwnProperty.call(demoAccounts, name) ? demoAccounts[name] : undefined;
  if (!account || account.password !== password) return null;
  return { name, role: account.role, branch: "Sede Central", permissions: [...rolePermissions[account.role]] };
}
