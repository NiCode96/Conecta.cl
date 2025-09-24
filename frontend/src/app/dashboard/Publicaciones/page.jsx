"use client";
import { useState } from "react";

export default function EdicionTextos() {
  // Estado del formulario
  const [formData, setFormData] = useState({
    titulo: "",
    subtitulo: "",
    descripcion: "",
  });

  // Lista de proyectos agregados (local)
  const [proyectos, setProyectos] = useState([]);
  // Índice seleccionado en el combobox
  const [seleccionado, setSeleccionado] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Agrega el proyecto a la lista local
    setProyectos((prev) => [...prev, formData]);
    console.log("Proyecto agregado:", formData);
    // Limpia el formulario
    setFormData({ titulo: "", subtitulo: "", descripcion: "" });
  };

  const handleSeleccion = (e) => {
    setSeleccionado(e.target.value);
  };

  const handleEliminar = () => {
    if (seleccionado === "") return;
    const index = parseInt(seleccionado, 10);
    setProyectos((prev) => prev.filter((_, i) => i !== index));
    setSeleccionado("");
  };

  return (
    <div className="p-6">
      <h1 className=" tituloResponsive font-semibold mb-4">
        Gestion de Publicaciones
      </h1>

      {/* Formulario para añadir proyectos */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1">Titulo Publicacion</label>
          <textarea
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-white rounded text-black bg-white"
            rows={1}
          />
        </div>

        <div>
          <label className="block mb-1">Descripcion Breve de la Publicacion</label>
          <textarea
            name="subtitulo"
            value={formData.subtitulo}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-white rounded text-black bg-white"
            rows={1}
          />
        </div>

        <div>
          <label className="block mb-1">Descripcion del Detallada</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-white rounded text-black bg-white"
            rows={4}
          />
        </div>



        <div>
  <label className="block mb-1">Subir Imagen 1</label>
  <input
    type="file"
    name="imagen"
    accept="image/*"
    className="w-full px-3 py-2 border border-white rounded bg-white text-black"
    onChange={(e) => {
      const file = e.target.files[0];
      console.log("Imagen seleccionada:", file);
      // aquí podrías subirla al backend
    }}
  />
</div>


        <div>
  <label className="block mb-1">Subir Imagen 2</label>
  <input
    type="file"
    name="imagen"
    accept="image/*"
    className="w-full px-3 py-2 border border-white rounded bg-white text-black"
    onChange={(e) => {
      const file = e.target.files[0];
      console.log("Imagen seleccionada:", file);
      // aquí podrías subirla al backend
    }}
  />
</div>




        <div>
  <label className="block mb-1">Subir Imagen 3</label>
  <input
    type="file"
    name="imagen"
    accept="image/*"
    className="w-full px-3 py-2 border border-white rounded bg-white text-black"
    onChange={(e) => {
      const file = e.target.files[0];
      console.log("Imagen seleccionada:", file);
      // aquí podrías subirla al backend
    }}
  />
</div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition w-70"
        >
          Guardar
        </button>
      </form>

      <br />
      <br />
      <br />
      {/* Combobox de proyectos ya agregados */}
      <div className="mb-6  items-center gap-3">
        <div className="flex-1">
          <label className="block mb-1">Proyectos agregados</label>
          <select
            value={seleccionado}
            onChange={handleSeleccion}
            className="w-full px-3 py-2 border border-white rounded text-black bg-white"
          >
            <option value="">-- Selecciona un proyecto --</option>
            {proyectos.map((p, i) => (
              <option key={i} value={i}>
                {p.titulo || `Proyecto ${i + 1}`}
              </option>
            ))}
          </select>
        </div>
        <br />
        <button
          type="button"
          onClick={handleEliminar}
          disabled={seleccionado === ""}
          className="bg-red-600 w-70 text-white px-4 py-3 rounded hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
