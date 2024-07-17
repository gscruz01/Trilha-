import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const connectToDatabase = async (): Promise<void> => {
    try {
        await pool.connect();
        console.log('Conectado no banco de dados');
    } catch (error) {
        console.error('Erro ao se conectar ao banco de dados', error);
    }
};

