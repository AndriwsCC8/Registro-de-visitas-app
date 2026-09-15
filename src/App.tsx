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

export type View = "dashboard" | "visits" | "visitors" | "reports" | "users" | "config" | "notifications" | "recepciones";

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

  const canViewRecepciones = ["Administrador", "Supervisor", "Recepcionista"].includes(user.role) || user.permissions.includes("recepciones");

  const renderView = () => {
    switch (view) {
      case "dashboard": return <Dashboard />;
      case "visits": return <VisitRegistry user={user} />;
      case "visitors": return <Visitors user={user} />;
      case "reports": return <Reports />;
      case "users": return <UserManagement />;
      case "config": return <Configuration />;
      case "notifications": return <Notifications />;
      case "recepciones": return canViewRecepciones ? <Recepciones /> : <Dashboard />;
    }
  };

  return (
    <div className="flex h-full bg-[#F0F4F9] overflow-hidden">
      <Sidebar view={view} setView={setView} open={sidebarOpen} canViewRecepciones={canViewRecepciones} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header view={view} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} onLogout={() => setUser(null)} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
