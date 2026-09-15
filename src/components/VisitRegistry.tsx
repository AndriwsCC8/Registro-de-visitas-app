import { useState } from "react";
import type { AppUser } from "../App";

type Status = "Activa" | "Completada" | "Cancelada" | "Pendiente";

interface Visit {
  id: string;
  name: string;
  cedula: string;
  phone: string;
  host: string;
  gerencia?: string;
  dept: string;
  purpose: string;
  purposeDetail?: string;
  piso: string;
  carnet: string;
  equipment?: string;
  entry: string;
  exit: string;
  status: Status;
  notes?: string;
  branch: string;
}

// Solo la Sede Central (Av. 27 de Febrero) y la sede de Naco tienen gerencias internas; las demás sucursales operan como gerencias independientes.
const GERENCIA_BRANCHES = ["Sede Central", "Naco"];

const gerencias = [
  "Gerencia General",
  "Gerencia de Salud",
  "Gerencia Administrativa y Financiera",
  "Gerencia de Tecnología de la Información",
  "Gerencia Legal",
  "Gerencia de Servicios al Afiliado",
  "Gerencia de Planificación y Desarrollo",
];

const pisos = ["Piso 1", "Piso 2", "Piso 3", "Piso 4"];
const equipmentOptions = ["Laptop", "Proyector", "Tablet", "Cámara Fotográfica", "Disco Duro Externo", "Herramientas", "Otro"];

const initialVisits: Visit[] = [
  { id: "V-00234", name: "Carlos Rodríguez", cedula: "001-1234567-8", phone: "809-555-0101", host: "Dr. Pérez", gerencia: "Gerencia de Salud", dept: "Área Médica", purpose: "Consulta Médica", piso: "Piso 2", carnet: "C-042", equipment: "Laptop Dell", entry: "09:14", exit: "--", status: "Activa", branch: "Sede Central" },
  { id: "V-00233", name: "María González", cedula: "002-9876543-1", phone: "829-555-0202", host: "Lic. Martínez", dept: "Administración", purpose: "Administrativo", piso: "Piso 1", carnet: "C-041", entry: "09:02", exit: "--", status: "Activa", branch: "Sucursal Norte" },
  { id: "V-00232", name: "Pedro Jiménez", cedula: "001-5556677-4", phone: "849-555-0303", host: "Ing. Sánchez", gerencia: "Gerencia de Tecnología de la Información", dept: "TI", purpose: "Soporte Técnico", piso: "Piso 3", carnet: "C-040", equipment: "Maletín de herramientas de red", entry: "08:47", exit: "10:15", status: "Completada", branch: "Sede Central" },
  { id: "V-00231", name: "Lucía Fernández", cedula: "001-3334455-2", phone: "809-555-0404", host: "Dr. Vargas", gerencia: "Gerencia de Salud", dept: "Área Médica", purpose: "Consulta Médica", piso: "Piso 2", carnet: "C-039", entry: "08:35", exit: "09:55", status: "Completada", branch: "Sede Central" },
  { id: "V-00230", name: "Juan Herrera", cedula: "002-7778899-5", phone: "829-555-0505", host: "Lic. Torres", dept: "RRHH", purpose: "Entrega de Documentos", piso: "Piso 1", carnet: "C-038", entry: "08:20", exit: "08:50", status: "Completada", branch: "Sucursal Norte" },
  { id: "V-00229", name: "Rosa Méndez", cedula: "001-2223334-3", phone: "849-555-0606", host: "Dir. Castro", gerencia: "Gerencia General", dept: "Dirección", purpose: "Reunión", piso: "Piso 4", carnet: "C-037", entry: "08:00", exit: "11:30", status: "Completada", branch: "Sede Central" },
  { id: "V-00228", name: "Andrés Morales", cedula: "002-4445556-7", phone: "809-555-0707", host: "Lic. Reyes", gerencia: "Gerencia Administrativa y Financiera", dept: "Finanzas", purpose: "Auditoría", piso: "Piso 3", carnet: "--", entry: "07:45", exit: "--", status: "Pendiente", branch: "Sede Central" },
];

const statusColors: Record<Status, { bg: string; color: string }> = {
  Activa: { bg: "#E8F5EE", color: "#00A651" },
  Completada: { bg: "#EFF6FF", color: "#00A651" },
  Cancelada: { bg: "#FEE2E2", color: "#DC2626" },
  Pendiente: { bg: "#FEF3C7", color: "#F59E0B" },
};

interface FormData {
  name: string; cedula: string; phone: string; gerencia: string; dept: string; host: string;
  purpose: string; purposeDetail: string; piso: string; carnet: string; notes: string;
  hasEquipment: boolean; equipmentTypes: string[]; equipmentOtherDetail: string;
  laptopBrand: string; laptopModel: string; laptopSerial: string;
}

