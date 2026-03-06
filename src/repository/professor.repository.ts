import { ResultSetHeader } from "mysql2";
import { RowDataPacket } from "mysql2";
import { db } from "../database/connection.database";
import { Professor } from "../models/pessoa.model";

export class ProfessorRepository {
    async selectAll(): Promise<Professor[]> {
        const [rows] = await db.execute<RowDataPacket[]>(
            'SELECT * FROM professores;'
        );

        const professores = rows.map((row) =>
            new Professor(
                row.id_professor,
                row.nome,
                row.email,
                row.disciplina,
                row.cargaHoraria
            )
        );

        return professores;
    }

    async selectById(id: number): Promise<Professor | null> {
        const sql = 'SELECT * FROM professores WHERE id_professor=?;'
        const [rows] = await db.execute<RowDataPacket[]>(sql, [id]);

        if (rows.length === 0) {
            return null;
        }

        const row = rows[0];

        return new Professor(
            row.id_professor,
            row.nome,
            row.email,
            row.disciplina,
            row.cargaHoraria
        );
    }

    async create(dados: any): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO professores (nome, email, disciplina, cargaHoraria) VALUES (?,?,?,?)';
        const values = [
            dados.nome,
            dados.email,
            dados.disciplina,
            dados.cargaHoraria
        ];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(dados: any, id: number): Promise<ResultSetHeader> {
        const sql = 'UPDATE professores SET nome=?, email=?, disciplina=?, cargaHoraria=? WHERE id_professor=?;';
        const values = [
            dados.nome,
            dados.email,
            dados.disciplina,
            dados.cargaHoraria,
            id
        ];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = 'DELETE FROM professores WHERE id_professor=?;';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}