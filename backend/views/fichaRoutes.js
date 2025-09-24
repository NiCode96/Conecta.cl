import {Router} from "express";
import FichaClinicaController from "../controller/FichaClinicaController.js";
const router = Router();

router.post('/fichadepaciente', FichaClinicaController.seleccionarFichasPaciente)
router.post('/insertarficha', FichaClinicaController.insertarNuevaFichaPaciente)
router.put('/fichadepaciente', FichaClinicaController.editarFichaPaciente)
router.put('/eliminar', FichaClinicaController.eliminarFicha)
router.put('/editarFicha', FichaClinicaController.editarFichaPaciente)
router.post('/fichaXPaciente', FichaClinicaController.seleccionarFichaIDPorPacienteID)




export default router;
