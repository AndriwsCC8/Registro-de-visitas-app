import { useState } from "react";

interface Recepcionista {
  id: string;
  name: string;
  email: string;
  status: "Activo" | "Inactivo";
  avatar: string;
}

interface VisitaDemo {
  id: string;
  name: string;
  cedula: string;
  host: string;
  time: string;
  status: "Activa" | "Completada";
}

interface Regional {
  id: string;
  name: string;
  provincia: string;
  direccion: string;
  telefono: string;
  visitasHoy: number;
  enInstalaciones: number;
  recepcionistas: Recepcionista[];
  visitas: VisitaDemo[];
}

// Datos demo basados en los centros y puntos de servicio de SeNaSa a nivel nacional.
const regionales: Regional[] = [
  {
    id: "central",
    name: "Sede Central",
    provincia: "Santo Domingo",
    direccion: "Av. Tiradentes #30, Santo Domingo",
    telefono: "809-334-0000",
    visitasHoy: 128,
    enInstalaciones: 22,
    recepcionistas: [
      { id: "R-001", name: "Carmen López", email: "c.lopez@senasa.gob.do", status: "Activo", avatar: "CL" },
      { id: "R-002", name: "José Reyes", email: "j.reyes@senasa.gob.do", status: "Activo", avatar: "JR" },
    ],
    visitas: [
      { id: "V-00234", name: "Carlos Rodríguez", cedula: "001-1234567-8", host: "Dr. Pérez", time: "09:14 AM", status: "Activa" },
      { id: "V-00232", name: "Pedro Jiménez", cedula: "001-5556677-4", host: "Ing. Sánchez", time: "08:47 AM", status: "Completada" },
    ],
  },
  {
    id: "santiago",
    name: "Regional Santiago",
    provincia: "Santiago",
    direccion: "Av. 27 de Febrero, Santiago de los Caballeros",
    telefono: "809-580-1122",
    visitasHoy: 64,
    enInstalaciones: 9,
    recepcionistas: [{ id: "R-010", name: "Miguel Vargas", email: "m.vargas@senasa.gob.do", status: "Activo", avatar: "MV" }],
    visitas: [
      { id: "V-01021", name: "Yolanda Castro", cedula: "031-1122334-5", host: "Lic. Peña", time: "10:02 AM", status: "Activa" },
    ],
  },
  {
    id: "sfm",
    name: "Regional San Francisco de Macorís",
    provincia: "Duarte",
    direccion: "Calle Duarte esq. Mella, San Francisco de Macorís",
    telefono: "809-588-3344",
    visitasHoy: 31,
    enInstalaciones: 4,
    recepcionistas: [{ id: "R-014", name: "Rosanna Feliz", email: "r.feliz@senasa.gob.do", status: "Activo", avatar: "RF" }],
    visitas: [
      { id: "V-02011", name: "Ramón Ureña", cedula: "056-9988776-1", host: "Dra. Cabrera", time: "09:40 AM", status: "Completada" },
    ],
  },
  {
    id: "lavega",
    name: "Regional La Vega",
    provincia: "La Vega",
    direccion: "Av. Padre Adolfo, La Vega",
    telefono: "809-573-5566",
    visitasHoy: 27,
    enInstalaciones: 3,
    recepcionistas: [{ id: "R-018", name: "Elena Suriel", email: "e.suriel@senasa.gob.do", status: "Activo", avatar: "ES" }],
    visitas: [],
  },
  {
    id: "puertoplata",
    name: "Regional Puerto Plata",
    provincia: "Puerto Plata",
    direccion: "Av. Circunvalación Norte, Puerto Plata",
    telefono: "809-586-7788",
    visitasHoy: 19,
    enInstalaciones: 2,
    recepcionistas: [{ id: "R-022", name: "Julio Almonte", email: "j.almonte@senasa.gob.do", status: "Inactivo", avatar: "JA" }],
    visitas: [],
  },
  {
    id: "sanpedro",
    name: "Regional San Pedro de Macorís",
    provincia: "San Pedro de Macorís",
    direccion: "Av. Independencia, San Pedro de Macorís",
    telefono: "809-529-9900",
    visitasHoy: 22,
    enInstalaciones: 3,
    recepcionistas: [{ id: "R-026", name: "Katherine Núñez", email: "k.nunez@senasa.gob.do", status: "Activo", avatar: "KN" }],
    visitas: [],
  },
  {
    id: "barahona",
    name: "Regional Barahona",
    provincia: "Barahona",
    direccion: "Av. Enriquillo, Barahona",
    telefono: "809-524-1010",
    visitasHoy: 12,
    enInstalaciones: 1,
    recepcionistas: [{ id: "R-030", name: "Freddy Matos", email: "f.matos@senasa.gob.do", status: "Activo", avatar: "FM" }],
    visitas: [],
  },
  {
    id: "mao",
    name: "Regional Mao",
    provincia: "Valverde",
    direccion: "Calle Duarte, Mao, Valverde",
    telefono: "809-572-2020",
    visitasHoy: 15,
    enInstalaciones: 2,
    recepcionistas: [{ id: "R-034", name: "Yaniris Peralta", email: "y.peralta@senasa.gob.do", status: "Activo", avatar: "YP" }],
    visitas: [
      { id: "V-03050", name: "Domingo Batista", cedula: "047-2233445-6", host: "Lic. Ramírez", time: "08:55 AM", status: "Activa" },
    ],
  },
  {
    id: "higuey",
    name: "Regional Higüey",
    provincia: "La Altagracia",
    direccion: "Av. Los Conucos, Higüey",
    telefono: "809-554-3030",
    visitasHoy: 18,
    enInstalaciones: 2,
    recepcionistas: [{ id: "R-038", name: "Luis Ozoria", email: "l.ozoria@senasa.gob.do", status: "Activo", avatar: "LO" }],
    visitas: [],
  },
  {
    id: "moca",
    name: "Regional Moca",
    provincia: "Espaillat",
    direccion: "Calle José Ma. Serra, Moca",
    telefono: "809-578-4040",
    visitasHoy: 9,
    enInstalaciones: 1,
    recepcionistas: [{ id: "R-042", name: "Ana Cruz", email: "a.cruz@senasa.gob.do", status: "Activo", avatar: "AC" }],
    visitas: [],
  },
  {
    id: "bonao",
    name: "Regional Bonao",
    provincia: "Monseñor Nouel",
    direccion: "Av. Duarte, Bonao",
    telefono: "809-296-5050",
    visitasHoy: 11,
    enInstalaciones: 1,
    recepcionistas: [{ id: "R-046", name: "Wendy Aquino", email: "w.aquino@senasa.gob.do", status: "Activo", avatar: "WA" }],
    visitas: [],
  },
  {
    id: "sanjuan",
    name: "Regional San Juan de la Maguana",
    provincia: "San Juan",
    direccion: "Av. Independencia, San Juan de la Maguana",
    telefono: "809-557-6060",
    visitasHoy: 8,
    enInstalaciones: 1,
    recepcionistas: [{ id: "R-050", name: "Pablo Encarnación", email: "p.encarnacion@senasa.gob.do", status: "Activo", avatar: "PE" }],
    visitas: [],
  },
];

