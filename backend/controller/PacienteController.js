import Paciente from "../model/Pacientes.js";


export default class PacienteController {
    constructor(){

    }



    static async seleccionarTodosPacientes(req, res){
    try {
        const paciente = new Paciente();
        const dataPaciente = await paciente.selectPaciente();
        return res.json(dataPaciente);
        
    } catch (error) {
res.status(500).json({
  error: "No se ha podido realizar la consulta desde PacienteController"
});        
    }
    }


    static async seleccionarPacienteEspecifico(req, res){
        try {
            console.log(req.body)
            const {rut} = req.body;

            if (!rut) {
                return res.status(400).json({message : 'No se puede seleccionar paciente porque el parametro body viene vacio'})
            }

            const paciente = new Paciente();
            const resultado = await paciente.selectPacienteEspecifico(rut);
            return res.json(resultado)

        } catch (error) {
            res.status(500).json({
  error: "No se ha podido realizar la consulta desde PacienteController"
}); 
            
        }
    }






static async seleccionarCoincidenciaRUT(req, res){
        try {
            console.log(req.body)
            const {rut} = req.body;

            if (!rut) {
                return res.status(400).json({message : 'No se puede seleccionar paciente porque el parametro body viene vacio'})
            }

            const paciente = new Paciente();
            const resultado = await paciente.PacienteParecidoRut(rut)
            return res.json(resultado)

        } catch (error) {
            res.status(500).json({
  error: "No se ha podido realizar la consulta desde PacienteController"
}); 
            
        }
    }







    static async seleccionarCoincidenciaNombre(req, res){
        try {
            console.log(req.body)
            const {nombre} = req.body;

            if (!nombre) {
                return res.status(400).json({message : 'No se puede seleccionar paciente porque el parametro body viene vacio'})
            }

            const paciente = new Paciente();
            const resultado = await paciente.PacienteParecidoNombre(nombre);
            return res.json(resultado);

        } catch (error) {
            res.status(500).json({
  error: "No se ha podido realizar la consulta desde PacienteController"
}); 
            
        }
    }




static async insertarPacienteNuevo(req, res){
        try {
            console.log(req.body)
            const {nombre,apellido,rut,nacimiento,sexo,prevision_id,telefono,correo,direccion,pais} = req.body;

            if (!nombre || !apellido || !rut || !nacimiento || !sexo || !prevision_id || !telefono || !correo || !direccion || !pais) {
    return res.status(400).json({message : 'Faltan datos obligatorios en el body'})
}

            const paciente = new Paciente();
            const resultado = await paciente.insertPaciente(nombre,apellido,rut,nacimiento,sexo,prevision_id,telefono,correo,direccion,pais);
            return res.json(resultado)

        } catch (error) {
            res.status(500).json({
  error: "No se ha podido realizar la consulta desde PacienteController"
}); 
            
        }

    }








static async actualizarPaciente(req, res){
        try {
            console.log(req.body)
            const {nombre,apellido,rut,nacimiento,sexo,prevision_id,telefono,correo,direccion,pais,id_paciente } = req.body;

            if (!nombre || !apellido || !rut || !nacimiento || !sexo || !prevision_id || !telefono || !correo || !direccion || !pais || !id_paciente) {
    return res.status(400).json({message : 'Faltan datos obligatorios en el body'})
}

            const paciente = new Paciente();
            const resultado = await paciente.updatePaciente(nombre,apellido,rut,nacimiento,sexo,prevision_id,telefono,correo,direccion,pais,id_paciente);
            return res.json(resultado)

        } catch (error) {
            res.status(500).json({
  error: "No se ha podido realizar la consulta desde PacienteController"
}); 
            
        }

    }








static async eliminarPaciente(req, res){
        try {
            console.log(req.body)
            const {id_paciente} = req.body;

            if (!id_paciente) {
    return res.status(400).json({message : 'Faltan datos obligatorios en el body'})
}
            const paciente = new Paciente();
            const resultado = await paciente.deletePaciente(id_paciente);
            return res.json(resultado)

        } catch (error) {
            res.status(500).json({
  error: "No se ha podido realizar la consulta desde PacienteController"
}); 
        }

    }



}