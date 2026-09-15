import { useState } from "react";

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="relative inline-flex items-center shrink-0 rounded-full transition-colors"
      style={{ width: 44, height: 24, background: value ? "#00A651" : "#D1DDED" }}
    >
      <span
        className="inline-block rounded-full bg-white shadow transition-transform"
        style={{ width: 18, height: 18, transform: value ? "translateX(22px)" : "translateX(3px)" }}
      />
    </button>
  );
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#D1DDED" }}>
      <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "#D1DDED", background: "#F8FAFC" }}>
        <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#00A651" }}>{icon}</span>
        <h3 className="font-bold text-sm" style={{ color: "#0D1B3E", fontFamily: "Nunito" }}>{title}</h3>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

function Row({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: "#F0F4F9" }}>
      <div>
        <p className="text-sm font-medium" style={{ color: "#0D1B3E" }}>{label}</p>
        {sub && <p className="text-xs mt-0.5" style={{ color: "#5A7099" }}>{sub}</p>}
      </div>
      {children}
    </div>
  );
}

export default function Configuration() {
  const [cfg, setCfg] = useState({
    badgeRequired: true,
    autoCheckout: true,
    photoCapture: false,
    emailAlerts: true,
    smsAlerts: false,
    preRegistration: true,
    blacklistCheck: true,
    auditLog: true,
    sessionTimeout: "30",
    checkoutTime: "18:00",
    orgName: "Seguro Nacional de Salud",
    orgAddress: "Av. Tiradentes #30, Santo Domingo",
    orgPhone: "809-334-0000",
    maxVisitHours: "8",
  });

  const update = (key: keyof typeof cfg, value: string | boolean) =>
    setCfg((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-5 max-w-3xl">
      <Section title="Información de la Institución" icon="business">
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: "orgName", label: "Nombre de la Organización" },
            { key: "orgPhone", label: "Teléfono" },
            { key: "orgAddress", label: "Dirección" },
          ].map(({ key, label }) => (
            <div key={key} className={key === "orgAddress" ? "col-span-2" : ""}>
              <label className="block text-xs font-semibold mb-1" style={{ color: "#5A7099" }}>{label}</label>
              <input
                value={cfg[key as keyof typeof cfg] as string}
                onChange={(e) => update(key as keyof typeof cfg, e.target.value)}
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: "#D1DDED", color: "#0D1B3E" }}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Control de Acceso y Gafetes" icon="badge">
        <Row label="Gafete obligatorio" sub="Todo visitante debe portar gafete visible">
          <Toggle value={cfg.badgeRequired} onChange={() => update("badgeRequired", !cfg.badgeRequired)} />
        </Row>
        <Row label="Captura de fotografía" sub="Tomar foto del visitante al registrar">
          <Toggle value={cfg.photoCapture} onChange={() => update("photoCapture", !cfg.photoCapture)} />
        </Row>
        <Row label="Verificación en lista negra" sub="Consultar lista de personas no permitidas">
          <Toggle value={cfg.blacklistCheck} onChange={() => update("blacklistCheck", !cfg.blacklistCheck)} />
        </Row>
        <Row label="Pre-registro de visitas" sub="Permitir que empleados registren visitas anticipadas">
          <Toggle value={cfg.preRegistration} onChange={() => update("preRegistration", !cfg.preRegistration)} />
        </Row>
        <Row label="Duración máxima de visita (horas)" sub="Visitas que excedan este tiempo generarán alerta">
          <select value={cfg.maxVisitHours} onChange={(e) => update("maxVisitHours", e.target.value)}
            className="px-3 py-1.5 rounded-xl border text-sm outline-none" style={{ borderColor: "#D1DDED", color: "#0D1B3E" }}>
            {["4", "6", "8", "12"].map((h) => <option key={h}>{h}</option>)}
          </select>
        </Row>
      </Section>

      <Section title="Checkout y Horarios" icon="schedule">
        <Row label="Checkout automático" sub="Registrar salida automáticamente al final del día">
          <Toggle value={cfg.autoCheckout} onChange={() => update("autoCheckout", !cfg.autoCheckout)} />
        </Row>
        <Row label="Hora de checkout automático">
          <input type="time" value={cfg.checkoutTime} onChange={(e) => update("checkoutTime", e.target.value)}
            className="px-3 py-1.5 rounded-xl border text-sm outline-none"
            style={{ borderColor: "#D1DDED", color: "#0D1B3E" }} />
        </Row>
      </Section>

      <Section title="Notificaciones" icon="notifications">
        <Row label="Alertas por correo electrónico" sub="Notificaciones de visitas pendientes y alertas">
          <Toggle value={cfg.emailAlerts} onChange={() => update("emailAlerts", !cfg.emailAlerts)} />
        </Row>
        <Row label="Alertas por SMS" sub="Mensajes de texto a la persona a quien visita cuando el visitante llega">
          <Toggle value={cfg.smsAlerts} onChange={() => update("smsAlerts", !cfg.smsAlerts)} />
        </Row>
      </Section>

      <Section title="Seguridad del Sistema" icon="security">
        <Row label="Registro de auditoría" sub="Guardar log de todas las acciones del sistema">
          <Toggle value={cfg.auditLog} onChange={() => update("auditLog", !cfg.auditLog)} />
        </Row>
        <Row label="Tiempo de sesión (minutos)" sub="Cerrar sesión automáticamente por inactividad">
          <select value={cfg.sessionTimeout} onChange={(e) => update("sessionTimeout", e.target.value)}
            className="px-3 py-1.5 rounded-xl border text-sm outline-none" style={{ borderColor: "#D1DDED", color: "#0D1B3E" }}>
            {["15", "30", "60", "120"].map((t) => <option key={t}>{t}</option>)}
          </select>
        </Row>
      </Section>

      <div className="flex justify-end gap-3">
        <button className="px-5 py-2.5 rounded-xl text-sm font-semibold border" style={{ borderColor: "#D1DDED", color: "#5A7099" }}>
          Restablecer
        </button>
        <button className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "#00A651" }}>
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}
