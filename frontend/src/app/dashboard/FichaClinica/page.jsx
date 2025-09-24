"use client";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { da, es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";




// FUNCION PRINCIPAL DE FICHACLINICA JSX
export default function FichaClinica() {

  const [rut, setrut] = useState("");
  const [mensaje, setmensaje] = useState("");
  const [paciente, setpaciente] = useState(null);
  const [ficha, setficha] = useState([]);
  const [fichamensjae, setfichamensaje] = useState("");
  const [anotacionConsulta, setanotacionConsulta] = useState("");
  const [anamnesis, setanamnesis] = useState("");
  const [diagnostico, setdiagnostico] = useState("");
  const [indicaciones, setindicaciones] = useState("");
  const [fechaConsulta, setfechaConsulta] = useState("");
  const [observaciones, setobservaciones] = useState("");
  const [mensajeInsercion, setmensajeInsercion] = useState("");
  const [mensajeEliminacion, setmensajeEliminacion] = useState("");
  const [id_ficha, setid_ficha] = useState("");
  const [fichaSeleccionada , setfichaSeleccionada] = useState("");
  const [visibleMsg, setVisibleMsg] = useState(false);



  
// ↑ dentro de FichaClinica(), cerca de otros helpers/funciones
function formatearFecha(valor) {
  if (!valor) return "";
  const soloFecha = valor.toString().split("T")[0];   // "YYYY-MM-DD"
  const [yyyy, mm, dd] = soloFecha.split("-");
  if (!yyyy || !mm || !dd) return valor;             // fallback si no coincide
  return `${dd}-${mm}-${yyyy}`;                      // "DD-MM-YYYY"
}

// Normaliza saltos de línea Windows -> Unix para preservar formato al renderizar
function normaliza(texto) {
  return (texto || "").replace(/\r\n/g, "\n");
}

  useEffect(() => {
    if (!mensajeEliminacion) return;
    // Mostrar el mensaje inmediatamente
    setVisibleMsg(true);

    // Iniciar desvanecimiento después de 2s
    const t1 = setTimeout(() => setVisibleMsg(false), 2000);
    // Limpiar el texto después de 3s
    const t2 = setTimeout(() => setmensajeEliminacion(""), 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [mensajeEliminacion]);




  async function consultaPaciente(evento) {
    evento.preventDefault();

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

      if (res.ok && Array.isArray(data) && data.length > 0) {
        const encontrado = data[0];
        setpaciente(encontrado);
        setmensaje("Coincidencia encontrada");
      } else {
        setpaciente(null);
        setmensaje("No se encontraron Coincidencias");
      }
    } catch (error) {
      setpaciente(null);
      setmensaje("Error en el servidor, contacte a Soporte IT");
    }
  }

  // CONSTANTE ID PACIENTE CON EL CUAL SE HACEN LAS OPERACIONES CRUD HACIA EL BACKEND. (INDISPENSABLE)
  const id_paciente = paciente?.id_paciente ?? null;
  //--------------------------------------------------------------------------------



async function editarFicha() {
  if (!id_ficha || !id_paciente) {
    setmensaje("Debe seleccionar primero una ficha y paciente especifica");
    return;
  }
  try {
    const res = await fetch('http://localhost:3001/ficha/editarFicha', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          observaciones: normaliza(observaciones),
          anotacionConsulta: normaliza(anotacionConsulta),
          anamnesis: normaliza(anamnesis),
          diagnostico: normaliza(diagnostico),
          indicaciones: normaliza(indicaciones),
          fechaConsulta,
          id_paciente,
          id_ficha
        })
    })
    const data = await res.json();

if (!res.ok ) {
   setmensajeInsercion("Ficha Clinica / Error en el proceso de Guardado / Contacte a Equipo de Soporte");
} else {
     setmensajeInsercion("Ficha clinica actualizada con exito!");
          setobservaciones("");
          setanotacionConsulta("");
          setanamnesis("");
          setdiagnostico("");
          setindicaciones("");
          setfechaConsulta("");
          setid_ficha("");

}
  } catch (error) {
       setmensajeInsercion("Error en el servidor / Contacte a Equipo de Soporte");

  }
  
}



