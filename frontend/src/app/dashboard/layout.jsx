"use client";
import { Michroma } from "next/font/google";
import { useState } from "react";
import { CalendarDateRangeIcon } from "@heroicons/react/16/solid";

const michroma = Michroma({
  weight: "400", // Michroma solo tiene un peso
  subsets: ["latin"],
});

import Link from "next/link";

export default function DashboardLayout({ children }) {
   const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen grid grid-cols-5">
      {/* Menú lateral persistente */}
      <aside className="col-span-1 bg-gray-900 text-white p-6">
        <div className="bg-[url('/medify.png')] bg-cover bg-center h-32 w-full flex flex-col items-center justify-start">
          <h1 className={`${michroma.className} text-base md:text-5xl font-black tracking-wide text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] mt-8`}>
            Medify
          </h1>
          <h2 className={`${michroma.className} text-sm font-black tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]`}>
            Clinica en la Nube
          </h2>
        </div>

        <br />
        <nav>
          <ul className="flex flex-col gap-2">

            <li className="flex">

              <Link
                className="block font-bold w-full rounded px-4 py-3 hover:bg-white hover:text-black transition"
                href="/dashboard/Calendario"
              >

                Modulo Agenda
              </Link>
            </li>
            <li>
              <Link
                className=" font-bold block rounded px-4 py-3 hover:bg-white hover:text-black transition"
                href="/dashboard/GestionPaciente"
              >
                Ingreso de Pacientes
              </Link>
            </li>

            <li>
              <Link
                className="font-bold block rounded px-4 py-3 hover:bg-white hover:text-black transition"
                href="/dashboard/FichaClinica"
              >
                Ficha Clinica
              </Link>
            </li>

            <li>
              <Link
                className=" font-bold block rounded px-4 py-3 hover:bg-white hover:text-black transition"
                href="/dashboard/Facturaciones"
              >
                Facturaciones
              </Link>
            </li>

            <li>
              <button
                className="font-bold block w-full text-left rounded px-4 py-3 hover:bg-white hover:text-black transition"
                onClick={() => setOpen(!open)}
                type="button"
              >
                Ajustes Pagina Web
              </button>
              {open && (
                <ul className="ml-6 flex flex-col gap-2 mt-1">
                  <li>
                    <Link
                      className="font-bold block rounded px-4 py-3 hover:bg-white hover:text-black transition"
                      href="/dashboard/GestionImagenes"
                    >
                      Banco de Imágenes
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="font-bold block rounded px-4 py-3 hover:bg-white hover:text-black transition"
                      href="/dashboard/Publicaciones"
                    >
                      Publicaciones
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="font-bold block rounded px-4 py-3 hover:bg-white hover:text-black transition"
                      href="/dashboard/EdicionTextos"
                    >
                      Edición de Pagina Principal
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenido dinámico */}
      <main className="col-span-4 bg-white text-black p-8">{children}</main>
    </div>
  );
}
