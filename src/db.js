import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

db.connect()
  .then(() => console.log("Connected to Supabase DB!"))
  .catch(err => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

export const query = (text, params) => db.query(text, params);
