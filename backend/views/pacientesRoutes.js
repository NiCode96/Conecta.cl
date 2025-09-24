import {Router} from 'express';
import PacienteController from '../controller/PacienteController.js';

const router = Router();

router.get("/", PacienteController.seleccionarTodosPacientes);
router.post("/pacientesEspecifico", PacienteController.seleccionarPacienteEspecifico);
router.post("/pacientesInsercion", PacienteController.insertarPacienteNuevo);
router.put("/pacientesActualizar", PacienteController.actualizarPaciente);
router.post("/contieneRut", PacienteController.seleccionarCoincidenciaRUT);
router.post("/contieneNombre", PacienteController.seleccionarCoincidenciaNombre);


export default router;