import DataBase from "../config/DataBase.js";

export default class FichaClinica {
  constructor(id_ficha,id_paciente,observaciones,anotacionConsulta,anamnesis,diagnostico,indicaciones,fechaConsulta,estadoFicha) {
    this.id_ficha = id_ficha;
    this.id_paciente = id_paciente;
    this.observaciones = observaciones;
    this.anotacionConsulta = anotacionConsulta;
    this.anamnesis = anamnesis;
    this.diagnostico = diagnostico;
    this.indicaciones = indicaciones;
    this.fechaConsulta = fechaConsulta;
    this.estadoFicha = estadoFicha;
  }

  get idficha() {
    return this._idficha;
  }
  set idficha(in_idficha) {
    this._idficha = in_idficha;
  }

  get idpaciente() {
    return this._idpaciente;
  }
  set idpaciente(in_idpaciente) {
    this._idpaciente = in_idpaciente;
  }

  get observaciones() {
    return this._observaciones;
  }
  set observaciones(in_observaciones) {
    this._observaciones = in_observaciones;
  }

  get anotacionConsulta() {
    return this._anotacionConsulta;
  }
  set anotacionConsulta(in_anotacionConsulta) {
    this._anotacionConsulta = in_anotacionConsulta;
  }

  get anamnesis() {
    return this._anamnesis;
  }
  set anamnesis(in_anamnesis) {
    this._anamnesis = in_anamnesis;
  }

  get diagnostico() {
    return this._diagnostico;
  }
  set diagnostico(in_diagnostico) {
    this._diagnostico = in_diagnostico;
  }

  get indicaciones() {
    return this._indicaciones;
  }
  set indicaciones(in_indicaciones) {
    this._indicaciones = in_indicaciones;
  }

  get fechaConsulta() {
    return this._fechaConsulta;
  }
  set fechaConsulta(in_fechaConsulta) {
    this._fechaConsulta = in_fechaConsulta;
  }

  get estadoFicha() {
    return this._estadoFicha;
  }
  set estadoFicha(in_estadoFicha) {
    this._estadoFicha = in_estadoFicha;
  }




    // SELECCION DE TODAS LAS FICHAS CLINICAS DE LA BASE DE DATOS
  async selectFicha(){
    const conexion = DataBase.getInstance();
    const query = 'SELECT * FROM fichaClinica';
try {
    const resultado = await conexion.ejecutarQuery(query);
    return resultado;
} catch (error) {
    throw new Error('Problema al establecer la conexion con la base de datos desde la clase FichaClinica.js')
    
}  
  }


// SELECCION DE LAS FICHAS CLINICAS ESPECIFICAS POR RUT
   async selectFichasPaciente(id_paciente){
    const conexion = DataBase.getInstance();
    const query = 'SELECT * FROM fichaClinica WHERE id_paciente = ?';
    const param = [id_paciente]
try {
    const resultado = await conexion.ejecutarQuery(query, param);
    return resultado;
} catch (error) {
    throw new Error('No se puede seleccionar Informacion la ficha clinica / Problema al establecer la conexion con la base de datos desde la clase Pacientes.js')
}  
  }






  // SELECCION DE LAS FICHAS CLINICAS ESPECIFICAS POR ----> SIMILITUDES EN EL RUT <------
   async selectContieneRut(id_paciente){
    const conexion = DataBase.getInstance();
    const query = 'SELECT * FROM fichaClinica WHERE id_paciente = ?';
    const param = [`%${id_paciente}%`]
try {
    const resultado = await conexion.ejecutarQuery(query, param);
    return resultado;
} catch (error) {
    throw new Error('No se puede seleccionar Informacion la ficha clinica / Problema al establecer la conexion con la base de datos desde la clase Pacientes.js')
}  
  }






// SELECCION DE LAS FICHAS CLINICAS ESPECIFICAS POR RU E IDFICHAS
   async selectFichasPacientePorId(id_paciente, id_ficha){
    const conexion = DataBase.getInstance();
    const query = 'SELECT * FROM fichaClinica WHERE id_paciente = ? and id_ficha = ?';
    const param = [id_paciente, id_ficha]
try {
    const resultado = await conexion.ejecutarQuery(query, param);
    return resultado;
} catch (error) {
    throw new Error('No se puede seleccionar Informacion la ficha clinica / Problema al establecer la conexion con la base de datos desde la clase Pacientes.js')
}  
  }



// ACTUALIZACION DE DATOS DE LA FICHA DE PACIENTES POR POR ID
async updateFichaEspecifica(observaciones,anotacionConsulta,anamnesis,diagnostico,indicaciones,fechaConsulta,id_paciente, id_ficha){
    const conexion = DataBase.getInstance();
    const query = 'UPDATE fichaClinica SET observaciones = ? , anotacionConsulta = ? , anamnesis = ?,  diagnostico = ?,  indicaciones = ?,  fechaConsulta = ?  WHERE id_paciente = ? and id_ficha = ?';
    const param = [observaciones,anotacionConsulta,anamnesis,diagnostico,indicaciones,fechaConsulta,id_paciente,id_ficha];
try {
    const resultado = await conexion.ejecutarQuery(query,param);
    const filasAfectadas = resultado.affectedRows;
    if (filasAfectadas !== undefined && filasAfectadas !== null) {
      return filasAfectadas;
    } else {
      return resultado;
    }
} catch (error) {
    throw new Error('NO se logro actualizar FichaEspecifica  / Problema al establecer la conexion con la base de datos desde la clase Pacientes.js')
}  
  }



// INSERCION DE NUEVA FICHA POR PACIENTE EN LA BASE DE DATOS
  async insertarFichaNueva(observaciones,anotacionConsulta,anamnesis,diagnostico,indicaciones,fechaConsulta,id_paciente){
    const conexion = DataBase.getInstance();
    const query = 'INSERT INTO fichaClinica (observaciones, anotacionConsulta, anamnesis, diagnostico, indicaciones, fechaConsulta, id_paciente) VALUES (?, ?, ?, ?, ?, ?, ?);';
    const param = [observaciones,anotacionConsulta,anamnesis,diagnostico,indicaciones,fechaConsulta,id_paciente];
try {
    const resultado = await conexion.ejecutarQuery(query,param);
    const filasAfectadas = resultado.affectedRows;
    if (filasAfectadas !== undefined && filasAfectadas !== null) {
      return filasAfectadas;
    } else {
      return resultado;
    }
} catch (error) {
    throw new Error('NO se logo ingresar nueva ficha clinica / Problema al establecer la conexion con la base de datos desde la clase Pacientes.js')
    
}  
  }



  // ELIMINACION LOGICA DE FICHA CLINICA DE LA BASE DE DATOS
async deleteFichaEspecifica(id_paciente, id_ficha){
    const conexion = DataBase.getInstance();
    const query = 'UPDATE fichaClinica SET estadoFicha = 0 WHERE id_paciente = ? and id_ficha = ?';
    const param = [id_paciente, id_ficha];
try {
    const resultado = await conexion.ejecutarQuery(query,param);
    const filasAfectadas = resultado.affectedRows;
    if (filasAfectadas !== undefined && filasAfectadas !== null) {
      return filasAfectadas;
    } else {
      return resultado;
      
    }
} catch (error) {
    throw new Error('NO se logo Eliminar Ficha Clinica especificada / Problema al establecer la conexion con la base de datos desde la clase Pacientes.js')
    
}  
  }



}
