'use client';
import React, { useState } from 'react';

/**
 * PÁGINA FRONTEND (Next.js) — SIN CÓDIGO DE EXPRESS
 * ESTILOS CON TAILWIND (EN MAYÚSCULAS LOS BLOQUES PRINCIPALES)
 */

// Convierte "YYYY-MM-DDTHH:MM" (input local) a ISO con zona
function toISOWithOffset(localValue) {
  if (!localValue) return '';
  const [datePart, timePart] = localValue.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute] = timePart.split(':').map(Number);
  const d = new Date(year, month - 1, day, hour, minute, 0, 0);
  const offsetMin = d.getTimezoneOffset();
  const sign = offsetMin > 0 ? '-' : '+';
  const abs = Math.abs(offsetMin);
  const offH = String(Math.floor(abs / 60)).padStart(2, '0');
  const offM = String(abs % 60).padStart(2, '0');
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const HH = String(d.getHours()).padStart(2, '0');
  const MM = String(d.getMinutes()).padStart(2, '0');
  const SS = '00';
  return `${yyyy}-${mm}-${dd}T${HH}:${MM}:${SS}${sign}${offH}:${offM}`;
}

// Formato tradicional dd/mm/yyyy HH:MM
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export default function CalendarioPage() {
  const now = new Date();
  const in1h = new Date(now.getTime() + 60 * 60 * 1000);

  const defaultStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate()
  ).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const defaultEnd = `${in1h.getFullYear()}-${String(in1h.getMonth() + 1).padStart(2, '0')}-${String(
    in1h.getDate()
  ).padStart(2, '0')}T${String(in1h.getHours()).padStart(2, '0')}:${String(in1h.getMinutes()).padStart(2, '0')}`;

  const [summary, setSummary] = useState('Reunión con paciente');
  const [description, setDescription] = useState('Control general');
  const [start, setStart] = useState(defaultStart);
  const [end, setEnd] = useState(defaultEnd);
  const [location, setLocation] = useState('Valdivia');
  const [attendee, setAttendee] = useState('');
  const [msg, setMsg] = useState('');
  const [eventLink, setEventLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  async function crearEvento(e) {
    e.preventDefault();
    setMsg('');
    setEventLink('');
    setLoading(true);
    try {
      const startISO = toISOWithOffset(start);
      const endISO = toISOWithOffset(end);
      const body = { summary, description, start: startISO, end: endISO, location };
      if (attendee && /\S+@\S+\.\S+/.test(attendee)) body.attendees = [{ email: attendee }];
      const res = await fetch('http://localhost:3001/calendar/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok && data?.event) {
        setMsg('✅ Evento creado correctamente');
        setEventLink(data.event.htmlLink || '');
      } else {
        setMsg(`❌ No se pudo crear el evento${data?.error ? `: ${data.error}` : ''}`);
      }
    } catch (err) {
      setMsg('❌ Error de conexión con el backend');
    } finally {
      setLoading(false);
    }
  }

  async function listarEventosHoy() {
    setMsg('');
    setEventLink('');
    setLoading(true);
    try {
      // Pide TODOS los eventos de hoy, con paginación en el backend
      const res = await fetch('http://localhost:3001/calendar/events?range=today&max=2500');
      const data = await res.json();
      if (res.ok) {
        const items = Array.isArray(data.items) ? data.items : [];
        items.sort((a,b)=> new Date(a.start?.dateTime || a.start?.date) - new Date(b.start?.dateTime || b.start?.date));
        setList(items);
      } else setMsg('❌ No se pudieron listar las citas de hoy');
    } catch {
      setMsg('❌ Error de conexión con el backend');
    } finally {
      setLoading(false);
    }
  }

  async function listarProximos() {
    setMsg('');
    setEventLink('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/calendar/events?range=upcoming&max=2500');
      const data = await res.json();
      if (res.ok) {
        const items = Array.isArray(data.items) ? data.items : [];
        items.sort((a,b)=> new Date(a.start?.dateTime || a.start?.date) - new Date(b.start?.dateTime || b.start?.date));
        setList(items);
      } else setMsg('❌ No se pudieron listar los próximos eventos');
    } catch {
      setMsg('❌ Error de conexión con el backend');
    } finally {
      setLoading(false);
    }
  }

  return (
    // CONTENEDOR PRINCIPAL: FONDO BLANCO + BORDE AZUL
    <div className="p-6 md:p-8 max-w-3xl mx-auto bg-white border-2 border-blue-700 rounded-xl shadow-sm">
      {/* TITULARES */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900">GESTIÓN DE AGENDA PACIENTES</h1>
      <h2 className="mt-2 mb-4 text-blue-800 font-semibold">Agendamiento Manual de Pacientes</h2>

      {/* FORMULARIO: CAMPOS CON BORDE AZUL */}
      <form onSubmit={crearEvento} className="grid gap-3">
        <input
          placeholder="Nombre del Paciente"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="px-3 py-2 rounded-md border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          placeholder="Motivo Consulta"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="px-3 py-2 rounded-md border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          placeholder="Ubicación"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="px-3 py-2 rounded-md border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="mt-2 font-semibold text-blue-900">Inicio Atencion</label>
        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="px-3 py-2 rounded-md border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="font-semibold text-blue-900">Fin de Atencion</label>
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="px-3 py-2 rounded-md border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          placeholder="Invitado (email opcional)"
          value={attendee}
          onChange={(e) => setAttendee(e.target.value)}
          className="px-3 py-2 rounded-md border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* BOTÓN PRINCIPAL */}
        <button
          type="submit"
          disabled={loading}
          className="mt-1 inline-flex items-center justify-center px-4 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Agendando...' : 'Agendar Paciente'}
        </button>
      </form>

      {/* MENSAJES */}
      {msg && <p className="mt-3 text-blue-900 font-medium">{msg}</p>}
      {eventLink && (
        <p className="mt-2">
          Ver en Google Calendar:{' '}
          <a href={eventLink} target="_blank" rel="noreferrer" className="underline text-blue-700">
            abrir evento
          </a>
        </p>
      )}

      {/* SEPARADOR */}
      <hr className="my-6 border-blue-200" />

      {/* BOTONES SECUNDARIOS */}
      <div className="flex gap-3 mb-3">
        <button
          onClick={listarEventosHoy}
          disabled={loading}
          className="inline-flex items-center justify-center px-4 py-2 rounded-md font-semibold text-blue-800 bg-blue-100 hover:bg-blue-200 border border-blue-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Cargando...' : 'Listar citas de HOY'}
        </button>

        <button
          onClick={listarProximos}
          disabled={loading}
          className="inline-flex items-center justify-center px-4 py-2 rounded-md font-semibold text-blue-800 bg-white border-2 border-blue-600 hover:bg-blue-50 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Cargando...' : 'Listar próximos'}
        </button>

        <a
          href="http://localhost:3001/calendar/auth/google"
          target="_blank"
          rel="noreferrer"
          title="Autorizar si aún no lo has hecho"
          className="inline-flex items-center justify-center px-4 py-2 rounded-md font-semibold text-blue-800 bg-white border-2 border-blue-600 hover:bg-blue-50"
        >
          Autorizar Google
        </a>
      </div>

      {/* LISTA DE EVENTOS (CARDS CON BORDE AZUL) */}
      {list.length > 0 && (
        <div className="mt-2">
          <h2 className="mb-2 font-semibold text-blue-900">Resultados</h2>
          <ul className="grid gap-2 list-none p-0 m-0">
            {list.map((ev) => {
              const startFmt = formatDate(ev.start?.dateTime || ev.start?.date);
              const endFmt = formatDate(ev.end?.dateTime || ev.end?.date);
              const meetUrl = ev.hangoutLink || (ev.conferenceData?.entryPoints || []).find(ep => ep.entryPointType === 'video')?.uri || '';
              return (
                <li key={ev.id} className="border-2 border-blue-200 rounded-md p-3 bg-white">
                  <div className="text-xl font-extrabold text-blue-900">{ev.summary || '(Sin título)'}</div>
                  <div className="text-lg font-semibold text-blue-800">{ev.description || '(Sin motivo)'}</div>
                  <div className="text-lg font-semibold text-blue-700">{startFmt} → {endFmt}</div>
                  {ev.htmlLink && (
                    <div className="flex flex-col sm:flex-row gap-2 mt-2">
                      <a
                        href={ev.htmlLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center px-3 py-1 rounded-full font-medium text-blue-700 border border-blue-700 hover:bg-blue-50 text-sm"
                      >
                        Abrir en Google Calendar
                      </a>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center px-3 py-1 rounded-full font-medium text-red-700 border border-red-700 hover:bg-red-50 text-sm"
                        onClick={() => alert("Funcionalidad de anular pendiente")}
                      >
                        Anular cita
                      </button>
                      <a
                        href={meetUrl || 'https://meet.google.com/new'}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center px-3 py-1 rounded-full font-medium text-green-700 border border-green-700 bg-transparent hover:bg-green-50 text-sm"
                        title={meetUrl ? 'Abrir Meet del evento' : 'Crear Meet nuevo'}
                      >
                        Ir a Meet
                      </a>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
