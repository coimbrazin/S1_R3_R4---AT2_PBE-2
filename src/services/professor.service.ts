import { ProfessorRepository } from "../repository/professor.repository";
import { Professor } from "../models/pessoa.model";

export class ProfessorService {
    constructor(private _repository = new ProfessorRepository()) { }

    async selecionarTodos() {
        return await this._repository.selectAll();
    }

    async selecionarPorId(id: number) {
        if (!id) {
            throw new Error("ID Inválido");
        }

        const professor = await this._repository.selectById(id);

        if (!professor) {
            throw new Error("Professor não encontrado");
        }

        return professor;
    }

    async criar(
        nome: string,
        email: string,
        disciplina: string,
        cargaHoraria: number
    ) {

        const professor = new Professor(
            0,
            nome,
            email,
            disciplina,
            cargaHoraria
        );

        const dados = {
            nome: professor.getNome(),
            email: professor.getEmail(),
            disciplina: professor.getDisciplina(),
            cargaHoraria: professor.getCargaHoraria()
        };

        return await this._repository.create(dados);
    }

    async editar(
        id: number,
        nome?: string,
        email?: string,
        disciplina?: string,
        cargaHoraria?: number
    ) {

        if (!id) {
            throw new Error("ID Inválido");
        }

        const professor = await this._repository.selectById(id);

        if (!professor) {
            throw new Error("Professor não encontrado");
        }

        const dados = {
            nome: nome ?? professor.getNome(),
            email: email ?? professor.getEmail(),
            disciplina: disciplina ?? professor.getDisciplina(),
            cargaHoraria: cargaHoraria ?? professor.getCargaHoraria()
        };

        return await this._repository.update(dados, id);
    }

    async deletar(id: number) {

        if (!id) {
            throw new Error("ID Inválido");
        }

        return await this._repository.delete(id);
    }
}