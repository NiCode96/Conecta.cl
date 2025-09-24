"use client"
import { useState } from "react";

export default function EdicionCampoTexto(){
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos del formulario:", formData);
        // Aquí luego se hará el fetch PUT/POST para actualizar datos en el servidor
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input 
                        type="text" 
                        name="nombre" 
                        value={formData.nombre} 
                        onChange={handleChange} 
                    />
                </label>
                <br />
                <label>
                    Descripción:
                    <input 
                        type="text" 
                        name="descripcion" 
                        value={formData.descripcion} 
                        onChange={handleChange} 
                    />
                </label>
                <br />
                <button type="submit">Guardar</button>
            </form>
        </div>
    )
}