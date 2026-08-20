import { pool } from "../config/db.js";

interface ModelResponse {
    id: number,
    name: string,
    email: string,
    password: string
}

export const findByEmail = async(email: string): Promise<ModelResponse | null> =>  {
    const query = `SELECT id, name, email, password from users where email = $1`;

    const result = await pool.query(query, [email]);

    if(result.rows.length === 0){ 
        return null;
    } 

    return result.rows[0];
}
