import { Router } from "express";
import { AlunoController } from "../controllers/aluno.controller";

const alunoController = new AlunoController();
const alunoRoutes = Router();

alunoRoutes.get('/alunos', alunoController.selecionarTodos);
alunoRoutes.post('/alunos', alunoController.criar);
alunoRoutes.patch('/alunos', alunoController.editar);
alunoRoutes.delete('/alunos', alunoController.deletar);

export default alunoRoutes;