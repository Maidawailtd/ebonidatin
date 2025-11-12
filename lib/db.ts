import type { D1Database, R2Bucket } from "@cloudflare/workers-types"

export interface CloudflareEnv {
  DB: D1Database
  BUCKET: R2Bucket
  STRIPE_SECRET_KEY: string
  SENDGRID_API_KEY: string
  JWT_SECRET: string
  NEXT_PUBLIC_JWT_SECRET: string
}

let db: D1Database | null = null

export function initializeDb(database: D1Database) {
  db = database
}

export function getDb(): D1Database {
  if (!db) {
    throw new Error("Database not initialized")
  }
  return db
}

export async function queryDb<T>(query: string, params?: (string | number | boolean | null)[]): Promise<T[]> {
  const database = getDb()
  const result = await database
    .prepare(query)
    .bind(...(params || []))
    .all()
  return (result.results || []) as T[]
}

export async function runDb(query: string, params?: (string | number | boolean | null)[]): Promise<any> {
  const database = getDb()
  const result = await database
    .prepare(query)
    .bind(...(params || []))
    .run()
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
