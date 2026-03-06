import mysql2, { Pool } from "mysql2/promise";
import { EnvVar } from "../config/EnvVar";

class Database {
    private static instance: Database;
    private pool!: Pool;

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
            Database.instance.createPool()
        }
        return Database.instance
    }

    private createPool(): void {
        this.pool = mysql2.createPool({
            host: EnvVar.DB_HOST,
            user: EnvVar.DB_USER,
            password: EnvVar.DB_PASSWORD,
            port: EnvVar.DB_PORT,
            database: EnvVar.DB_DATABASE,
            waitForConnections: true,
            connectionLimit: 100,
            queueLimit: 0
        })
    }

    public getPool(): Pool {
        return this.pool;
    }
}

export const db = Database.getInstance().getPool();