import { Pool } from 'pg';

// Create a connection pool using the connection string from environment variables
const connectionString = process.env.POSTGRES_URL || process.env.SUPABASE_POSTGRES_URL || process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('Database connection string is missing. Please set POSTGRES_URL or DATABASE_URL.');
}

const pool = new Pool({
  connectionString,
  // Enable SSL for production/cloud databases (like Supabase/Neon)
  ssl: process.env.NODE_ENV === 'production' || connectionString?.includes('sslmode=require') 
    ? { rejectUnauthorized: false } 
    : undefined,
});

/**
 * Executes a query and returns all matching rows.
 * @param text The SQL query string
 * @param params The parameters for the query
 * @returns Array of rows
 */
export async function queryDb(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res.rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Executes a query and returns the first matching row, or null if no match found.
 * @param text The SQL query string
 * @param params The parameters for the query
 * @returns The first row or null
 */
export async function getOne(text: string, params?: any[]) {
  const rows = await queryDb(text, params);
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Executes a command (INSERT, UPDATE, DELETE) and returns the result object.
 * @param text The SQL query string
 * @param params The parameters for the query
 * @returns The result object (containing rowCount, etc.)
 */
export async function runDb(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } catch (error) {
    console.error('Database command error:', error);
    throw error;
  } finally {
    client.release();
  }
}
