"use client";

import { useMemo, useState, useEffect } from "react";

// ===============================
// Calendario de agenda semanal
// ===============================
// ✔ Selección de 1 de los 7 días de la semana
// ✔ Visualización de las 24 horas (en intervalos de 30 min)
// ✔ Respeta la calendarización del profesional (ventanas horarias)
// ✔ Preparado para integrarse con un backend (ver TODOs)

// Nombres de días (Lunes primero)
const WEEK_DAYS = [
  { key: 1, label: "Lunes" },
  { key: 2, label: "Martes" },
  { key: 3, label: "Miércoles" },
  { key: 4, label: "Jueves" },
  { key: 5, label: "Viernes" },
  { key: 6, label: "Sábado" },
  { key: 0, label: "Domingo" },
];

// Configuración de intervalo de atención en minutos
const SLOT_MINUTES = 30; // 30 min por bloque

// ⚠️ TODO: Reemplazar estas ventanas por la calendarización real
const PROFESSIONAL_WINDOWS = {
  1: [{ start: "08:00", end: "20:00" }], // Lunes
  2: [{ start: "08:00", end: "20:00" }], // Martes
  3: [{ start: "08:00", end: "20:00" }], // Miércoles
  4: [{ start: "08:00", end: "20:00" }], // Jueves
  5: [{ start: "08:00", end: "20:00" }], // Viernes
  6: [{ start: "08:00", end: "20:00" }], // Sábado
  0: [], // Domingo sin atención
};