const provincias = Array.from(new Set(regionales.map((s) => s.provincia))).sort();

export default function Recepciones() {
  const [filterProvincia, setFilterProvincia] = useState("Todas");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Regional | null>(null);
  const [showNewUser, setShowNewUser] = useState(false);

  const filtered = regionales.filter((s) => {
    const matchProvincia = filterProvincia === "Todas" || s.provincia === filterProvincia;
    const matchSearch = search === "" || s.name.toLowerCase().includes(search.toLowerCase()) || s.provincia.toLowerCase().includes(search.toLowerCase());
    return matchProvincia && matchSearch;
  });

  if (selected) {
    return (
      <div className="space-y-5">
        {/* Back + header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelected(null)}
              className="flex items-center justify-center rounded-xl hover:bg-[#E8EFF8] transition-colors"
              style={{ width: 36, height: 36 }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#5A7099" }}>arrow_back</span>
            </button>
            <div>
              <h2 className="font-bold text-lg" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>{selected.name}</h2>
              <p className="text-xs" style={{ color: "#5A7099" }}>{selected.direccion} · {selected.telefono}</p>
            </div>
          </div>
          <button
            onClick={() => setShowNewUser(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "#00A651" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>person_add</span>
            Nuevo Usuario en esta Recepción
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 border flex items-center gap-3" style={{ borderColor: "#D1DDED" }}>
            <div className="flex items-center justify-center rounded-xl" style={{ width: 40, height: 40, background: "#00A65118" }}>
              <span className="material-symbols-outlined" style={{ color: "#00A651", fontSize: 20 }}>badge</span>
            </div>
            <div>
              <p className="text-xl font-extrabold" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>{selected.visitasHoy}</p>
              <p className="text-xs" style={{ color: "#5A7099" }}>Visitas Hoy</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 border flex items-center gap-3" style={{ borderColor: "#D1DDED" }}>
            <div className="flex items-center justify-center rounded-xl" style={{ width: 40, height: 40, background: "#00A65118" }}>
              <span className="material-symbols-outlined" style={{ color: "#00A651", fontSize: 20 }}>how_to_reg</span>
            </div>
            <div>
              <p className="text-xl font-extrabold" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>{selected.enInstalaciones}</p>
              <p className="text-xs" style={{ color: "#5A7099" }}>En Instalaciones</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 border flex items-center gap-3" style={{ borderColor: "#D1DDED" }}>
            <div className="flex items-center justify-center rounded-xl" style={{ width: 40, height: 40, background: "#00A65118" }}>
              <span className="material-symbols-outlined" style={{ color: "#00A651", fontSize: 20 }}>groups</span>
            </div>
            <div>
              <p className="text-xl font-extrabold" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>{selected.recepcionistas.length}</p>
              <p className="text-xs" style={{ color: "#5A7099" }}>Recepcionistas Asignados</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 380px" }}>
          {/* Visitas de esta recepción */}
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden" style={{ borderColor: "#D1DDED" }}>
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#D1DDED" }}>
              <h3 className="font-bold text-base" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>Visitas de esta Recepción</h3>
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
                {selected.visitas.map((v) => (
                  <tr key={v.id} className="border-t" style={{ borderColor: "#F0F4F9" }}>
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: "#5A7099" }}>{v.id}</td>
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: "#0D1B3E" }}>{v.name}</td>
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: "#5A7099" }}>{v.cedula}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: "#0D1B3E" }}>{v.host}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#5A7099" }}>{v.time}</td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: v.status === "Activa" ? "#E8F5EE" : "#F0F4F9", color: v.status === "Activa" ? "#00A651" : "#5A7099" }}
                      >
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selected.visitas.length === 0 && (
              <div className="py-10 text-center" style={{ color: "#5A7099" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 36 }}>event_busy</span>
                <p className="text-sm mt-2">Sin visitas registradas en esta recepción hoy</p>
              </div>
            )}
          </div>

          {/* Recepcionistas asignados */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border" style={{ borderColor: "#D1DDED" }}>
            <h3 className="font-bold text-base mb-4" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>Usuarios de esta Recepción</h3>
            <div className="space-y-3">
              {selected.recepcionistas.map((r) => (
                <div key={r.id} className="flex items-center gap-3 rounded-xl p-3" style={{ background: "#F8FAFC" }}>
                  <div
                    className="flex items-center justify-center rounded-full text-white text-sm font-bold shrink-0"
                    style={{ width: 36, height: 36, background: "#00A651" }}
                  >
                    {r.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: "#0D1B3E" }}>{r.name}</p>
                    <p className="text-xs truncate" style={{ color: "#5A7099" }}>{r.email}</p>
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0"
                    style={{ background: r.status === "Activo" ? "#E8F5EE" : "#F0F4F9", color: r.status === "Activo" ? "#00A651" : "#5A7099" }}
                  >
                    {r.status}
                  </span>
                </div>
              ))}
              {selected.recepcionistas.length === 0 && (
                <p className="text-xs text-center py-6" style={{ color: "#5A7099" }}>Sin recepcionistas asignados aún</p>
              )}
            </div>
          </div>
        </div>

        {/* Modal demo: nuevo usuario en la recepción (solo vista, sin funcionalidad) */}
        {showNewUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl mx-4 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#D1DDED", background: "#00A651" }}>
                <h2 className="text-white font-bold text-base" style={{ fontFamily: "Nunito" }}>Nuevo Usuario · {selected.name}</h2>
                <button onClick={() => setShowNewUser(false)}>
                  <span className="material-symbols-outlined text-white/70" style={{ fontSize: 22 }}>close</span>
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: "#5A7099" }}>Nombre Completo</label>
                    <input placeholder="Ej. Juana Pérez" className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: "#D1DDED", color: "#0D1B3E" }} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: "#5A7099" }}>Correo</label>
                    <input placeholder="usuario@senasa.gob.do" className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: "#D1DDED", color: "#0D1B3E" }} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: "#5A7099" }}>Rol</label>
                    <select className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: "#D1DDED", color: "#0D1B3E" }}>
                      <option>Recepcionista</option>
                      <option>Supervisor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: "#5A7099" }}>Recepción Asignada</label>
                    <input value={selected.name} disabled className="w-full px-3 py-2 rounded-xl border text-sm outline-none opacity-70" style={{ borderColor: "#D1DDED", color: "#0D1B3E" }} />
                  </div>
                </div>
        
              </div>
              <div className="flex gap-3 px-6 py-4 border-t" style={{ borderColor: "#D1DDED" }}>
                <button onClick={() => setShowNewUser(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold border" style={{ borderColor: "#D1DDED", color: "#5A7099" }}>
                  Cancelar
                </button>
                <button onClick={() => setShowNewUser(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "#00A651" }}>
                  Guardar 
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>Recepciones</h2>
          <p className="text-xs" style={{ color: "#5A7099" }}>Gestiona las recepciones de cada regional de SeNaSa a nivel nacional. Cada recepción solo ve sus propias visitas y usuarios.</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filterProvincia}
            onChange={(e) => setFilterProvincia(e.target.value)}
            className="px-3 py-2 rounded-xl border text-sm outline-none"
            style={{ borderColor: "#D1DDED", color: "#0D1B3E" }}
          >
            <option value="Todas">Todas las provincias</option>
            {provincias.map((p) => <option key={p}>{p}</option>)}
          </select>
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar recepción..."
              className="pl-8 pr-4 py-2 rounded-xl text-sm border outline-none"
              style={{ borderColor: "#D1DDED", background: "#fff", width: 200 }}
            />
            <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2" style={{ fontSize: 17, color: "#5A7099" }}>search</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filtered.map((s) => (
          <div
            key={s.id}
            onClick={() => setSelected(s)}
            className="bg-white rounded-2xl p-5 border cursor-pointer transition-all hover:shadow-md"
            style={{ borderColor: "#D1DDED" }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-xl" style={{ width: 44, height: 44, background: "#00A65118" }}>
                  <span className="material-symbols-outlined" style={{ color: "#00A651", fontSize: 22 }}>store</span>
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>{s.name}</p>
                  <p className="text-xs" style={{ color: "#5A7099" }}>{s.provincia}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center mb-3">
              <div className="rounded-xl py-2" style={{ background: "#F8FAFC" }}>
                <p className="font-extrabold text-sm" style={{ color: "#00A651", fontFamily: "Nunito" }}>{s.visitasHoy}</p>
                <p className="text-xs" style={{ color: "#5A7099" }}>Visitas</p>
              </div>
              <div className="rounded-xl py-2" style={{ background: "#F8FAFC" }}>
                <p className="font-extrabold text-sm" style={{ color: "#00A651", fontFamily: "Nunito" }}>{s.enInstalaciones}</p>
                <p className="text-xs" style={{ color: "#5A7099" }}>Adentro</p>
              </div>
              <div className="rounded-xl py-2" style={{ background: "#F8FAFC" }}>
                <p className="font-extrabold text-sm" style={{ color: "#00A651", fontFamily: "Nunito" }}>{s.recepcionistas.length}</p>
                <p className="text-xs" style={{ color: "#5A7099" }}>Usuarios</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs" style={{ color: "#5A7099" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>location_on</span>
              <span className="truncate">{s.direccion}</span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center bg-white rounded-2xl border" style={{ borderColor: "#D1DDED" }}>
          <span className="material-symbols-outlined" style={{ fontSize: 40, color: "#D1DDED" }}>search_off</span>
          <p className="text-sm mt-2" style={{ color: "#5A7099" }}>No se encontraron recepciones</p>
        </div>
      )}
    </div>
  );
}
