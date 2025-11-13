import { Pool } from 'pg'

// PostgreSQL connection pool
let pool: Pool | null = null

function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    })
  }
  return pool
}

export async function queryDb<T>(query: string, params?: (string | number | boolean | null)[]): Promise<T[]> {
  const client = getPool()
  
  // Convert SQLite-style ? placeholders to PostgreSQL $1, $2, etc.
  let pgQuery = query
  let paramIndex = 1
  pgQuery = pgQuery.replace(/\?/g, () => `$${paramIndex++}`)
  
  const result = await client.query(pgQuery, params || [])
  return result.rows as T[]
}

export async function runDb(query: string, params?: (string | number | boolean | null)[]): Promise<any> {
  const client = getPool()
  
  // Convert SQLite-style ? placeholders to PostgreSQL $1, $2, etc.
  let pgQuery = query
  let paramIndex = 1
  pgQuery = pgQuery.replace(/\?/g, () => `$${paramIndex++}`)
  
  const result = await client.query(pgQuery, params || [])
  return result
}

export async function getOne<T>(query: string, params?: (string | number | boolean | null)[]): Promise<T | null> {
  const results = await queryDb<T>(query, params)
  return results[0] || null
}

// Helper functions for common queries
export async function getUserById(userId: string) {
  return getOne("SELECT * FROM users WHERE id = ? AND deleted_at IS NULL", [userId])
}

export async function getUserByEmail(email: string) {
  return getOne("SELECT * FROM users WHERE email = ? AND deleted_at IS NULL", [email])
}

export async function getUserProfile(userId: string) {
  return getOne("SELECT * FROM user_profiles WHERE user_id = ?", [userId])
}

export async function getUserPhotos(userId: string) {
  return queryDb("SELECT * FROM profile_photos WHERE user_id = ? ORDER BY display_order ASC", [userId])
}
