// esto no puede ejecutarse del lado del cliente con el useclient
"use client";
import { useState, useEffect } from "react";
import FormularIngresoCliente from "@/componentes/FormularIngresoCliente";
import { se } from "date-fns/locale";
import { useRouter } from "next/navigation";


export default function GestionPaciente() {
  const [rut, setrut] = useState("");
  const [nombre, setnombre] = useState("");
  const [mensajeBusqueda, setmensajeBusqueda] = useState("");
  const [tablaPaciente, settablaPaciente] = useState([]);

  const router = useRouter();

  function seleccionarPaciente(paciente){
  router.push(`/dashboard/paciente/${paciente.rut}`);
  }

  async function coincidenciaRut(event) {
    event.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/pacientes/contieneRut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rut }),
      });

      const data = await res.json();

      if (!res.ok || !Array.isArray(data)) {
        setmensajeBusqueda("No hay conicidecias con la busqueda");
      } else {
        setmensajeBusqueda("Coincidencia encontrada");
        // SIEMPRE un array para que el .map no reviente
        settablaPaciente(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      alert(
        "Problema con la conexion a la base de datos contacte al equipo de soporte TI de NEX.IO"
      );
    }
  }



    async function coincidenciaNombre(event) {
    event.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/pacientes/contieneNombre", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre }),
      });

      const data = await res.json();

      if (!res.ok || !Array.isArray(data)) {
        setmensajeBusqueda("No hay conicidecias con la busqueda");
      } else {
        setmensajeBusqueda("Coincidencia encontrada");
        // SIEMPRE un array para que el .map no reviente
        settablaPaciente(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      alert(
        "Problema con la conexion a la base de datos contacte al equipo de soporte TI de NEX.IO"
      );
    }
  }

  async function tablaPcientes() {
    const res = await fetch("http://localhost:3001/pacientes");
    const data = await res.json();
    if (!res.ok) {
      setmensajeBusqueda(
        "No se logro conectar a la base de datos contacte al equipo de Soporte de NEX.IO"
      );
      return;
    } else {
      settablaPaciente(data);
    }
  }

  useEffect(() => {
    tablaPcientes(); // se ejecuta cuando se monta el componente
  }, []);

  return (
    <div>
      {/**FORMULARIO DE INGRESO DE PACIENTES NUEVOS */}
      <FormularIngresoCliente />
      <br />
      <br />
      <br />





     <hr style={{ margin: "20px 0" }} />
    <br />


{/**TITULO TABLA DE PACIENTES INGRESADOS */}
<h1 className="text-4xl font-bold p-2">Lista de Pacientes Ingresados</h1><br />

      <div className="flex space-x-6">
        <form onSubmit={coincidenciaRut} className="space-x-6">
          {/**INPUT PARA BUSCAR POR COINCIDENCIAS DE RUT */}

          <p className="font-bold">Busca por Rut</p><input 
                value={rut}
            id="rut"
            name="rut"
            onChange={(event) => setrut(event.target.value)}
            className="border-2 border-blue-950 rounded-2xl h-10 w-80 p-2"
            placeholder="Escribe aca el Rut.." />
        



          {/**BOTON PARA BUSCAR POR COINCIDENCIAS DE RUT */}
          <button
            type="submit"
                          className="px-4 py-2 w-50 rounded-2xl font-semibold bg-white text-blue-800 border-2 
                transition-transform duration-200 ease-in-out hover:translate-y-0.5 hover:bg-blue-50
                active:translate-y-0 active:scale-95"          >
            Buscar Similitudes
          </button>
        </form>
      </div>






<br />


       <div className="flex space-x-6">
        <form onSubmit={coincidenciaNombre} className="space-x-6">
          {/**INPUT PARA BUSCAR POR COINCIDENCIAS POR NOMBRE */}

         <p className="font-bold">Busca por Nombre</p> <input 
                value={nombre}
            id="nombre"
            name="nombre"
            onChange={(event) => setnombre(event.target.value)}
            className="border-2 border-blue-950 rounded-2xl h-10 w-80 p-2"
            placeholder="Escribe aca el Nombre..." />
        

          {/**BOTON PARA BUSCAR POR COINCIDENCIAS POR NOMBRE */}
          <button
            type="submit"
                     className="px-4 py-2 w-50 rounded-2xl font-semibold bg-white text-blue-800 border-2 
                transition-transform duration-200 ease-in-out hover:translate-y-0.5 hover:bg-blue-50
                active:translate-y-0 active:scale-95"             >
            Buscar Similitudes
          </button>
        </form>
      </div>




<br /><br /><br />

      {/**TABLA DE PACIENTES INGRESADOS */}
      <div className="bg-gray-300 border-2 border-gray-800 rounded-2xl">
        <table className="p-4 table-auto w-full text-center border-collapse">
        <thead >
          <tr>
            <th className="p-2" >NOMBRE</th>
            <th className="p-2" >APELLIDO</th>
            <th className="p-2">RUT</th>
            <th className="p-2">TELEFONO</th>
            <th className="p-2">CORREO</th>
            <th className="p-2">SELECCIONAR</th>
          </tr>
        </thead>
        <tbody className="p-2">
          {(Array.isArray(tablaPaciente) ? tablaPaciente : []).map(
            (paciente, index) => (
              <tr key={index}>
                <td className="p-2 align-middle">{paciente.nombre}</td>
            
                <td className="p-2 align-middle">{paciente.apellido}</td>
             
                <td className="p-2 align-middle">{paciente.rut}</td>
       
                <td className="p-2 align-middle">{paciente.telefono}</td>
                
                <td className="p-2 align-middle">{paciente.correo}</td>
               
                <td className="p-2 align-middle">
                  <button 
                  onClick={() => seleccionarPaciente(paciente)}
                  type="button"
                                      className="px-4 py-2 w-25  rounded-2xl font-semibold bg-white text-blue-800 border-2 
                transition-transform duration-200 ease-in-out hover:translate-y-0.5 hover:bg-blue-50
                active:translate-y-0 active:scale-95"   >
                    Paciente </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}
