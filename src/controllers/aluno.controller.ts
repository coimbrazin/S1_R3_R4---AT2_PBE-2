import { Request, Response } from "express";
import { AlunoService } from "../services/aluno.service";

export class AlunoController {
  constructor(private _service = new AlunoService()) { }

  selecionarTodos = async (req: Request, res: Response) => {
    try {
      const id_aluno = req.query.id_aluno ? Number(req.query.id_aluno) : undefined

      if (id_aluno !== undefined) {
        const resultadoId = await this._service.selecionarPorId(id_aluno);

        if (!resultadoId) {
          return res.status(200).json({ message: 'Não há dados com o ID pesquisado' });
        }

        return res.status(200).json(resultadoId);
      }

      const alunos = await this._service.selecionarTodos();
      res.status(200).json({ alunos });
    } catch (error: unknown) {
      console.error(error)
      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
  }

  criar = async (req: Request, res: Response) => {
    try {
      const {
        nome,
        email,
        matricula,
        curso,
        mediaFinal
      } = req.body

      if (!nome || !email || !matricula || !curso || mediaFinal === undefined) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
      }

      if (typeof nome !== "string" || typeof email !== "string" || typeof matricula !== "string" || typeof curso !== "string") {
        return res.status(400).json({ message: "Campos devem ser texto" });
      }

      if (typeof mediaFinal !== "number") {
        return res.status(400).json({ message: "mediaFinal deve ser número" });
      }

      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!regexEmail.test(email)) {
        return res.status(400).json({ message: "Email inválido" });
      }

      const novoAluno = await this._service.criar(nome, email, matricula, curso, mediaFinal);

      res.status(201).json({
        message: "Aluno criado com sucesso",
        dados: novoAluno
      });

    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message })
    }

    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" })
  }
  editar = async (req: Request, res: Response) => {
    try {
      const id_aluno = Number(req.query.id_aluno);
      const { nome, email, matricula, curso, mediaFinal } = req.body;

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

      if (matricula !== undefined) {
        if (typeof matricula !== "string" || matricula.trim() === "") {
          return res.status(400).json({ message: "Matrícula deve ser tipo string" });
        }
      }

      if (curso !== undefined && typeof curso !== "string") {
        return res.status(400).json({ message: "Curso deve ser tipo string" });
      }

      if (mediaFinal !== undefined && typeof mediaFinal !== "number") {
        return res.status(400).json({ message: "Media final deve ser tipo number" });
      }

      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email && !regexEmail.test(email)) {
        return res.status(400).json({ message: "Email inválido" });
      }

      const alterado = await this._service.editar(id_aluno, nome, email, matricula, curso, mediaFinal);

      res.status(201).json({
        message: "Aluno alterado com sucesso",
        dados: alterado
      });

    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message })
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" })
  }
  deletar = async (req: Request, res: Response) => {
    try {
      const id_aluno = Number(req.query.id_aluno);

      const deletado = await this._service.deletar(id_aluno);

      if (deletado.affectedRows === 0) {
        return res.status(400).json({ message: "Aluno não encontrado" });
      }

      res.status(201).json({ message: "Aluno deletado com sucesso" });

    } catch (error: unknown) {
      console.error(error)
      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message })
      res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" })
    }
  }
}