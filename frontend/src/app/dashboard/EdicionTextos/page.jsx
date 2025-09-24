"use client";

import { da } from "date-fns/locale";
import { useEffect, useState } from "react";

export default function EdicionTextos() {
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [mensajeSubTitulo, setmensajeSubTitulo] = useState("");
  const [mensajeSobreNosotros, setmensajeSobreNosotros] = useState("");
  const [mensajeProyectos, setmensajeProyectos] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [MensajeContacto, setMensajeContacto] = useState("");
  const [MensajeTexto1, setMensajeTexto1] = useState("");
  const [MensajeTexto2, setMensajeTexto2] = useState("");
  const [nuevoSubtitulo, setNuevoSubtitulo] = useState("");
  const [nuevoSobreNosotros, setNuevoSobreNosotros] = useState("");
  const [nuevoTituloProyecto, setnuevoTituloProyecto] = useState("");
  const [contactoTitulo, setcontactoTitulo] = useState("");
  const [texto1, settexto1] = useState("");
  const [texto2, settexto2] = useState("");
  const [titulo, settitulo] = useState("");
  const [subtitulo, setsubtitulo] = useState("");
  const [sobreNosotros, setsobreNosotros] = useState("");
  const [tituloProyectos, settituloProyectos] = useState("");
  const [tituloContacto, settituloContacto] = useState("");
  const [primerParrafo, setprimerParrafo] = useState("");
  const [segundoParrafo, setsegundoParrafo] = useState("");

  async function cargarTitulos() {
    try {
      const res = await fetch("http://localhost:3001/titulo");
      if (!res.ok) {
        throw new Error(
          "Problema en consulta a base de datos contacte equipo de soporte"
        );
      } else {
        const data = await res.json();

        let tituloPrincipal = null;
        let subtitulo = null;
        let nosotros = null;
        let tituloProyectos = null;
        let tituloContacto = null;
        let parrafo1 = null;
        let parrafo2 = null;

        if (Array.isArray(data)) {
          const objetoEncontrado1 = data.find(
            (item) => Number(item.id_titulo) === 1
          );
          const objetoEncontrado2 = data.find(
            (item) => Number(item.id_titulo) === 2
          );
          const objetoEncontrado3 = data.find(
            (item) => Number(item.id_titulo) === 3
          );
          const objetoEncontrado4 = data.find(
            (item) => Number(item.id_titulo) === 4
          );
          const objetoEncontrado5 = data.find(
            (item) => Number(item.id_titulo) === 5
          );
          const objetoEncontrado6 = data.find(
            (item) => Number(item.id_titulo) === 6
          );
          const objetoEncontrado7 = data.find(
            (item) => Number(item.id_titulo) === 7
          );

          tituloPrincipal = objetoEncontrado1;
          subtitulo = objetoEncontrado2;
          nosotros = objetoEncontrado3;
          tituloProyectos = objetoEncontrado4;
          tituloContacto = objetoEncontrado5;
          parrafo1 = objetoEncontrado6;
          parrafo2 = objetoEncontrado7;
        }

        if (tituloPrincipal) {
          if (typeof tituloPrincipal.titulo === "string") {
            settitulo(tituloPrincipal.titulo);
          }
        }

        if (subtitulo) {
          if (typeof subtitulo.titulo === "string") {
            setsubtitulo(subtitulo.titulo);
          }
        }

        if (nosotros) {
          if (typeof nosotros.titulo === "string") {
            setsobreNosotros(nosotros.titulo);
          }
        }

        if (tituloProyectos) {
          if (typeof tituloProyectos.titulo === "string") {
            settituloProyectos(tituloProyectos.titulo);
          }
        }

        if (tituloContacto) {
          if (typeof tituloContacto.titulo === "string") {
            settituloContacto(tituloContacto.titulo);
          }
        }

        if (parrafo1) {
          if (typeof parrafo1.titulo === "string") {
            setprimerParrafo(parrafo1.titulo);
          }
        }

        if (parrafo2) {
          if (typeof parrafo2.titulo === "string") {
            setsegundoParrafo(parrafo2.titulo);
          }
        }
      }
    } catch (error) {
      settitulo("❌ Problemas en comunicación con el servidor");
    }
  }

  useEffect(() => {
    cargarTitulos();
  }, []);

  async function cargarTextos() {
    try {
      const res = await fetch("http://localhost:3001/textos");
      if (!res.ok) {
        throw new Error(
          "Problema en consulta a base de datos contacte equipo de soporte"
        );
      } else {
        const data = await res.json();

        let parrafo1 = null;
        let parrafo2 = null;

        if (Array.isArray(data)) {
          const objetoEncontrado1 = data.find(
            (item) => Number(item.id_Textos) === 1
          );
          const objetoEncontrado2 = data.find(
            (item) => Number(item.id_Textos) === 2
          );

          parrafo1 = objetoEncontrado1;
          parrafo2 = objetoEncontrado2;
        }

        if (parrafo1) {
          if (typeof parrafo1.contenido === "string") {
            setprimerParrafo(parrafo1.contenido);
          }
        }

        if (parrafo2) {
          if (typeof parrafo2.contenido === "string") {
            setsegundoParrafo(parrafo2.contenido);
          }
        }
      }
    } catch (error) {
      settitulo("❌ Problemas en comunicación con el servidor");
    }
  }

  useEffect(() => {
    cargarTextos();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/titulo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nuevoTitulo }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje("✅ " + data.message);
      } else {
        setMensaje("❌ " + data.error);
      }
    } catch (err) {
      setMensaje("❌ Error de conexión con el backend");
    }
  }

  async function handleUpdateSubtitulo(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/titulo/subtitulo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nuevoSubtitulo }),
      });

      const data = await res.json();

      if (res.ok) {
        setmensajeSubTitulo("✅ " + data.message);
      } else {
        setmensajeSubTitulo("❌ " + data.error);
      }
    } catch (err) {
      setMensaje("❌ Error de conexión con el backend");
    }
  }

  async function handleUpdateSobreNosotros(event) {
    event.preventDefault();
    if (!nuevoSobreNosotros || !nuevoSobreNosotros.trim()) {
      setMensaje("❌ Debes escribir un texto para 'Sobre nosotros'");
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/titulo/sobrenosotros", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nuevoSobreNosotros: (nuevoSobreNosotros || "").trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setmensajeSobreNosotros("✅ " + data.message);
      } else {
        setmensajeSobreNosotros("❌ " + data.error);
      }
    } catch (err) {
      setmensajeSobreNosotros("❌ Error de conexión con el backend");
    }
  }

  async function handleSubmitProyectos(evento) {
    evento.preventDefault(); //sirve para detener el comportamiento por defecto que tiene un evento en el navegador.

    try {
      const res = await fetch("http://localhost:3001/titulo/proyectos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nuevoTituloProyecto }),
      });

      const data = await res.json();

      if (res.ok) {
        setmensajeProyectos(
          "✅ Se ha cambiado el titulo de la seccion Portafolio/Proyectos"
        );
      } else {
        setmensajeProyectos("❌ No se ha podido cambiar el titulo ");
      }
    } catch (error) {
      setmensajeProyectos("❌ Error de conexión con el backend");
    }
  }

  async function handleSubmitContacto(evento) {
    evento.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/titulo/contacto", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactoTitulo }),
      });
      const data = await res.json();
      if (res.ok) {
        setMensajeContacto(
          "✅ Se ha cambiado el titulo de la seccion Contacto"
        );
      } else {
        setMensajeContacto(
          "❌ No se ha podido cambiar el titulo de la seccion Contacto"
        );
      }
    } catch (error) {
      setMensajeContacto("❌ Error de conexión con el backend");
    }
  }

  async function handleSubmitText1(event) {
    event.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/textos/texto1", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto1 }),
      });
      const data = await res.json();

      if (res.ok) {
        setMensajeTexto1("✅ Parrafo Cambiado Correctamente");
      } else {
        setMensajeTexto1("❌ " + data.error);
      }
    } catch (err) {
      setMensajeTexto1("❌ Error de conexión con el backend");
    }
  }

  async function handleSubmitText2(event) {
    event.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/textos/texto2", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto2 }),
      });
      const data = await res.json();

      if (res.ok) {
        setMensajeTexto2("✅ Parrafo Cambiado Correctamente");
      } else {
        setMensajeTexto2("❌ " + data.error);
      }
    } catch (err) {
      setMensajeTexto2("❌ Error de conexión con el backend");
    }
  }

  return (
    <div>
      <h1 className="text-6xl font-bold pl-20"> Edicion de Pagina Web</h1>
      <div className="p-20">






        {/** CAMPOS DE TEXTOS: TEXTO ACTUAL */}
        <h1 className="p-2 font-black text-blue-900">Texto Actual:</h1>
        <div className="overflow-hidden border-2 border-sky-400 bg-sky-100 rounded-2xl inline-block max-w-full p-2 items-start">
          <h1 className="">{titulo}</h1>
        </div><br />


        <h1 className="text-2xl font-bold">Editar Título Principal</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={nuevoTitulo}
            onChange={(e) => setNuevoTitulo(e.target.value)}
            placeholder="Escribe el nuevo título"
            className="bg-white border-2 border-blue-800 text-base text-black font-bold w-200 rounded-2xl p-5"
          />
          <br />
          <button
            className="px-4 py-2 w-60 rounded-2xl font-semibold bg-white text-blue-800 border-2 
                transition-transform duration-200 ease-in-out hover:translate-y-0.5 hover:bg-blue-50
                active:translate-y-0 active:scale-95"
            type="submit"
          >
            Guardar cambios
          </button>
          <br />
          {mensaje && <p>{mensaje}</p>}
        </form>

        <br />
        <hr style={{ margin: "20px 0" }} />
        <br />




              {/** CAMPOS DE TEXTOS: TEXTO ACTUAL */}
        <h1 className="p-2 font-black text-blue-900">Texto Actual:</h1>
        <div className="overflow-hidden border-2 border-sky-400 bg-sky-100 rounded-2xl inline-block max-w-full p-2  items-start">
          <h1 className="p-2">{subtitulo}</h1>
        </div><br />




        <h2 className="text-2xl font-bold">Editar Subtítulo</h2>
        <form onSubmit={handleUpdateSubtitulo}>
          <textarea
            value={nuevoSubtitulo}
            onChange={(e) => setNuevoSubtitulo(e.target.value)}
            placeholder="Escribe el nuevo subtítulo"
            className="bg-white border-2 border-blue-800 text-base text-black font-bold w-200 rounded-2xl p-5"
          />
          <br />

          <button
            className="px-4 py-2 w-60 rounded-2xl font-semibold bg-white text-blue-800 border-2 
                transition-transform duration-200 ease-in-out hover:translate-y-0.5 hover:bg-blue-50
                active:translate-y-0 active:scale-95"
            type="submit"
          >
            Guardar subtítulo
          </button>
          <br />
          {mensajeSubTitulo && <p>{mensajeSubTitulo}</p>}
        </form>

        <br />
        <hr style={{ margin: "20px 0" }} />
        <br />


             {/** CAMPOS DE TEXTOS: TEXTO ACTUAL */}
        <h1 className="font-black text-blue-900">Texto Actual:</h1>
        <div className="overflow-hidden border-2 border-sky-400 bg-sky-100 rounded-2xl inline-block max-w-full items-start">
          <h1 className="p-2"> {sobreNosotros}</h1>
        </div><br />



        <h2 className="text-2xl font-bold">Editar Titulo : Acerca de</h2>
        <form onSubmit={handleUpdateSobreNosotros}>
         
          <textarea
            value={nuevoSobreNosotros}
            onChange={(event) => setNuevoSobreNosotros(event.target.value)}
            placeholder="Escribe el nuevo 'Sobre nosotros'"
            className="bg-white border-2 border-blue-800 text-base text-black font-bold w-200 rounded-2xl p-5"
          />
          <br />
          <button
            className="px-4 py-2 w-60 rounded-2xl font-semibold bg-white text-blue-800 border-2 
                transition-transform duration-200 ease-in-out hover:translate-y-0.5 hover:bg-blue-50
                active:translate-y-0 active:scale-95"
            type="submit"
          >
            Guardar Sobre Nosotros
          </button>
          <br /> {mensajeSobreNosotros && <p>{mensajeSobreNosotros}</p>}
        </form>

        <br />
        <hr style={{ margin: "20px 0" }} />
        <br />




        
         {/** CAMPOS DE TEXTOS: PROYECTO TITULOS */}
        <h1 className="p-2 font-black text-blue-900">Texto Actual:</h1>
        <div className="overflow-hidden border-2 border-sky-400 bg-sky-100 rounded-2xl  inline-block max-w-full items-start">
          <h1 className="p-2"> {tituloProyectos}</h1>
        </div><br />

        <h2 className="text-2xl font-bold">Editar titulo Proyectos</h2>
        <form onSubmit={handleSubmitProyectos}>
          
          <textarea
            value={nuevoTituloProyecto}
            onChange={(evento) => setnuevoTituloProyecto(evento.target.value)}
            placeholder="Nuevo titulo de la seccion Proyectos"
            className="bg-white border-2 border-blue-800 text-base text-black font-bold w-200 rounded-2xl p-5"
          ></textarea>
          <br />
          <button
            className="px-4 py-2 w-60 rounded-2xl font-semibold bg-white text-blue-800 border-2 
                transition-transform duration-200 ease-in-out hover:translate-y-0.5 hover:bg-blue-50
                active:translate-y-0 active:scale-95"
            type="submit"
          >
            Guardar titulo Proyecto
          </button>
          <br />
          {mensajeProyectos && <p>{mensajeProyectos}</p>}
        </form>

        <br />
        <hr style={{ margin: "20px 0" }} />
        <br />



             {/** CAMPOS DE TEXTOS: TITULO CONTACTO */}
        <h1 className="p-2 font-black text-blue-900">Texto Actual:</h1>
        <div className="overflow-hidden border-2 border-sky-400 bg-sky-100 rounded-2xl inline-block max-w-full items-start">
          <h1 className="p-2"> {tituloContacto}</h1>
        </div><br />


        <h2 className="text-2xl font-bold">Editar titulo Contacto</h2>
        <form onSubmit={handleSubmitContacto}>
          
          <textarea
            value={contactoTitulo}
            onChange={(evento) => setcontactoTitulo(evento.target.value)}
            placeholder="Nuevo titulo de la seccion contacto"
            className="bg-white text-base border-2 border-blue-800 text-black font-bold w-200 rounded-2xl p-5"
          ></textarea>
          <br />
          <button
            className="px-4 py-2 w-60 rounded-2xl font-semibold bg-white text-blue-800 border-2 
                transition-transform duration-200 ease-in-out hover:translate-y-0.5 hover:bg-blue-50
                active:translate-y-0 active:scale-95"
            type="submit"
          >
            Guardar titulo Contacto
          </button>
          <br />
          {MensajeContacto && <p>{MensajeContacto}</p>}
        </form>

        <br />
        <hr style={{ margin: "20px 0" }} />
        <br />






             {/** CAMPOS DE TEXTOS: PARRAFO 1 */}
        <h1 className="p-2 font-black text-blue-900">Texto Actual:</h1>
        <div className="overflow-hidden border-2 border-sky-400 bg-sky-100 rounded-2xl inline-block max-w-full items-start">
          <h1 className="p-2">   {primerParrafo}</h1>
        </div><br />

        <h2 className="text-2xl font-bold">Editar Primer Parrafo</h2>
        <form onSubmit={handleSubmitText1}>
        
          <br></br>
          <textarea
            value={texto1}
            onChange={(event) => settexto1(event.target.value)}
            placeholder="Nuevo texto Parrafo"
            className="bg-white  border-2 border-blue-800 text-base text-black font-bold w-200 rounded-2xl p-5"
          ></textarea>{" "}
          <br />
          <button
            className="px-4 py-2 w-60 rounded-2xl font-semibold bg-white text-blue-800 border-2 
                transition-transform duration-200 ease-in-out hover:translate-y-0.5 hover:bg-blue-50
                active:translate-y-0 active:scale-95"
            type="submit"
          >
            Guardar Parrafo
          </button>
          <br />
          {MensajeTexto1 && <p>{MensajeTexto1}</p>}
        </form>

        <br />
        <hr style={{ margin: "20px 0" }} />
        <br />







                     {/** CAMPOS DE TEXTOS: PARRAFO 2 */}
        <h1 className="p-2 font-black text-blue-900">Texto Actual:</h1>
        <div className="overflow-hidden border-2 border-sky-400 bg-sky-100 rounded-2xl  inline-block max-w-full items-start">
          <h1 className="p-2">{segundoParrafo}</h1>
        </div><br />


        <h2 className="text-2xl font-bold">Editar Segundo Parrafo</h2>
        <form onSubmit={handleSubmitText2}>
          
          <br></br>
          <textarea
            value={texto2}
            onChange={(event) => settexto2(event.target.value)}
            placeholder="Nuevo texto Parrafo"
            className="bg-white border-2 border-blue-800 text-base text-black font-bold w-200 rounded-2xl p-5"
          ></textarea>
          <br />
          <button
            className="px-4 py-2 w-60 rounded-2xl font-semibold bg-white text-blue-800 border-2 
                transition-transform duration-200 ease-in-out hover:translate-y-0.5 hover:bg-blue-50
                active:translate-y-0 active:scale-95"
            type="submit"
          >
            Guardar Parrafo
          </button>
        </form>
        <br />
        <br />
        {MensajeTexto2 && <p>{MensajeTexto2}</p>}
      </div>
    </div>
  );
}
