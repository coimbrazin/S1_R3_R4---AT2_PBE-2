import { Router } from "express";
import { ProfessorController } from "../controllers/professor.controller";

const professorController = new ProfessorController();
const professorRoutes = Router();

professorRoutes.get('/professores', professorController.selecionarTodos);
professorRoutes.post('/professores', professorController.criar);
professorRoutes.patch('/professores', professorController.editar);
professorRoutes.delete('/professores', professorController.deletar);

export default professorRoutes;