const empty: FormData = {
  name: "", cedula: "", phone: "", gerencia: "", dept: "", host: "",
  purpose: "", purposeDetail: "", piso: "", carnet: "", notes: "",
  hasEquipment: false, equipmentTypes: [], equipmentOtherDetail: "",
  laptopBrand: "", laptopModel: "", laptopSerial: "",
};
const depts = ["Área Médica", "Administración", "TI", "RRHH", "Finanzas", "Dirección", "Operaciones"];
const purposes = ["Consulta Médica", "Administrativo", "Entrega de Documentos", "Reunión", "Soporte Técnico", "Visita Personal", "Auditoría", "Otro"];

export default function VisitRegistry({ user }: { user: AppUser }) {
  const [visits, setVisits] = useState<Visit[]>(initialVisits);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormData>(empty);
  const [formError, setFormError] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("Todas");
  const [search, setSearch] = useState("");
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

  const showGerencia = GERENCIA_BRANCHES.includes(user.branch);

  const filtered = visits.filter((v) => {
    const matchStatus = filterStatus === "Todas" || v.status === filterStatus;
    const matchSearch = search === "" || v.name.toLowerCase().includes(search.toLowerCase()) || v.cedula.includes(search);
    const matchBranch = user.role === "Administrador" || v.branch === user.branch;
    return matchStatus && matchSearch && matchBranch;
  });

  // Un carnet solo puede reutilizarse una vez se registra la salida de quien lo tenía asignado.
  const isCarnetInUse = (carnet: string) =>
    visits.some((v) => v.carnet === carnet && (v.status === "Activa" || v.status === "Pendiente"));

  const toggleEquipmentType = (type: string) => {
    setForm((prev) => ({
      ...prev,
      equipmentTypes: prev.equipmentTypes.includes(type)
        ? prev.equipmentTypes.filter((t) => t !== type)
        : [...prev.equipmentTypes, type],
    }));
  };

  const buildEquipmentSummary = (f: FormData) => {
    if (!f.hasEquipment || f.equipmentTypes.length === 0) return undefined;
    return f.equipmentTypes
      .map((t) => {
        if (t === "Laptop") return `Laptop (${f.laptopBrand} ${f.laptopModel}, S/N: ${f.laptopSerial})`;
        if (t === "Otro") return f.equipmentOtherDetail ? `Otro: ${f.equipmentOtherDetail}` : "Otro";
        return t;
      })
      .join(", ");
  };

  const closeForm = () => {
    setShowForm(false);
    setForm(empty);
    setFormError("");
  };

  const handleSubmit = () => {
    if (!form.name || !form.cedula || !form.host || !form.carnet || !form.piso || !form.purpose) {
      setFormError("Completa todos los campos obligatorios.");
      return;
    }
    if (showGerencia && !form.gerencia) {
      setFormError("Selecciona la gerencia correspondiente.");
      return;
    }
    if (form.purpose === "Otro" && !form.purposeDetail) {
      setFormError("Especifica el motivo de la visita.");
      return;
    }
    if (isCarnetInUse(form.carnet)) {
      setFormError(`El carnet ${form.carnet} ya está en uso por otra visita activa.`);
      return;
    }
    if (form.hasEquipment) {
      if (form.equipmentTypes.length === 0) {
        setFormError("Selecciona al menos un tipo de equipo.");
        return;
      }
      if (form.equipmentTypes.includes("Laptop") && (!form.laptopBrand || !form.laptopModel || !form.laptopSerial)) {
        setFormError("Para la laptop, indica marca, modelo y serial.");
        return;
      }
      if (form.equipmentTypes.includes("Otro") && !form.equipmentOtherDetail) {
        setFormError("Especifica el otro equipo que trae el visitante.");
        return;
      }
    }
    const newVisit: Visit = {
      id: `V-${String(visits.length + 235).padStart(5, "0")}`,
      name: form.name,
      cedula: form.cedula,
      phone: form.phone,
      host: form.host,
      gerencia: showGerencia ? form.gerencia : undefined,
      dept: form.dept,
      purpose: form.purpose,
      purposeDetail: form.purpose === "Otro" ? form.purposeDetail : undefined,
      piso: form.piso,
      carnet: form.carnet,
      equipment: buildEquipmentSummary(form),
      entry: new Date().toLocaleTimeString("es-DO", { hour: "2-digit", minute: "2-digit" }),
      exit: "--",
      status: "Activa",
      notes: form.notes,
      branch: user.branch,
    };
    setVisits([newVisit, ...visits]);
    closeForm();
  };

  const handleCheckout = (id: string) => {
    setVisits(visits.map((v) => v.id === id ? { ...v, status: "Completada" as Status, exit: new Date().toLocaleTimeString("es-DO", { hour: "2-digit", minute: "2-digit" }) } : v));
    setSelectedVisit(null);
  };

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {["Todas", "Activa", "Pendiente", "Completada", "Cancelada"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: filterStatus === s ? "#00A651" : "#fff",
                color: filterStatus === s ? "#fff" : "#5A7099",
                border: "1px solid",
                borderColor: filterStatus === s ? "#00A651" : "#D1DDED",
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar..."
              className="pl-8 pr-4 py-2 rounded-xl text-sm border outline-none"
              style={{ borderColor: "#D1DDED", background: "#fff", width: 200 }}
            />
            <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2" style={{ fontSize: 17, color: "#5A7099" }}>search</span>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "#00A651" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
            Nueva Visita
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden" style={{ borderColor: "#D1DDED" }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: "#F8FAFC" }}>
              {["ID", "Visitante", "Cédula", "Persona a quien visita", "Departamento", "Motivo", "Entrada", "Salida", "Carnet", "Estado", "Acción"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "#5A7099" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((v) => {
              const sc = statusColors[v.status];
              return (
                <tr
                  key={v.id}
                  className="border-t cursor-pointer transition-colors"
                  style={{ borderColor: "#F0F4F9" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FAFC")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  onClick={() => setSelectedVisit(v)}
                >
                  <td className="px-4 py-3 text-xs font-mono" style={{ color: "#5A7099" }}>{v.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center rounded-full text-white text-xs font-bold shrink-0"
                        style={{ width: 30, height: 30, background: "#00A651" }}>
                        {v.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#0D1B3E" }}>{v.name}</p>
                        <p className="text-xs" style={{ color: "#5A7099" }}>{v.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono" style={{ color: "#5A7099" }}>{v.cedula}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: "#0D1B3E" }}>{v.host}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#5A7099" }}>{v.dept}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#5A7099" }}>{v.purpose}</td>
                  <td className="px-4 py-3 text-xs font-mono" style={{ color: "#0D1B3E" }}>{v.entry}</td>
                  <td className="px-4 py-3 text-xs font-mono" style={{ color: "#5A7099" }}>{v.exit}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "#E8EFF8", color: "#00A651" }}>{v.carnet}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: sc.bg, color: sc.color }}>{v.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    {v.status === "Activa" && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleCheckout(v.id); }}
                        className="text-xs px-2.5 py-1 rounded-lg font-semibold transition-colors"
                        style={{ background: "#E8F5EE", color: "#00A651" }}
                      >
                        Registrar Salida
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center" style={{ color: "#5A7099" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 40 }}>search_off</span>
            <p className="text-sm mt-2">No se encontraron visitas</p>
          </div>
        )}
      </div>

      {/* New Visit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[42rem] mx-4 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#D1DDED", background: "#00A651" }}>
              <h2 className="text-white font-bold text-lg" style={{ fontFamily: "Nunito" }}>Registrar Nueva Visita</h2>
              <button onClick={closeForm}>
                <span className="material-symbols-outlined text-white/70" style={{ fontSize: 24 }}>close</span>
              </button>
            </div>
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {formError && (
                <div className="rounded-xl px-4 py-2.5 text-sm font-semibold" style={{ background: "#FEE2E2", color: "#DC2626" }}>
                  {formError}
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <Field label="Nombre Completo *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Ej. Carlos Rodríguez" />
                <Field label="Cédula *" value={form.cedula} onChange={(v) => setForm({ ...form, cedula: v })} placeholder="000-0000000-0" />
                <Field label="Teléfono" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="809-000-0000" />
                <Field label="Número de Carnet *" value={form.carnet} onChange={(v) => setForm({ ...form, carnet: v })} placeholder="Ej. C-045" />
                {showGerencia && (
                  <SelectField label="Gerencia *" value={form.gerencia} onChange={(v) => setForm({ ...form, gerencia: v })} options={gerencias} />
                )}
                <SelectField label="Departamento *" value={form.dept} onChange={(v) => setForm({ ...form, dept: v })} options={depts} />
                <Field label="Persona a quien visita *" value={form.host} onChange={(v) => setForm({ ...form, host: v })} placeholder="Nombre del empleado" />
                <SelectField label="Piso a Visitar *" value={form.piso} onChange={(v) => setForm({ ...form, piso: v })} options={pisos} />
                <SelectField label="Motivo de Visita *" value={form.purpose} onChange={(v) => setForm({ ...form, purpose: v })} options={purposes} />
              </div>
              {form.purpose === "Otro" && (
                <Field label="Especifique el Motivo *" value={form.purposeDetail} onChange={(v) => setForm({ ...form, purposeDetail: v })} placeholder="Describa el motivo de la visita" />
              )}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: "#5A7099" }}>
                  <input
                    type="checkbox"
                    checked={form.hasEquipment}
                    onChange={(e) => setForm({ ...form, hasEquipment: e.target.checked, equipmentTypes: e.target.checked ? form.equipmentTypes : [] })}
                  />
                  ¿El visitante trae algún equipo?
                </label>
                {form.hasEquipment && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      {equipmentOptions.map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-2 text-sm rounded-xl border px-3 py-2 cursor-pointer"
                          style={{
                            borderColor: form.equipmentTypes.includes(opt) ? "#00A651" : "#D1DDED",
                            background: form.equipmentTypes.includes(opt) ? "#E8F5EE" : "#fff",
                            color: "#0D1B3E",
                          }}
                        >
                          <input type="checkbox" checked={form.equipmentTypes.includes(opt)} onChange={() => toggleEquipmentType(opt)} />
                          {opt}
                        </label>
                      ))}
                    </div>
                    {form.equipmentTypes.includes("Laptop") && (
                      <div className="grid grid-cols-3 gap-3 rounded-xl p-3" style={{ background: "#F8FAFC" }}>
                        <Field label="Marca *" value={form.laptopBrand} onChange={(v) => setForm({ ...form, laptopBrand: v })} placeholder="Ej. Dell" />
                        <Field label="Modelo *" value={form.laptopModel} onChange={(v) => setForm({ ...form, laptopModel: v })} placeholder="Ej. Latitude 5420" />
                        <Field label="Serial *" value={form.laptopSerial} onChange={(v) => setForm({ ...form, laptopSerial: v })} placeholder="Ej. SN-83920XK" />
                      </div>
                    )}
                    {form.equipmentTypes.includes("Otro") && (
                      <Field label="Especifique el Equipo *" value={form.equipmentOtherDetail} onChange={(v) => setForm({ ...form, equipmentOtherDetail: v })} placeholder="Describa el equipo" />
                    )}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: "#5A7099" }}>Observaciones</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={2}
                  placeholder="Notas adicionales..."
                  className="w-full px-3.5 py-2.5 rounded-xl border text-base outline-none resize-none"
                  style={{ borderColor: "#D1DDED", color: "#0D1B3E" }}
                />
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t" style={{ borderColor: "#D1DDED" }}>
              <button onClick={closeForm} className="flex-1 py-3 rounded-xl text-sm font-semibold border" style={{ borderColor: "#D1DDED", color: "#5A7099" }}>
                Cancelar
              </button>
              <button onClick={handleSubmit} className="flex-1 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: "#00A651" }}>
                Registrar Entrada
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Panel */}
      {selectedVisit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#D1DDED" }}>
              <h2 className="font-bold text-base" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>Detalle de Visita</h2>
              <button onClick={() => setSelectedVisit(null)}>
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#5A7099" }}>close</span>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-5">
                <div className="flex items-center justify-center rounded-full text-white font-bold text-xl"
                  style={{ width: 56, height: 56, background: "#00A651" }}>
                  {selectedVisit.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="font-bold text-lg" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>{selectedVisit.name}</p>
                  <p className="text-sm" style={{ color: "#5A7099" }}>{selectedVisit.cedula}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ["Carnet", selectedVisit.carnet],
                  ["Estado", selectedVisit.status],
                  ["Persona a quien visita", selectedVisit.host],
                  selectedVisit.gerencia ? ["Gerencia", selectedVisit.gerencia] : null,
                  ["Departamento", selectedVisit.dept],
                  ["Piso", selectedVisit.piso],
                  ["Motivo", selectedVisit.purpose === "Otro" ? `Otro: ${selectedVisit.purposeDetail}` : selectedVisit.purpose],
                  ["Teléfono", selectedVisit.phone],
                  ["Entrada", selectedVisit.entry],
                  ["Salida", selectedVisit.exit],
                  selectedVisit.equipment ? ["Equipo", selectedVisit.equipment] : null,
                ].filter((row): row is [string, string] => row !== null).map(([k, val]) => (
                  <div key={k} className="rounded-xl p-3" style={{ background: "#F8FAFC" }}>
                    <p className="text-xs mb-0.5" style={{ color: "#5A7099" }}>{k}</p>
                    <p className="font-semibold" style={{ color: "#0D1B3E" }}>{val}</p>
                  </div>
                ))}
              </div>
              {selectedVisit.status === "Activa" && (
                <button
                  onClick={() => handleCheckout(selectedVisit.id)}
                  className="w-full mt-4 py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background: "#00A651" }}
                >
                  Registrar Salida
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1.5" style={{ color: "#5A7099" }}>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 rounded-xl border text-base outline-none focus:ring-2 transition-all"
        style={{ borderColor: "#D1DDED", color: "#0D1B3E" }}
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1.5" style={{ color: "#5A7099" }}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl border text-base outline-none"
        style={{ borderColor: "#D1DDED", color: value ? "#0D1B3E" : "#5A7099" }}
      >
        <option value="">Seleccionar...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
