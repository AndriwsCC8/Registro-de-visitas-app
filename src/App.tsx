import { useState } from "react";
import Dashboard from "./components/Dashboard";
import VisitRegistry from "./components/VisitRegistry";
import Visitors from "./components/Visitors";
import Reports from "./components/Reports";
import UserManagement from "./components/UserManagement";
import Configuration from "./components/Configuration";
import Notifications from "./components/Notifications";
import Recepciones from "./components/Recepciones";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Login from "./components/Login";
import { can, canAccessView } from "./permissions";

export type View = "dashboard" | "visits" | "visitors" | "reports" | "users" | "config" | "notifications" | "recepciones";

const viewLabels: Record<View, true> = { dashboard: true, visits: true, visitors: true, reports: true, users: true, config: true, notifications: true, recepciones: true };

export interface AppUser {
  name: string;
  role: string;
  branch: string;
  permissions: string[];
}

export default function App() {
  const [view, setView] = useState<View>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<AppUser | null>(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const allowedViews = (Object.keys(viewLabels) as View[]).filter((v) => canAccessView(user, v));
  // Una vista restringida nunca se renderiza, aunque se haya activado desde la navegación.
  const currentView: View = allowedViews.includes(view) ? view : "dashboard";
  const navigate = (v: View) => setView(canAccessView(user, v) ? v : "dashboard");

  const renderView = () => {
    switch (currentView) {
      case "dashboard": return <Dashboard />;
      case "visits": return <VisitRegistry user={user} />;
      case "visitors": return <Visitors user={user} />;
      case "reports": return <Reports canExport={can(user, "Exportar Reportes")} />;
      case "users": return <UserManagement />;
      case "config": return <Configuration />;
      case "notifications": return <Notifications />;
      case "recepciones": return <Recepciones canManageUsers={can(user, "Gestionar Usuarios")} />;
    }
  };

  return (
    <div className="flex h-full bg-[#F0F4F9] overflow-hidden">
      <Sidebar view={currentView} setView={navigate} open={sidebarOpen} allowedViews={allowedViews} user={user} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header view={currentView} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} onLogout={() => { setUser(null); setView("dashboard"); }} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