// Utilidades de tiempo
function toMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function minutesToHHMM(min) {
  const h = Math.floor(min / 60) % 24;
  const m = min % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}`;
}

function dateToYMD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
function minutesFromMidnight(dateObj) {
  return dateObj.getHours() * 60 + dateObj.getMinutes();
}

// ==== Helpers de calendario mensual (lunes a domingo)
function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 dom,1 lun
  const diff = (day === 0 ? -6 : 1) - day; // mover al lunes
  return addDays(d, diff);
}
function getMonthMatrix(year, month) {
  // Matriz de 6 semanas x 7 días (42 celdas), comenzando en lunes
  const first = new Date(year, month, 1);
  const gridStart = getMonday(first);
  const days = [];
  for (let i = 0; i < 42; i++) {
    days.push(addDays(gridStart, i));
  }
  return days;
}
function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function generateDaySlots(slotMinutes = SLOT_MINUTES) {
  const slots = [];
  for (let t = 0; t < 24 * 60; t += slotMinutes) {
    const start = t;
    const end = t + slotMinutes;
    slots.push({
      start,
      end,
      label: `${minutesToHHMM(start)} - ${minutesToHHMM(end)}`,
    });
  }
  return slots;
}

function isWithinWindows(slot, windows) {
  if (!windows || windows.length === 0) return false;
  return windows.some((w) => {
    const ws = toMinutes(w.start);
    const we = w.end === "24:00" ? 24 * 60 : toMinutes(w.end);
    return slot.start >= ws && slot.end <= we;
  });
}

export default function Page() {
  // Día seleccionado (por defecto: hoy)
  const today = new Date();
  const jsDay = today.getDay(); // 0=Dom,1=Lun,...
  const defaultDay = WEEK_DAYS.find((d) => d.key === jsDay) ? jsDay : 1;

  const [viewMode, setViewMode] = useState("week"); // "week" | "month"
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today);

  const [selectedDay, setSelectedDay] = useState(defaultDay);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [notice, setNotice] = useState("");

  // ===============================
  // Reservas existentes del día
  // (números de minutos desde 00:00 que ya están ocupados)
  // ===============================
  const [reservedStarts, setReservedStarts] = useState([]); // e.g., [480, 510]
  const [loadingRes, setLoadingRes] = useState(false);

  // ===============================
  // Datos del paciente (formulario)
  // ===============================
  const [pacienteNombre, setPacienteNombre] = useState("");
  const [pacienteEmail, setPacienteEmail] = useState("");

  // ID del profesional dueño del calendario (ajústalo desde BD)
  const professionalId = 1;

  // Zona horaria local (afecta al Calendar)
  const timezone = "America/Santiago";

  // Traer reservas del backend para la fecha/profesional actual
  useEffect(() => {
    let ignore = false;
    async function loadReservations() {
      try {
        setLoadingRes(true);
        const ymd = dateToYMD(selectedDate);
        const url = `/api/agenda/reservas?professionalId=${professionalId}&date=${ymd}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('No se pudieron cargar reservas');
        const data = await res.json();
        // Soportar dos formatos: {items:[{startMinutes:480}]} o {items:[{start_utc:ISO}]}
        const items = Array.isArray(data?.items) ? data.items : [];
        const occupied = items.map((it) => {
          if (typeof it.startMinutes === 'number') return it.startMinutes;
          if (it.start_utc) {
            const d = new Date(it.start_utc);
            // convertir a la fecha local seleccionada
            return minutesFromMidnight(d);
          }
          return null;
        }).filter((n) => typeof n === 'number');
        if (!ignore) setReservedStarts(occupied);
      } catch (e) {
        if (!ignore) setReservedStarts([]);
      } finally {
        if (!ignore) setLoadingRes(false);
      }
    }
    loadReservations();
    return () => { ignore = true; };
  }, [selectedDate, professionalId]);

  // ⚠️ TODO: aquí podrías consultar un backend para traer las ventanas
  const windowsForDay = PROFESSIONAL_WINDOWS[selectedDay] || [];

  const allSlots = useMemo(() => generateDaySlots(SLOT_MINUTES), []);
  const availableSlots = useMemo(
    () => allSlots
      .filter((s) => isWithinWindows(s, windowsForDay))
      .map((s) => ({ ...s, reserved: reservedStarts.includes(s.start) })),
    [allSlots, windowsForDay, reservedStarts]
  );

  // ===============================
  // Confirmar: valida y envía al backend
  //  - Toma el slot seleccionado + fecha
  //  - Incluye nombre y correo del paciente
  //  - Envía POST a /api/agenda/reservar para crear el evento + Meet
  // ===============================
  const handleConfirm = async () => {
    if (!selectedSlot) return;

    // Validación mínima del formulario
    if (!pacienteNombre.trim() || !pacienteEmail.trim()) {
      setNotice("Por favor completa tu nombre y correo.");
      return;
    }

    try {
      // Construye los Date del inicio/fin en base a la fecha seleccionada
      const date = new Date(selectedDate);

      const startLocal = new Date(date);
      startLocal.setHours(
        Math.floor(selectedSlot.start / 60),
        selectedSlot.start % 60,
        0,
        0
      );

      const endLocal = new Date(date);
      endLocal.setHours(
        Math.floor(selectedSlot.end / 60),
        selectedSlot.end % 60,
        0,
        0
      );

      // Payload hacia el backend
      const payload = {
        professionalId,
        pacienteNombre: pacienteNombre.trim(),
        pacienteEmail: pacienteEmail.trim(),
        timezone,
        startISO: startLocal.toISOString(),
        endISO: endLocal.toISOString(),
      };

      const res = await fetch("/calendar/agenda/reservar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "No se pudo reservar.");
      }

      // Muestra confirmación con link de Meet si viene
      const meetMsg = data?.meetLink ? ` · Meet: ${data.meetLink}` : "";
      setNotice(`Reserva confirmada para ${startLocal.toLocaleDateString("es-CL")} ${selectedSlot.label}${meetMsg}`);

      // Marcar el bloque como ocupado en la UI (optimista)
      setReservedStarts((prev) => (prev.includes(selectedSlot.start) ? prev : [...prev, selectedSlot.start]));
      setSelectedSlot(null);

      // (Opcional) Limpia los campos
      // setPacienteNombre("");
      // setPacienteEmail("");
    } catch (e) {
      setNotice(`Error: ${e.message}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8">
      {/* Título */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-rose-600 text-center mb-6">
        Agenda de Atención
      </h1>

      {/* Selector de modo */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <button
          onClick={() => setViewMode("week")}
          className={`px-3 py-1 rounded-md border text-sm ${viewMode === "week" ? "border-rose-600 bg-rose-50 text-rose-700" : "border-gray-200 hover:border-rose-300"}`}
        >
          Vista semanal
        </button>
        <button
          onClick={() => setViewMode("month")}
          className={`px-3 py-1 rounded-md border text-sm ${viewMode === "month" ? "border-rose-600 bg-rose-50 text-rose-700" : "border-gray-200 hover:border-rose-300"}`}
        >
          Vista mensual
        </button>
      </div>

      {/* Selector de día (Semanal) */}
      {viewMode === "week" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
          {WEEK_DAYS.map((d) => {
            const active = d.key === selectedDay;
            return (
              <button
                key={d.key}
                onClick={() => {
                  setSelectedDay(d.key);
                  // sincroniza selectedDate al próximo día de la semana (hoy si coincide)
                  const base = new Date();
                  const todayKey = base.getDay();
                  let diff = d.key - todayKey;
                  if (diff < 0) diff += 7;
                  const newDate = new Date(base);
                  newDate.setDate(base.getDate() + diff);
                  setSelectedDate(newDate);
                  setSelectedSlot(null);
                  setNotice("");
                }}
                className={`rounded-md border px-3 py-2 text-sm sm:text-base transition ${active ? "border-rose-600 bg-rose-50 text-rose-700" : "border-gray-200 hover:border-rose-300"}`}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Calendario mensual */}
      {viewMode === "month" && (
        <div className="mb-6">
          {/* Header del mes */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
              className="px-3 py-1 rounded-md border text-sm border-gray-200 hover:border-rose-300"
            >
              ← Anterior
            </button>
            <div className="text-base sm:text-lg font-medium text-rose-700">
              {currentMonth.toLocaleDateString("es-CL", { month: "long", year: "numeric" })}
            </div>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
              className="px-3 py-1 rounded-md border text-sm border-gray-200 hover:border-rose-300"
            >
              Siguiente →
            </button>
          </div>

          {/* Cabecera L–D */}
          <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-1">
            <div>L</div><div>M</div><div>M</div><div>J</div><div>V</div><div>S</div><div>D</div>
          </div>

          {/* Grilla de días */}
          <div className="grid grid-cols-7 gap-1">
            {getMonthMatrix(currentMonth.getFullYear(), currentMonth.getMonth()).map((d, idx) => {
              const inMonth = d.getMonth() === currentMonth.getMonth();
              const isToday = isSameDay(d, new Date());
              const active = isSameDay(d, selectedDate);
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedDate(d);
                    const weekdayKey = d.getDay();
                    setSelectedDay(weekdayKey);
                    setSelectedSlot(null);
                    setNotice("");
                  }}
                  className={`h-10 rounded-md border text-sm transition flex items-center justify-center
                    ${active ? "border-rose-600 bg-rose-50 text-rose-700" : "border-gray-200 hover:border-rose-300"}
                    ${!inMonth ? "opacity-40" : ""}
                    ${isToday && !active ? "ring-1 ring-rose-300" : ""}
                  `}
                  title={d.toLocaleDateString("es-CL")}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Leyenda de disponibilidad */}
      <div className="mb-4 text-sm text-gray-600">
        {windowsForDay.length > 0 ? (
          <p>
            Fecha seleccionada: <span className="font-medium">{selectedDate.toLocaleDateString("es-CL")}</span> · Horario del profesional para <span className="font-medium">{WEEK_DAYS.find((d) => d.key === selectedDay)?.label}</span>:
            {" "}
            {windowsForDay.map((w, i) => (
              <span key={i} className="inline-block ml-2">
                {w.start}–{w.end}
              </span>
            ))}
          </p>
        ) : (
          <p>No hay horas disponibles este día.</p>
        )}
      </div>
      {loadingRes && (
        <div className="text-xs text-gray-500 mb-2">Actualizando reservas…</div>
      )}

      {/* Grid de 24 horas (bloques de 30 min) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-[420px] overflow-y-auto border rounded-md p-3 bg-white">
        {availableSlots.map((slot) => {
          const isActive = selectedSlot?.start === slot.start;
          return (
            <button
              key={slot.start}
              onClick={() => setSelectedSlot(slot)}
              disabled={slot.reserved}
              className={`text-left rounded-md border px-3 py-2 text-sm transition relative
                ${
                  slot.reserved
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : isActive
                      ? "border-rose-600 bg-rose-50 text-rose-700"
                      : "border-gray-200 hover:border-rose-300"
                }`}
            >
              {slot.label}
              {slot.reserved && (
                <span className="absolute top-1 right-2 text-[10px] uppercase tracking-wide">Ocupado</span>
              )}
            </button>
          );
        })}

        {availableSlots.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-8">
            Sin bloques disponibles en este día.
          </div>
        )}
      </div>

      {/* =====================================
          Formulario de datos del paciente
          - Se requiere para crear el evento y enviar la invitación
          - Email será invitado al Google Meet automáticamente
         ===================================== */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Nombre</label>
          <input
            type="text"
            placeholder="Tu nombre"
            value={pacienteNombre}
            onChange={(e) => setPacienteNombre(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Correo</label>
          <input
            type="email"
            placeholder="tucorreo@ejemplo.com"
            value={pacienteEmail}
            onChange={(e) => setPacienteEmail(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
          />
        </div>
      </div>

      {/* Acciones */}
      <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
        <button
          disabled={!selectedSlot || !pacienteNombre.trim() || !pacienteEmail.trim()}
          onClick={handleConfirm}
          className={`px-4 py-2 rounded-md text-white transition w-full sm:w-auto
            ${selectedSlot && pacienteNombre.trim() && pacienteEmail.trim() ? "bg-rose-600 hover:opacity-90" : "bg-gray-300 cursor-not-allowed"}`}
        >
          Confirmar hora
        </button>

        {selectedSlot && (
          <div className="text-sm text-gray-700">
            Seleccionado: {selectedDate.toLocaleDateString("es-CL")} · {WEEK_DAYS.find((d) => d.key === selectedDay)?.label} · {selectedSlot.label}
            {selectedSlot && reservedStarts.includes(selectedSlot.start) && (
              <span className="ml-2 text-rose-700">(ocupado)</span>
            )}
          </div>
        )}
      </div>

      {/* Mensaje */}
      {notice && (
        <div className="mt-4 rounded-md border border-rose-200 bg-rose-50 p-3 text-rose-700">
          {notice}
        </div>
      )}

      {/* Notas para integraciones */}
      <div className="mt-8 text-xs text-gray-500 space-y-1">
        <p>• Cambia las ventanas horarias en <code>PROFESSIONAL_WINDOWS</code> para reflejar la calendarización real.</p>
        <p>• Ajusta la duración de cada bloque con <code>SLOT_MINUTES</code> (p. ej., 20, 30, 60).</p>
        <p>• Integra con tu API (POST/GET) en <code>handleConfirm</code> y donde se obtiene <code>windowsForDay</code>.</p>
        <p>• Este formulario envía <code>nombre</code> y <code>correo</code> al backend en <code>/api/agenda/reservar</code> para crear la reunión Meet y bloquear el slot.</p>
      </div>
    </div>
  );
}