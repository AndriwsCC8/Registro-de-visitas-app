import { useState } from "react";
import { BarChart, LineChart, DonutChart } from "./Charts";

const weeklyData = [
  { day: "Lun", visitas: 42 },
  { day: "Mar", visitas: 58 },
  { day: "Mié", visitas: 35 },
  { day: "Jue", visitas: 67 },
  { day: "Vie", visitas: 54 },
  { day: "Sáb", visitas: 22 },
  { day: "Dom", visitas: 8 },
];

const monthlyData = [
  { mes: "Abr", visitas: 820 },
  { mes: "May", visitas: 940 },
  { mes: "Jun", visitas: 870 },
  { mes: "Jul", visitas: 1020 },
  { mes: "Ago", visitas: 980 },
  { mes: "Sep", visitas: 1150 },
];

const purposeData = [
  { name: "Consulta Médica", value: 38, color: "#00A651" },
  { name: "Administrativo", value: 24, color: "#00A651" },
  { name: "Entrega Docs.", value: 18, color: "#1A5BA8" },
  { name: "Visita Personal", value: 12, color: "#00C462" },
  { name: "Otros", value: 8, color: "#5A7099" },
];

const recentVisits = [
  { id: "V-00234", name: "Carlos Rodríguez", cedula: "001-1234567-8", host: "Dr. Pérez", time: "09:14 AM", status: "Activa", dept: "Médico" },
  { id: "V-00233", name: "María González", cedula: "002-9876543-1", host: "Lic. Martínez", time: "09:02 AM", status: "Activa", dept: "Admin" },
  { id: "V-00232", name: "Pedro Jiménez", cedula: "001-5556677-4", host: "Ing. Sánchez", time: "08:47 AM", status: "Completada", dept: "TI" },
  { id: "V-00231", name: "Lucia Fernández", cedula: "001-3334455-2", host: "Dr. Vargas", time: "08:35 AM", status: "Completada", dept: "Médico" },
  { id: "V-00230", name: "Juan Herrera", cedula: "002-7778899-5", host: "Lic. Torres", time: "08:20 AM", status: "Completada", dept: "RRHH" },
];

const alerts = [
  { type: "warning", msg: "Visita pendiente de aprobación: José Ramírez (Piso 4)", time: "hace 5 min" },
  { type: "info", msg: "Nuevo empleado registrado: Ing. Carmen López", time: "hace 22 min" },
  { type: "success", msg: "Reporte mensual generado exitosamente", time: "hace 1 hora" },
];

