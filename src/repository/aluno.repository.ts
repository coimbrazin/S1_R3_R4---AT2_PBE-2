import { ResultSetHeader } from "mysql2";
import { RowDataPacket } from "mysql2";
import { db } from "../database/connection.database";
import { Aluno } from "../models/pessoa.model";

export class AlunoRepository {
    async selectAll(): Promise<Aluno[]> {
        const [rows] = await db.execute<RowDataPacket[]>(
            'SELECT * FROM alunos;'
        );

        const alunos = rows.map((row) =>
            new Aluno(
                row.id_aluno,
                row.nome,
                row.email,
                row.matricula,
                row.curso,
                row.mediaFinal
            )
        );

        return alunos;
    }

    async selectById(id: number): Promise<Aluno | null> {
        const sql = 'SELECT * FROM alunos WHERE id_aluno=?;';
        const [rows] = await db.execute<RowDataPacket[]>(sql, [id]);

        if (rows.length === 0) {
            return null;
        }

        const row = rows[0];

        return new Aluno(
            row.id_aluno,
            row.nome,
            row.email,
            row.matricula,
            row.curso,
            row.mediaFinal
        );
    }

    async create(dados: any): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO alunos (nome, email, matricula, curso, mediaFinal) VALUES (?,?,?,?,?)';
        const values = [
            dados.nome,
            dados.email,
            dados.matricula,
            dados.curso,
            dados.mediaFinal
        ];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(dados: any, id: number): Promise<ResultSetHeader> {
        const sql = 'UPDATE alunos SET nome=?, email=?, matricula=?, curso=?, mediaFinal=? WHERE id_aluno=?;';
        const values = [
            dados.nome,
            dados.email,
            dados.matricula,
            dados.curso,
            dados.mediaFinal,
            id
        ];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = 'DELETE FROM alunos WHERE id_aluno=?;';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}