"use client";
import { useState } from "react";

export default function FormularIngresoCliente() {
  const [nombre, setnombre] = useState("");
  const [apellido, setapellido] = useState("");
  const [rut, setrut] = useState("");
  const [nacimiento, setnacimiento] = useState("");
  const [sexo, setsexo] = useState("");
  const [prevision_id, setprevision_id] = useState("");
  const [telefono, settelefono] = useState("");
  const [correo, setcorreo] = useState("");
  const [direccion, setdireccion] = useState("");
  const [pais, setpais] = useState("");
  const [mensaje, setmensaje] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmitInsert(evento) {
    try {
      evento.preventDefault();
      setIsSubmitting(true);
      const res = await fetch("http://localhost:3001/pacientes/pacientesInsercion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          apellido,
          rut,
          nacimiento,
          sexo,
          prevision_id,
          telefono,
          correo,
          direccion,
          pais,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setmensaje("Nuevo Paciente Ingresado Correctamente");
        setnombre("");
        setapellido("");
        setrut("");
        setnacimiento("");
        setsexo("");
        setprevision_id("");
        settelefono("");
        setcorreo("");
        setdireccion("");
        setpais("");
      } else {
        setmensaje(
          "Nuevo Paciente NO se pudo ingresar / Contacte a Soporte IT"
        );
      }
    } catch (error) {
      console.error(error);
      setmensaje("Ocurrió un error inesperado. Inténtalo nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold">Ingreso y Busqueda de Pacientes</h1>
        <br />
        <hr style={{ margin: "20px 0" }} />
        <br />

        <form onSubmit={handleSubmitInsert}>
          <div className="grid grid-cols-2">
            <div className="grid grid-cols-1 ">
              <div>
                <label className="text-2xl font-bold mr-3" htmlFor="nombre">
                  Nombre:
                </label>
                <br />
                <input
                  className="w-80 border-2 border-blue-800 bg-white text-black font-bold p-2 rounded-2xl"
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Ej: Jhon"
                  value={nombre} // <- estado de useState
                  onChange={(evento) => setnombre(evento.target.value.toUpperCase())} // <- actualiza el estado
                  required
                />
              </div><br />

              <div>
                <label className="text-2xl font-bold mr-3" htmlFor="">
                  Apellido:
                </label>
                <br />

                <input
                  className="w-80 border-2 border-blue-800 bg-white text-black font-bold p-2 rounded-2xl"
                  type="text"
                  name="apellido"
                  id="apellido"
                  placeholder="Ej: Wick"
                  value={apellido} // <- estado de useState
                  onChange={(evento) => setapellido(evento.target.value.toUpperCase())} // <- actualiza el estado
                  required
                />
              </div>
              <br />
              

              <div>
                <label className="text-2xl font-bold mr-3" htmlFor="">
                  RUT:
                </label>
                <br />
                

                <input
                  className="w-80 border-2 border-blue-800 bg-white text-black font-bold p-2 rounded-2xl"
                  type="text"
                  name="rut"
                  id="rut"
                  placeholder="Ej (Sin puntos ni guion): 191675878"
                  value={rut} // <- estado de useState
                  onChange={(evento) => setrut(evento.target.value.toUpperCase())} // <- actualiza el estado
                  required
                />
              </div>
              <br />
              

              <div>
                <label className="text-2xl font-bold mr-3" htmlFor="">
                  F. Nacimiento:
                </label>
                <br />

                <input
                  className="w-80 border-2 border-blue-800 bg-white text-black font-bold p-2 rounded-2xl"
                  type="date"
                  name="nacimiento"
                  id="nacimiento"
                  value={nacimiento} // <- estado de useState
                  onChange={(evento) => setnacimiento(evento.target.value)} // <- actualiza el estado
                />
              </div>
              <br />
              

              <div>
                <label className="text-2xl font-bold mr-3" htmlFor="">
                  Sexo:
                </label>
                <br />
                <select
                  className="w-80 border-2 border-blue-800 bg-white text-black font-bold p-2 rounded-2xl"
                  name="sexo"
                  id="sexo"
                  value={sexo}
                  onChange={(evento) => setsexo(evento.target.value)}
                  required
                >
                  <option value="">Selecciona…</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMENINO">Femenino</option>
                  <option value="OTRO">Otro</option>
                </select>
              </div>
              <br />
             
            </div>

            <div className="grid grid-cols-1 ">
              <div>
                <label className="text-2xl font-bold mr-3" htmlFor="">
                  Prevision:
                </label>
                <br />

                <select
                  className="w-80 border-2 border-blue-800 bg-white text-black font-bold p-2 rounded-2xl"
                  name="prevision_id"
                  id="prevision_id"
                  value={prevision_id}
                  onChange={(evento) => setprevision_id(parseInt(evento.target.value) || "")}
                  required
                >
                  <option value="">Selecciona…</option>
                  <option value="1">Fonasa</option>
                  <option value="2">Isapre</option>
                  <option value="3">Otro</option>
                </select>
              </div>
              <br />
              

              <div>
                <label className="text-2xl font-bold mr-3" htmlFor="">
                  Telefno:
                </label>
                <br />

                <input
                  className="w-80 border-2 border-blue-800 bg-white text-black font-bold p-2 rounded-2xl"
                  type="tel"
                  name="telefono"
                  id="telefono"
                  placeholder="Ej: +56 9 2344 3315"
                  value={telefono} // <- estado de useState
                  onChange={(evento) => settelefono(evento.target.value)} // <- actualiza el estado
                />
              </div>
              <br />
          

              <div>
                <label className="text-2xl font-bold mr-3" htmlFor="">
                  Correo:
                </label>
                <br />

                <input
                  className="w-80 border-2 border-blue-800 bg-white text-black font-bold p-2 rounded-2xl"
                  type="email"
                  name="correo"
                  id="correo"
                  placeholder="Ej: jhon.wick@gmail.com"
                  value={correo} // <- estado de useState
                  onChange={(evento) => setcorreo(evento.target.value.toUpperCase())} // <- actualiza el estado
                />
              </div>
              <br />
              

              <div>
                <label className="text-2xl font-bold mr-3" htmlFor="">
                  Direccion:
                </label>
                <br />

                <input
                  className="w-80 border-2 border-blue-800 bg-white text-black font-bold p-2 rounded-2xl"
                  type="text"
                  name="direccion"
                  id="direccion"
                  placeholder="Ej: Avenida Siempre Viva 123"
                  value={direccion} // <- estado de useState
                  onChange={(evento) => setdireccion(evento.target.value)} // <- actualiza el estado
                />
              </div>
              <br />
             

              <div>
                <label className="text-2xl font-bold mr-3" htmlFor="">
                  Pais:
                </label>
                <br />

                <input
                  className="w-80 border-2 border-blue-800 bg-white text-black font-bold p-2 rounded-2xl"
                  type="text"
                  name="pais"
                  id="pais"
                  placeholder="Ej: Wackanda"
                  value={pais} // <- estado de useState
                  onChange={(evento) => setpais(evento.target.value.toUpperCase())} // <- actualiza el estado
                />
              </div>
              <br />
              
            </div>
          </div>

          <button
                     className="px-4 py-2 w-50 rounded-2xl font-semibold bg-white text-blue-800 border-2 
                transition-transform duration-200 ease-in-out hover:translate-y-0.5 hover:bg-blue-50
                active:translate-y-0 active:scale-95"
type="submit"
          >
            Guardar Datos
          </button>
          {isSubmitting && <span className="ml-4 text-sm">Guardando…</span>}
          {mensaje && (
            <p className="mt-3 text-sm">{mensaje}</p>
          )}
        </form>
      </div>
    </div>
  );
}
