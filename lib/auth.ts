import { SignJWT, jwtVerify } from "jose"
import { compare, hash } from "bcryptjs"

const JWT_SECRET = process.env.JWT_SECRET || process.env.SUPABASE_JWT_SECRET || "your-secret-key"
const ALGORITHM = "HS256"

export interface JWTPayload {
  userId: string
  email: string
  accountType: string
  subscriptionTier: string
  [key: string]: any
}

export async function generateToken(payload: JWTPayload): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET)
  const token = await new SignJWT(payload as any)
    .setProtectedHeader({ alg: ALGORITHM })
    .setExpirationTime("30d")
    .sign(secret)
  return token
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET)
    const verified = await jwtVerify(token, secret)
    return verified.payload as unknown as JWTPayload
  } catch {
    return null
  }
}

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return compare(password, hash)
}

export function generateVerificationToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substring(7)}`
}

export function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(7)}`
}

export function getTokenExpirationTime(days = 1): Date {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date
}
