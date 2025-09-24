"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EdicionPacientes(){
    const { rut } = useParams();
    const [paciente, setPaciente] = useState(null
    );


    function formatearFecha(valor) {
  if (!valor) return "";
  const soloFecha = valor.toString().split("T")[0];   // "YYYY-MM-DD"
  const [yyyy, mm, dd] = soloFecha.split("-");
  if (!yyyy || !mm || !dd) return valor;             // fallback si no coincide
  return `${dd}-${mm}-${yyyy}`;                      // "DD-MM-YYYY"
}



useEffect(() => {

     async function seleccionarPaciente(){
        try {
        const res = await fetch(
        "http://localhost:3001/pacientes/pacientesEspecifico",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rut }),
        }
      );


            const data = await res.json();

            if (!res.ok) {
                alert("No se ha podido seleccionar el paciente contacte a soporte Informatico")
            } else {
                setPaciente(data)
            }

        } catch (error) {
                alert("No se ha podido seleccionar el paciente contacte a soporte Informatico")
        }
    }
seleccionarPaciente();

},[rut])

    return(

        <div>

          <h1 className="text-4xl font-bold">Edicion de Datos del Paciente</h1><br />
      
          <ul className="font-bold">
            <li className="font-bold text-md">
              NOMBRE:{" "}
              <span className="text-blue-900 font-bold text-md">
                {paciente?.nombre}
              </span>{" "}
            </li>
            <li className="font-bold text-md">
              APELLIDO:{" "}
              <span className="text-blue-900 font-bold text-md">
                {paciente?.apellido}
              </span>{" "}
            </li>
            <li className="font-bold text-md">
              RUT:{" "}
              <span className="text-blue-900 font-bold text-md">
                {paciente?.rut}
              </span>{" "}
            </li>
            <li className="font-bold text-md">
              F. NACIMIENTO:
              <span className="text-blue-900 font-bold text-md">
                {formatearFecha(paciente?.nacimiento)}
              </span>{" "}
            </li>
            <li>
              SEXO:{" "}
              <span className="text-blue-900 font-bold text-md">
                {paciente?.sexo}
              </span>{" "}
            </li>
          </ul>
        
        </div>
    )
}