import { useState } from "react";
import { BarChart, HBarChart, LineChart } from "./Charts";

const monthlyData = [
  { mes: "Abr", entradas: 820, salidas: 810, promedio: 27 },
  { mes: "May", entradas: 940, salidas: 930, promedio: 30 },
  { mes: "Jun", entradas: 870, salidas: 860, promedio: 29 },
  { mes: "Jul", entradas: 1020, salidas: 1005, promedio: 33 },
  { mes: "Ago", entradas: 980, salidas: 975, promedio: 32 },
  { mes: "Sep", entradas: 1150, salidas: 1100, promedio: 38 },
];

const deptData = [
  { dept: "Área Médica", visitas: 412 },
  { dept: "Administración", visitas: 287 },
  { dept: "Dirección", visitas: 156 },
  { dept: "TI", visitas: 134 },
  { dept: "RRHH", visitas: 98 },
  { dept: "Finanzas", visitas: 73 },
];

const hourlyData = [
  { hora: "7am", visitas: 12 },
  { hora: "8am", visitas: 45 },
  { hora: "9am", visitas: 68 },
  { hora: "10am", visitas: 72 },
  { hora: "11am", visitas: 55 },
  { hora: "12pm", visitas: 30 },
  { hora: "1pm", visitas: 28 },
  { hora: "2pm", visitas: 60 },
  { hora: "3pm", visitas: 65 },
  { hora: "4pm", visitas: 48 },
  { hora: "5pm", visitas: 22 },
  { hora: "6pm", visitas: 8 },
];

const reportList = [
  { name: "Reporte Mensual - Agosto 2026", type: "PDF", size: "1.2 MB", date: "01 Sep 2026", status: "Disponible" },
  { name: "Estadísticas de Visitas - Q2 2026", type: "Excel", size: "842 KB", date: "01 Jul 2026", status: "Disponible" },
  { name: "Visitantes Frecuentes - Semana 36", type: "PDF", size: "380 KB", date: "07 Sep 2026", status: "Disponible" },
  { name: "Reporte de Incidentes - Agosto 2026", type: "PDF", size: "215 KB", date: "02 Sep 2026", status: "Disponible" },
  { name: "Reporte Anual 2025", type: "Excel", size: "4.1 MB", date: "15 Ene 2026", status: "Disponible" },
];

export default function Reports() {
  const [tab, setTab] = useState<"graficas" | "reportes">("graficas");
  const [period, setPeriod] = useState("Sep 2026");

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 rounded-xl p-1 bg-white border" style={{ borderColor: "#D1DDED" }}>
          {(["graficas", "reportes"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: tab === t ? "#00A651" : "transparent",
                color: tab === t ? "#fff" : "#5A7099",
              }}
            >
              {t === "graficas" ? "Gráficas y Análisis" : "Reportes Generados"}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-3 py-2 rounded-xl border text-sm outline-none"
            style={{ borderColor: "#D1DDED", color: "#0D1B3E" }}
          >
            <option>Sep 2026</option>
            <option>Ago 2026</option>
            <option>Jul 2026</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#00A651" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span>
            Exportar
          </button>
        </div>
      </div>

      {tab === "graficas" && (
        <div className="space-y-4">
          {/* KPIs */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Total Visitas (Sep)", value: "1,150", sub: "vs. 980 ago", up: true },
              { label: "Promedio Diario", value: "38", sub: "vs. 32 ago", up: true },
              { label: "Tiempo Prom. Visita", value: "1h 22m", sub: "vs. 1h 35m ago", up: false },
              { label: "Visitantes Únicos", value: "642", sub: "vs. 581 ago", up: true },
            ].map((k) => (
              <div key={k.label} className="bg-white rounded-2xl p-4 border" style={{ borderColor: "#D1DDED" }}>
                <p className="text-xs mb-1" style={{ color: "#5A7099" }}>{k.label}</p>
                <p className="text-2xl font-extrabold" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>{k.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: k.up ? "#00A651" : "#F59E0B" }}>
                    {k.up ? "trending_up" : "trending_down"}
                  </span>
                  <span className="text-xs" style={{ color: k.up ? "#00A651" : "#F59E0B" }}>{k.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Area + Bar */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: "#D1DDED" }}>
              <h3 className="font-bold text-sm mb-4" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>Tendencia Mensual (Entradas)</h3>
              <LineChart data={monthlyData.map((d) => ({ label: d.mes, value: d.entradas }))} color="#00A651" height={200} fill />
            </div>

            <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: "#D1DDED" }}>
              <h3 className="font-bold text-sm mb-4" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>Visitas por Departamento</h3>
              <HBarChart data={deptData.map((d) => ({ label: d.dept, value: d.visitas }))} color="#00A651" height={200} />
            </div>
          </div>

          {/* Hourly */}
          <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: "#D1DDED" }}>
            <h3 className="font-bold text-sm mb-4" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>Flujo de Visitas por Hora del Día</h3>
            <LineChart data={hourlyData.map((d) => ({ label: d.hora, value: d.visitas }))} color="#00A651" height={160} />
          </div>
        </div>
      )}

      {tab === "reportes" && (
        <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#D1DDED" }}>
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "#D1DDED" }}>
            <h3 className="font-bold" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>Reportes Disponibles</h3>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#00A651" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 17 }}>add</span>
              Generar Reporte
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ background: "#F8FAFC" }}>
                {["Nombre", "Tipo", "Tamaño", "Fecha", "Estado", "Acción"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold" style={{ color: "#5A7099" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reportList.map((r, i) => (
                <tr key={i} className="border-t" style={{ borderColor: "#F0F4F9" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FAFC")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined" style={{ fontSize: 20, color: r.type === "PDF" ? "#DC2626" : "#16A34A" }}>
                        {r.type === "PDF" ? "picture_as_pdf" : "table_chart"}
                      </span>
                      <span className="text-sm font-medium" style={{ color: "#0D1B3E" }}>{r.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ background: r.type === "PDF" ? "#FEE2E2" : "#E8F5EE", color: r.type === "PDF" ? "#DC2626" : "#00A651" }}>{r.type}</span>
                  </td>
                  <td className="px-5 py-3 text-sm" style={{ color: "#5A7099" }}>{r.size}</td>
                  <td className="px-5 py-3 text-sm" style={{ color: "#5A7099" }}>{r.date}</td>
                  <td className="px-5 py-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "#E8F5EE", color: "#00A651" }}>{r.status}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-[#E8EFF8] transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#00A651" }}>download</span>
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-[#E8EFF8] transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#5A7099" }}>share</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
