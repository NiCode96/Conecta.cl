"use client";
import Crard from "@/componentes/Cards";

async function CargarTitulos() {
  const res = await fetch("http://localhost:3001/titulo");
  const dataTitulos = await res.json();
  return dataTitulos;
}

async function cargarProyectos() {
  const res = await fetch("http://localhost:3001/proyectos");
  const dataProyectos = await res.json();
  return dataProyectos;
}

export default async function PortafolioProyectis() {
  const titulos = await CargarTitulos();
  const proyecto = titulos.find((item) => item.id_titulo === 5);

  const proyectos = await cargarProyectos();
  const proyecto1 = proyectos.find((item) => item.portafolio_id === 1);
  const proyecto2 = proyectos.find((item) => item.portafolio_id === 2);
  const proyecto3 = proyectos.find((item) => item.portafolio_id === 3);

  return (
    <div>
      {/**TITULO PROYECTOS */}
      {proyecto && (
        <h1 className="tituloResponsive pl-10 md:pl-25">{proyecto.titulo}</h1>
      )}{" "}
      <br /><br /><br />
      {/**CONTENEDOR PRINCIPAL CARDS*/}
      <div className="
      grid grid-cols-1 md:grid-cols-3 justify-center pl-25 gap-y-10
      ">
        <div>
          <Crard
            titulo={proyecto1.titulo}
            descripcion={proyecto1.descripcion_breve}
            imagen={""}
            rutaBoton={''}
            
          />
        </div>
        <div>
          <Crard
            titulo={proyecto2.titulo}
            descripcion={proyecto2.descripcion_breve}
            imagen={""}
            rutaBoton={''}
          />
        </div>
        <div>
          <Crard
            titulo={proyecto3.titulo}
            descripcion={proyecto3.descripcion_breve}
            imagen={""}
            rutaBoton={''}
          />
        </div>

      </div>




    </div>
    
  );
}
