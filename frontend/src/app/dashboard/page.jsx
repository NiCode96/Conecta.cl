"use client";
import { Michroma } from "next/font/google";
import Link from "next/link";

const michroma = Michroma({
  weight: "400", // Michroma solo tiene un peso
  subsets: ["latin"],
});


// frontend/src/app/dashboard/page.jsx


export default function DashboardHome() {
  return (
    <div>

      <div className="bg-[url('/medify.png')] bg-cover bg-center h-screen w-full flex flex-col items-center justify-center ">

          <h1 className={`${michroma.className} flex justify-items-center text-base md:text-9xl font-black tracking-wide text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] mt-8`}>
            Medify
          </h1>
          <h2 className={`${michroma.className} text-2xl font-black tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]`}>
            Clinica en la Nube
          </h2>
      </div>

<Link href={"/"}>
      <div className="
      p-2 w-60 flex justify-center
      text-blue-950 font-bold text-2xl
      border-2 border-blue-900 rounded-2xl
      bg-withe hover:bg-sky-50
      hover:translate-x-3 transition-transform ease-in-out
      "
      >
       <h1>Ir a Pagina Web</h1>
      </div></Link>

    </div>
  );
}