async function seleccionarFichaPorID(id_ficha ) {
  try {
    
    const res = await fetch('http://localhost:3001/ficha/fichaXPaciente', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id_paciente, id_ficha })
    })

    const data = await res.json();



      if (!res.ok || !Array.isArray(data) || data == null) {
        setmensajeEliminacion("Error en el servidor, contacte a Soporte IT");
      } else {

        const f = data[0]
        const fechaISO = (f.fechaConsulta || "").toString();
        const fechaYMD = fechaISO.slice(0,10);


  setfichaSeleccionada(data[0])

setanamnesis(data[0].anamnesis)
setdiagnostico(data[0].diagnostico)
setindicaciones(data[0].indicaciones)
setobservaciones(data[0].observaciones)
setanotacionConsulta(data[0].anotacionConsulta)
setfechaConsulta(fechaYMD)
setid_ficha(id_ficha)

       setmensajeEliminacion("Fichas Clinica seleccionada para edicion.");
      }

  } catch (error) {
          setmensajeEliminacion("Error en el servidor, contacte a Soporte IT");

  }
}






  async function eliminarFicha(id_ficha) {
    try {
      const res = await fetch("http://localhost:3001/ficha/eliminar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_paciente, id_ficha }),
      });

      const data = await res.json();

      if (!res.ok) {
        setmensajeEliminacion("Error en el servidor, contacte a Soporte IT");
      } else {
        cargarFichasClinicas();
        setmensajeEliminacion("Una de las Fichas Clinicas ha sido Eliminada");
      }
    } catch (error) {
      setmensajeEliminacion("Error en el servidor, contacte a Soporte IT");
    }
  }

  async function cargarFichasClinicas(evento) {
    evento.preventDefault();

    if (!id_paciente) {
      setficha([]);
      setfichamensaje("Selecciona un paciente primero");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/ficha/fichadepaciente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_paciente }),
      });

      const data = await res.json();

      if (res.ok && Array.isArray(data) && data.length > 0) {
        setficha(data);
        setfichamensaje("Fichas Clinicas encontradas");
      } else {
        setficha([]);
        setfichamensaje("Fichas Clinicas NO encontradas");
      }
    } catch (error) {
      setficha([]);
      setmensaje("Error en el servidor, contacte a Soporte IT");
    }
  }

  async function insertarFichaPaciente(evento) {
    evento.preventDefault();

    if (!id_paciente) {
      setficha([]);
      setfichamensaje("Selecciona un paciente primero");
      return;
    }
    if (
      !fechaConsulta ||
      !(anamnesis || diagnostico || indicaciones || observaciones)
    ) {
      setmensajeInsercion("Completa fecha y al menos un campo clínico");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/ficha/insertarficha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          observaciones: normaliza(observaciones),
          anotacionConsulta: normaliza(anotacionConsulta),
          anamnesis: normaliza(anamnesis),
          diagnostico: normaliza(diagnostico),
          indicaciones: normaliza(indicaciones),
          fechaConsulta,
          id_paciente,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setmensajeInsercion("Ficha Clinica Guardada Con Exito!");
          setobservaciones("");
          setanotacionConsulta("");
          setanamnesis("");
          setdiagnostico("");
          setindicaciones("");
          setfechaConsulta("");
          
      } else {
        setmensajeInsercion("No fue posible guardar ficha Clinica!");
      }
    } catch (error) {
      setmensajeInsercion("Error en el servidor, contacte a Soporte IT");
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold"> Ficha Clinica Personalizada </h1>
      <br />
      <hr style={{ margin: "20px 0" }} />

      <br />
      <br />

      <form onSubmit={consultaPaciente}>
        <input
          className="w-70 border-2 border-blue-700 bg-white text-black font-bold p-2 rounded-2xl"
          type="text"
          name="rut"
          id="rut"
          value={rut}
          onChange={(evento) => setrut(evento.target.value.toUpperCase())}
          placeholder="Buscar por RUT del paciente"
        />
        <button
                          className="px-4 ml-2 py-2 w-40 rounded-2xl font-semibold bg-white text-blue-800 border-2 
                transition-transform duration-200 ease-in-out hover:translate-y-0.5 hover:bg-blue-200
                active:translate-y-0 active:scale-95"
          type="submit"
        >
          Buscar Paciente
        </button>
      </form>
      <p className="mt-3 font-semibold">{mensaje}</p>

      <br />
      <br />

      <div className="grid grid-cols-2">
        <div>
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
        <div>
          <ul className="font-bold text-md">
            <li className="font-bold text-md">
              TELEFONO:{" "}
              <span className="text-blue-900 font-bold text-md ">
                {" "}
                {paciente?.telefono}
              </span>
            </li>
            <li className="font-bold text-md">
              CORREO:{" "}
              <span className="text-blue-900 font-bold text-md">
                {" "}
                {paciente?.correo}
              </span>{" "}
            </li>
            <li className="font-bold text-md">
              DIRECCION:
              <span className="text-blue-900 font-bold text-md">
                {" "}
                {paciente?.direccion}
              </span>{" "}
            </li>
            <li className="font-bold text-md">
              NACIONALIDAD:{" "}
              <span className="text-blue-900 font-bold text-md">
                {" "}
                {paciente?.pais}
              </span>{" "}
            </li>
          </ul>
        </div>
      </div>
      <br />
      <br />
      <div>
        <button
          type="button" // <- importante para que NO envíe el form
          onClick={cargarFichasClinicas} // <- dispara la carga manual
                                    className="px-4 ml-2 py-2 w-60 rounded-2xl font-semibold bg-white text-blue-800 border-2 
                transition-transform duration-200 ease-in-out hover:translate-y-0.5 hover:bg-blue-200
                active:translate-y-0 active:scale-95"
        >
          Cargar fichas del paciente
        </button>
        <br />

        <hr style={{ margin: "20px 0" }} />
       <h1 className="text-2xl text-blue-900 font-bold">
              OBSERVACIONES / DIAGNOSTICO
            </h1>
        {ficha.length > 0 && (
          <div>
            <p className="whitespace-pre-wrap">{ficha[0].diagnostico}</p>
            <br />
            <br />
          </div>
        )}
      </div>
      <br />
      <hr style={{ margin: "20px 0" }} />
      <br />

      <h1 className="font-bold text-2xl">Ingreso Datos Ficha Clinica</h1>
      <br />

      <form onSubmit={insertarFichaPaciente}>
        <h1 className="font-bold text-2xl">Fecha de consulta</h1>
        <input
          type="date"
          className="bg-white text-black font-bold rounded-2xl p-3 border-2 border-blue-700"
          value={fechaConsulta}
          onChange={(evento) => setfechaConsulta(evento.target.value)} // formato "YYYY-MM-DD"
        />
        <br />
        <br />

        <h1 className="font-bold text-2xl">Anamnesis</h1>
        <textarea
          placeholder="Escribe las anotaciones de la consulta clinica'"
          className="bg-white border-2 border-blue-700 text-base text-black font-bold w-200 h-50 rounded-2xl p-5"
          value={anamnesis}
          onChange={(evento) => setanamnesis(evento.target.value)}
        />

        <br />
        <br />

        <h1 className="font-bold text-2xl">Hipotesis Diagnostica</h1>
        <textarea
          placeholder="Escribe el diagnostico del paciente"
          className="bg-white border-2 border-blue-700 text-base text-black font-bold w-200 h-20 rounded-2xl p-5"
          value={diagnostico}
          onChange={(evento) => setdiagnostico(evento.target.value)}
        />
        <br />
        <br />

        <h1 className="font-bold text-2xl">Indicaciones o Tratamiento</h1>
        <textarea
          placeholder="Escribe que debe hacer el paciente"
          className="bg-white border-2 border-blue-700 text-base text-black font-bold w-200 h-20 rounded-2xl p-5"
          value={indicaciones}
          onChange={(evento) => setindicaciones(evento.target.value)}
        />
        <br />
        <br />

        <h1 className="font-bold text-2xl">Observaciones</h1>
        <textarea
          placeholder="Escribe que debe hacer el paciente"
          className="bg-white border-2 border-blue-700 text-base text-black font-bold w-200 h-20 rounded-2xl p-5"
          value={observaciones}
          onChange={(evento) => setobservaciones(evento.target.value)}
        />
        <br />
        <br />

        <h1 className="font-bold text-2xl">Anotaciones Adicionales</h1>
        <textarea
          placeholder="Escribe que debe hacer el paciente"
          className="bg-white border-2 border-blue-700 text-base text-black font-bold w-200 h-20 rounded-2xl p-5"
          value={anotacionConsulta}
          onChange={(evento) => setanotacionConsulta(evento.target.value)}
        />
        <br />
        <br />

        <div className="flex space-x-3">
          <button
className="px-4 ml-2 py-2 w-80 rounded-2xl font-semibold bg-white text-blue-800 border-2 
                transition-transform duration-200 ease-in-out hover:translate-y-0.5 hover:bg-blue-200
                active:translate-y-0 active:scale-95"            type="submit"
          >
            Guardar Anotaciones de la Consulta
          </button>

          <button
className="px-4 ml-2 py-2 w-60 rounded-2xl font-semibold bg-white text-blue-800 border-2 
                transition-transform duration-200 ease-in-out hover:translate-y-0.5 hover:bg-blue-200
                active:translate-y-0 active:scale-95"
type="button"
            onClick={editarFicha}
            disabled={!id_ficha}
            
          >
            Editar Ficha Seleccionada
          </button>
        </div>
      </form>

      <p>{mensajeInsercion}</p>

      <br />
      <br />

      <div>
        <h1 className="font-bold text-2xl">Datos Historicos - Ficha Clinica</h1>

        {ficha.filter(fichavalida => fichavalida.estadoFicha ===1).map((ficha, index) => (
          <div  key={ficha.id_ficha}>
            <br />
            <hr className="mask-origin-content" />
            <br />
            <h1 className="text-2xl text-blue-800 font-bold">
              Fecha Consulta : <p>{formatearFecha(ficha.fechaConsulta)}</p>
            </h1>
            <br />
            <h1 className="text-2xl text-black font-bold">Anamnesis</h1>
            <p className="whitespace-pre-wrap">{ficha.anamnesis}</p>
            <br />
            <br />

            <h1 className="text-2xl  text-black font-bold">Diagnostico</h1>
            <p className="whitespace-pre-wrap">{ficha.diagnostico}</p>
            <br />
            <br />

            <h1 className="text-2xl  text-black font-bold">
              Indicaciones o Tratamiento
            </h1>
            <p className="whitespace-pre-wrap">{ficha.indicaciones}</p>
            <br />
            <br />


            <h1 className="text-2xl  text-black font-bold">
              Anotacion Consulta
            </h1>
            <p className="whitespace-pre-wrap">{ficha.anotacionConsulta}</p>
            <br />
            <br />


            <h1 className="text-2xl  text-black font-bold">
              Observaciones
            </h1>
            <p className="whitespace-pre-wrap">{ficha.observaciones}</p>
            <br />
            <br />

            <div className="flex space-x-3">
              <button
                type="button" // <- importante para que NO envíe el form
                className="px-4 py-2 w-30 rounded-2xl font-semibold bg-white text-blue-800 border-2 
                transition-transform duration-200 ease-in-out hover:translate-y-0.5 hover:bg-blue-50
                active:translate-y-0 active:scale-95"
                                onClick={()=> {
                  seleccionarFichaPorID(ficha.id_ficha);
                  alert(mensajeEliminacion)
                }}
              >
                Eliminar
              </button>

              <button
                type="button" // <- importante para que NO envíe el form
               className="px-4 py-2 w-30 rounded-2xl font-semibold bg-white text-blue-800 border-2 
                transition-transform duration-200 ease-in-out hover:translate-y-0.5 hover:bg-blue-50
                active:translate-y-0 active:scale-95"
                onClick={()=> {
                  seleccionarFichaPorID(ficha.id_ficha);
                  alert(mensajeEliminacion)
                }}
              >
                Seleccionar
              </button>
              
            </div>
            
          </div>




        ))}
      </div>
      <br /><br /><br />
      

     
           <p
        className={`text-red-600 font-bold text-3xl transition-opacity duration-1000 ${visibleMsg ? 'opacity-100' : 'opacity-0'}`}
      >
        {mensajeEliminacion}
      </p>
   

  

    </div>
  );
}
