import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // la stringa che trovi in Supabase
    ssl: { rejectUnauthorized: false }
});

export default pool;