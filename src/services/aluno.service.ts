import { AlunoRepository } from "../repository/aluno.repository";

export class AlunoService {
    constructor(private _repository = new AlunoRepository()) { }

    async selecionarTodos() {
        return await this._repository.selectAll();
    }

    async selecionarPorId(id: number) {

        if (!id) {
            throw new Error("ID Inválido");
        }

        const aluno = await this._repository.selectById(id);

        if (!aluno) {
            throw new Error("Aluno não encontrado");
        }

        return aluno;
    }

    async criar(
        nome: string,
        email: string,
        matricula: string,
        curso: string,
        mediaFinal: number
    ) {

        const dados = {
            nome,
            email,
            matricula,
            curso,
            mediaFinal
        }

        return await this._repository.create(dados);
    }

    async editar(
        id: number,
        nome?: string,
        email?: string,
        matricula?: string,
        curso?: string,
        mediaFinal?: number
    ) {

        if (!id) {
            throw new Error("ID Inválido");
        }

        const aluno = await this._repository.selectById(id);

        if (!aluno) {
            throw new Error("Aluno não encontrado");
        }

        const dados = {
            nome: nome ?? aluno.getNome(),
            email: email ?? aluno.getEmail(),
            matricula: matricula ?? aluno.getMatricula(),
            curso: curso ?? aluno.getCurso(),
            mediaFinal: mediaFinal ?? aluno.getMediaFinal()
        }

        return await this._repository.update(dados, id);
    }

    async deletar(id: number) {

        if (!id) {
            throw new Error("ID Inválido");
        }

        return await this._repository.delete(id);
    }

}