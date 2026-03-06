import { Router } from "express";
import alunoRoutes from "./aluno.routes";
import professorRoutes from "./professor.routes";

const router = Router();

router.use('/', alunoRoutes);
router.use('/', professorRoutes);

export default router;