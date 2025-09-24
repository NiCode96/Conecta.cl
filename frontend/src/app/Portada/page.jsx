// src/app/Portada/page.jsx

import NavBar from "@/componentes/NavBar";

async function cargarTitulos() {
  const res = await fetch("http://localhost:3001/titulo");
  const dataTitulos = await res.json();
  return dataTitulos;
}

export default async function Portada() {
  const titulos = await cargarTitulos();

  const tituloPrincipal = titulos.find((item) => item.id_titulo === 1);
  const subtitulo = titulos.find((item) => item.id_titulo === 2);

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <NavBar />
      <main className="flex flex-col items-center justify-center flex-grow text-center">
        {tituloPrincipal && <h1 className="text-4xl font-bold mb-4">{tituloPrincipal.titulo}</h1>}
        {subtitulo && <p className="text-lg">{subtitulo.titulo}</p>}
      </main>
    </div>
  );
}
