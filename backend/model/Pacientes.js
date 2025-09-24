import DataBase from "../config/DataBase.js";

export default class Pacientes {
  constructor(
    id_paciente,
    estado_paciente,
    nombre,
    apellido,
    rut,
    nacimiento,
    sexo,
    prevision_id,
    telefono,
    correo,
    direccion,
    pais
  ) {
    this.id_paciente = id_paciente;
    this.estado_paciente = estado_paciente;
    this.nombre = nombre;
    this.apellido = apellido;
    this.rut = rut;
    this.nacimiento = nacimiento;
    this.sexo = sexo;
    this.prevision_id = prevision_id;
    this.telefono = telefono;
    this.correo = correo;
    this.direccion = direccion;
    this.pais = pais;
  }


  // SELECCION DE TODOS LOS PACIENTES DE LA BASE DE DATOS
  async selectPaciente(){
    const conexion = DataBase.getInstance();
    const query = 'SELECT * FROM pacienteDatos';
try {
    const resultado = await conexion.ejecutarQuery(query);
    return resultado;
} catch (error) {
    throw new Error('Problema al establecer la conexion con la base de datos desde la clase Pacientes.js')
    
}  
  }


//SELECCION DE PACIENTE ESPECIFICO POR RUT
   async selectPacienteEspecifico(rut){
    const conexion = DataBase.getInstance();
    const query = 'SELECT * FROM pacienteDatos WHERE rut = ?';
    const param = [rut]
try {
    const resultado = await conexion.ejecutarQuery(query, param);
    return resultado;
} catch (error) {
    throw new Error('No se puede seleccionar paciente especifico / Problema al establecer la conexion con la base de datos desde la clase Pacientes.js')
}  
  }


  //SELECCION DE PACIENTE POR -----> RUT %PARECIDO% <------
   async PacienteParecidoRut(rut){
    const conexion = DataBase.getInstance();
    const query = 'SELECT * FROM pacienteDatos WHERE rut LIKE ?';
    const param = [`%${rut}%`]
try {
    const resultado = await conexion.ejecutarQuery(query, param);
    return resultado;
} catch (error) {
    throw new Error('No se puede seleccionar paciente / Problema al establecer la conexion con la base de datos desde la clase Pacientes.js')
}  
  }





    //SELECCION DE PACIENTE POR -----> NOMBRE %PARECIDO% <------
   async PacienteParecidoNombre(nombre){
    const conexion = DataBase.getInstance();
    const query = 'SELECT * FROM pacienteDatos WHERE nombre LIKE ?';
    const param = [`%${nombre}%`]
try {
    const resultado = await conexion.ejecutarQuery(query, param);
    return resultado;
} catch (error) {
    throw new Error('No se puede seleccionar paciente / Problema al establecer la conexion con la base de datos desde la clase Pacientes.js')
}  
  }





// ACTUALIZACION DE PACIENTE POR ID
async updatePaciente(nombre,apellido,rut,nacimiento,sexo,prevision_id,telefono,correo,direccion,pais,id_paciente){
    const conexion = DataBase.getInstance();
    const query = 'UPDATE pacienteDatos SET nombre= ? ,apellido = ? , rut = ?, nacimiento = ?, sexo = ?, prevision_id = ?, telefono = ?, correo = ? , direccion = ?, pais = ?  WHERE id_paciente = ?';
    const param = [nombre,apellido,rut,nacimiento,sexo,prevision_id,telefono,correo,direccion,pais,id_paciente ];
try {
    const resultado = await conexion.ejecutarQuery(query,param);
    const filasAfectadas = resultado.affectedRows;
    if (filasAfectadas !== undefined && filasAfectadas !== null) {
      return filasAfectadas;
    } else {
      return resultado;
      
    }
} catch (error) {
    throw new Error('NO se logo actualizar paciente  / Problema al establecer la conexion con la base de datos desde la clase Pacientes.js')
    
}  
  }



// INSERCION DE NUEVO PACIENTE EN LA BASE DE DATOS
  async insertPaciente(nombre,apellido,rut,nacimiento,sexo,prevision_id,telefono,correo,direccion,pais){
    const conexion = DataBase.getInstance();
    const query = 'INSERT INTO pacienteDatos (nombre,apellido,rut,nacimiento,sexo,prevision_id,telefono,correo,direccion,pais) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const param = [nombre,apellido,rut,nacimiento,sexo,prevision_id,telefono,correo,direccion,pais];
try {
    const resultado = await conexion.ejecutarQuery(query,param);
    const filasAfectadas = resultado.affectedRows;
    if (filasAfectadas !== undefined && filasAfectadas !== null) {
      return filasAfectadas;
    } else {
      return resultado;
      
    }
} catch (error) {
    throw new Error('NO se logo ingresar paciente nuevo / Problema al establecer la conexion con la base de datos desde la clase Pacientes.js')
    
}  
  }



  // ELIMINACION LOGICA DE PACIENTE DE LA BASE DE DATOS
async deletePaciente(id_paciente){
    const conexion = DataBase.getInstance();
    const query = 'UPDATE pacienteDatos SET estado_paciente = 0 WHERE id_paciente = ?';
    const param = [id_paciente];
try {
    const resultado = await conexion.ejecutarQuery(query,param);
    const filasAfectadas = resultado.affectedRows;
    if (filasAfectadas !== undefined && filasAfectadas !== null) {
      return filasAfectadas;
    } else {
      return resultado;
      
    }
} catch (error) {
    throw new Error('NO se logo Eliminar paciente  / Problema al establecer la conexion con la base de datos desde la clase Pacientes.js')
    
}  
  }
}
