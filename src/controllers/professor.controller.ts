import { Request, Response } from "express";
import { ProfessorService } from "../services/professor.service";

export class ProfessorController {

  constructor(private _service = new ProfessorService()) { }

  selecionarTodos = async (req: Request, res: Response) => {

    try {

      const id_professor = req.query.id_professor ? Number(req.query.id_professor) : undefined;

      if (id_professor !== undefined) {

        const resultadoId = await this._service.selecionarPorId(id_professor);

        if (!resultadoId) {
          return res.status(200).json({ message: 'Não há dados com o ID pesquisado' });
        }

        return res.status(200).json(resultadoId);
      }

      const professores = await this._service.selecionarTodos();

      res.status(200).json({ professores });

    } catch (error: unknown) {

      console.error(error);

      if (error instanceof Error)
        return res.status(500).json({
          message: "Ocorreu um erro no servidor",
          errorMessage: error.message
        });

      res.status(500).json({
        message: "Ocorreu um erro no servidor",
        errorMessage: "Erro desconhecido"
      });
    }
  }

  criar = async (req: Request, res: Response) => {

    try {

      const { nome, email, disciplina, cargaHoraria } = req.body;

      if (!nome || !email || !disciplina || cargaHoraria === undefined) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
      }

      if (typeof nome !== "string" || typeof email !== "string" || typeof disciplina !== "string") {
        return res.status(400).json({ message: "Campos devem ser texto" });
      }

      if (typeof cargaHoraria !== "number") {
        return res.status(400).json({ message: "Carga Horaria deve ser número inteiro" });
      }

      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!regexEmail.test(email)) {
        return res.status(400).json({ message: "Email inválido" });
      }

      const novoProfessor = await this._service.criar(nome, email, disciplina, cargaHoraria);

      res.status(201).json({
        message: "Professor criado com sucesso",
        dados: novoProfessor
      });

    } catch (error: unknown) {

      console.error(error);

      if (error instanceof Error)
        return res.status(500).json({
          message: "Ocorreu um erro no servidor",
          errorMessage: error.message
        });

      res.status(500).json({
        message: "Ocorreu um erro no servidor",
        errorMessage: "Erro desconhecido"
      });
    }
  }

  editar = async (req: Request, res: Response) => {

    try {

      const id_professor = Number(req.query.id_professor);

      const { nome, email, disciplina, cargaHoraria } = req.body;

      if (nome !== undefined) {
        if (typeof nome !== "string" || nome.trim() === "") {
          return res.status(400).json({ message: "Nome deve ser tipo string" });
        }
      }

      if (email !== undefined) {
        if (typeof email !== "string" || email.trim() === "") {
          return res.status(400).json({ message: "Email deve ser tipo string" });
        }
      }

      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email && !regexEmail.test(email)) {
        return res.status(400).json({ message: "Email inválido" });
      }

      if (disciplina !== undefined) {
        if (typeof disciplina !== "string" || disciplina.trim() === "") {
          return res.status(400).json({ message: "Disciplina deve ser tipo string" });
        }
      }

      if (cargaHoraria !== undefined && typeof cargaHoraria !== "number") {
        return res.status(400).json({ message: "Carga Horaria deve ser tipo number" });
      }

      const alterado = await this._service.editar(
        id_professor,
        nome,
        email,
        disciplina,
        cargaHoraria
      );

      res.status(201).json({
        message: "Professor alterado com sucesso",
        dados: alterado
      });

    } catch (error: unknown) {

      console.error(error);

      if (error instanceof Error)
        return res.status(500).json({
          message: "Ocorreu um erro no servidor",
          errorMessage: error.message
        });

      res.status(500).json({
        message: "Ocorreu um erro no servidor",
        errorMessage: "Erro desconhecido"
      });
    }
  }

  deletar = async (req: Request, res: Response) => {

    try {

      const id_professor = Number(req.query.id_professor);

      const deletado = await this._service.deletar(id_professor);

      if (deletado.affectedRows === 0) {
        return res.status(400).json({ message: "Professor não encontrado" });
      }

      res.status(201).json({ message: "Professor deletado com sucesso" });

    } catch (error: unknown) {

      console.error(error);

      if (error instanceof Error)
        return res.status(500).json({
          message: "Ocorreu um erro no servidor",
          errorMessage: error.message
        });

      res.status(500).json({
        message: "Ocorreu um erro no servidor",
        errorMessage: "Erro desconhecido"
      });
    }
  }
}