function StatCard({ icon, label, value, change, color }: { icon: string; label: string; value: string; change: string; color: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col gap-3 shadow-sm border" style={{ borderColor: "#D1DDED" }}>
      <div className="flex items-start justify-between">
        <div
          className="flex items-center justify-center rounded-xl"
          style={{ width: 44, height: 44, background: color + "18" }}
        >
          <span className="material-symbols-outlined" style={{ color, fontSize: 22 }}>{icon}</span>
        </div>
        <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: "#E8F5EE", color: "#00A651" }}>
          {change}
        </span>
      </div>
      <div>
        <p className="text-2xl font-extrabold" style={{ color: "#0D1B3E", fontFamily: "Nunito, sans-serif" }}>{value}</p>
        <p className="text-sm" style={{ color: "#5A7099" }}>{label}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [chartPeriod, setChartPeriod] = useState<"semana" | "mes">("semana");

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <StatCard icon="badge" label="Visitas Hoy" value="286" change="+12%" color="#00A651" />
        <StatCard icon="how_to_reg" label="En Instalaciones" value="47" change="+5" color="#00A651" />
        <StatCard icon="pending_actions" label="Pendientes" value="8" change="-2" color="#F59E0B" />
        <StatCard icon="groups" label="Visitantes Reg." value="1,842" change="+34 mes" color="#00A651" />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 320px" }}>
        {/* Bar / Line chart */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border" style={{ borderColor: "#D1DDED" }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-base" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>Visitas por Período</h3>
            <div className="flex gap-1 rounded-xl p-1" style={{ background: "#F0F4F9" }}>
              {(["semana", "mes"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setChartPeriod(p)}
                  className="px-3 py-1 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: chartPeriod === p ? "#00A651" : "transparent",
                    color: chartPeriod === p ? "#fff" : "#5A7099",
                  }}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div style={{ height: 200 }}>
            {chartPeriod === "semana"
              ? <BarChart data={weeklyData.map((d) => ({ label: d.day, value: d.visitas }))} height={180} />
              : <LineChart data={monthlyData.map((d) => ({ label: d.mes, value: d.visitas }))} height={180} />}
          </div>
        </div>

        {/* Pie chart */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border" style={{ borderColor: "#D1DDED" }}>
          <h3 className="font-bold text-base mb-4" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>Motivo de Visita</h3>
          <div className="flex justify-center">
            <DonutChart data={purposeData} size={140} />
          </div>
          <div className="space-y-1.5 mt-2">
            {purposeData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                  <span style={{ color: "#5A7099" }}>{d.name}</span>
                </div>
                <span className="font-semibold" style={{ color: "#0D1B3E" }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 320px" }}>
        {/* Recent visits */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden" style={{ borderColor: "#D1DDED" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#D1DDED" }}>
            <h3 className="font-bold text-base" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>Visitas Recientes</h3>
            <span className="text-xs font-semibold" style={{ color: "#00A651", cursor: "pointer" }}>Ver todas →</span>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ background: "#F8FAFC" }}>
                {["ID", "Visitante", "Cédula", "Persona a quien visita", "Hora", "Estado"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "#5A7099" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentVisits.map((v, i) => (
                <tr key={v.id} className="border-t transition-colors" style={{ borderColor: "#F0F4F9" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FAFC")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td className="px-4 py-3 text-xs font-mono" style={{ color: "#5A7099" }}>{v.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex items-center justify-center rounded-full text-white text-xs font-bold shrink-0"
                        style={{ width: 28, height: 28, background: i % 2 === 0 ? "#00A651" : "#00A651" }}
                      >
                        {v.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <span className="text-sm font-medium" style={{ color: "#0D1B3E" }}>{v.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono" style={{ color: "#5A7099" }}>{v.cedula}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: "#0D1B3E" }}>{v.host}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#5A7099" }}>{v.time}</td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: v.status === "Activa" ? "#E8F5EE" : "#F0F4F9",
                        color: v.status === "Activa" ? "#00A651" : "#5A7099",
                      }}
                    >
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border" style={{ borderColor: "#D1DDED" }}>
          <h3 className="font-bold text-base mb-4" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>Alertas y Actividad</h3>
          <div className="space-y-3">
            {alerts.map((a, i) => {
              const colors = { warning: { bg: "#FEF3C7", icon: "#F59E0B", ic: "warning" }, info: { bg: "#EFF6FF", icon: "#00A651", ic: "info" }, success: { bg: "#E8F5EE", icon: "#00A651", ic: "check_circle" } };
              const c = colors[a.type as keyof typeof colors];
              return (
                <div key={i} className="flex gap-3 rounded-xl p-3" style={{ background: c.bg }}>
                  <span className="material-symbols-outlined shrink-0 mt-0.5" style={{ fontSize: 18, color: c.icon }}>{c.ic}</span>
                  <div>
                    <p className="text-xs leading-snug" style={{ color: "#0D1B3E" }}>{a.msg}</p>
                    <p className="text-xs mt-1" style={{ color: "#5A7099" }}>{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t" style={{ borderColor: "#D1DDED" }}>
            <p className="text-xs font-semibold mb-3" style={{ color: "#5A7099" }}>Ocupación por Área</p>
            {[
              { area: "Área Médica", val: 78, color: "#00A651" },
              { area: "Administración", val: 45, color: "#00A651" },
              { area: "Tecnología", val: 30, color: "#1A5BA8" },
            ].map((r) => (
              <div key={r.area} className="mb-2.5">
                <div className="flex justify-between mb-1">
                  <span className="text-xs" style={{ color: "#5A7099" }}>{r.area}</span>
                  <span className="text-xs font-semibold" style={{ color: "#0D1B3E" }}>{r.val}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "#E8EFF8" }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${r.val}%`, background: r.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
