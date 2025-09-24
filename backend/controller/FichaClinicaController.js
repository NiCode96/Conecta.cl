import FichaClinica from "../model/FichaClinica.js";

export default class FichaClinicaController {
  constructor() {}

  static async seleccionarTodasFichas(req, res) {
    try {
      const fichaClinicaModel = new FichaClinica();
      const dataFichas = await fichaClinicaModel.seleccionarTodasFichas();
      res.json(dataFichas);
    } catch (error) {
      res.status(500).json({
        message:
          "No se ha podido realizar la consulta desde FichaClinicaController / Contacte al equipo de soporte",
      });
    }
  }

  static async seleccionarFichasPaciente(req, res) {
    try {
      console.log(req.body);
      const { id_paciente } = req.body;

      if (id_paciente == null || id_paciente == undefined) {
        return res.status(400).json({ message: "Id de paciente es requerido" });
      }

      const numeroID = Number(id_paciente);
      if (Number.isNaN(numeroID)) {
        return res
          .status(400)
          .json({ message: "id_paciente debe ser numérico" });
      }

      const fichaclinicamodel = new FichaClinica();
      const fichaPaciente = await fichaclinicamodel.selectFichasPaciente(
        numeroID
      );
      return res.json(fichaPaciente);
    } catch (error) {
      res.status(500).json({
        message:
          "No se ha podido realizar la consulta desde FichaClinicaController / Contacte al equipo de soporte",
      });
    }
  }

  static async editarFichaPaciente(req, res) {
    try {
      console.log(req.body);
      const {
        observaciones,
        anotacionConsulta,
        anamnesis,
        diagnostico,
        indicaciones,
        fechaConsulta,
        id_paciente,
        id_ficha,
      } = req.body;

      const fichaclinicamodel = new FichaClinica();
      const fichaPaciente = await fichaclinicamodel.updateFichaEspecifica(
        observaciones,
        anotacionConsulta,
        anamnesis,
        diagnostico,
        indicaciones,
        fechaConsulta,
        id_paciente,
        id_ficha
      );
      return res.json(fichaPaciente);
    } catch (error) {
      return res.status(500).json({
        message:
          "No se ha podido realizar la consulta desde FichaClinicaController / Contacte al equipo de soporte",
      });
    }
  }

  static async insertarNuevaFichaPaciente(req, res) {
    try {
      console.log(req.body);
      const {
        observaciones,
        anotacionConsulta,
        anamnesis,
        diagnostico,
        indicaciones,
        fechaConsulta,
        id_paciente,
      } = req.body;

      const fichaclinicamodel = new FichaClinica();
      const nuevafichaPaciente = await fichaclinicamodel.insertarFichaNueva(
        observaciones,
        anotacionConsulta,
        anamnesis,
        diagnostico,
        indicaciones,
        fechaConsulta,
        id_paciente
      );
      return res.json(nuevafichaPaciente);
    } catch (error) {
      return res.status(500).json({
        message:
          "No se ha podido realizar la consulta desde FichaClinicaController / Contacte al equipo de soporte",
      });
    }
  }

  static async eliminarFicha(req, res) {
    try {
      console.log(req.body);
      const { id_paciente, id_ficha } = req.body;

      if (id_paciente == null || id_ficha == null) {
        return res.status(400).json({
          message:
            "No se ha podido realizar la consulta desde FichaClinicaController / Contacte al equipo de soporte",
        });
      } else {
        const numero_ID_delpaciente = Number(id_paciente);
        const numero_ID_ficha = Number(id_ficha);
        if (
          !Number.isNaN(numero_ID_delpaciente) &&
          !Number.isNaN(numero_ID_ficha)
        ) {
          const fichaClinicaModel = new FichaClinica();
          const resultadoEliminacion =
            await fichaClinicaModel.deleteFichaEspecifica(
              numero_ID_delpaciente,
              numero_ID_ficha
            );
          res.json(resultadoEliminacion);
        } else {
          return res.status(400).json({
            message:
              "No se ha podido realizar la consulta desde FichaClinicaController No se dispone de los caracteres correctos para la eliminacion / Contacte al equipo de soporte",
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        message:
          "No se ha podido realizar la consulta desde FichaClinicaController / Contacte al equipo de soporte",
      });
    }
  }





    static async seleccionarFichaIDPorPacienteID(req, res) {
    try {
      console.log(req.body);
      const { id_paciente, id_ficha } = req.body;

      if (id_paciente == null || id_ficha == null) {
        return res.status(400).json({
          message:
            "No se ha podido realizar la consulta desde FichaClinicaController / Contacte al equipo de soporte",
        });
      } else {
        const numero_ID_delpaciente = Number(id_paciente);
        const numero_ID_ficha = Number(id_ficha);
        if (
          !Number.isNaN(numero_ID_delpaciente) &&
          !Number.isNaN(numero_ID_ficha)
        ) {
          const fichaClinicaModel = new FichaClinica();
          const resultadoEliminacion =
            await fichaClinicaModel.selectFichasPacientePorId(
              numero_ID_delpaciente,
              numero_ID_ficha
            );
          res.json(resultadoEliminacion);
        } else {
          return res.status(400).json({
            message:
              "No se ha podido realizar la consulta desde FichaClinicaController No se dispone de los caracteres correctos para la eliminacion / Contacte al equipo de soporte",
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        message:
          "No se ha podido realizar la consulta desde FichaClinicaController / Contacte al equipo de soporte",
      });
    }
  }



}
