import { verifyToken, type JWTPayload } from "./auth"

export interface AuthenticatedRequest extends Request {
  user?: JWTPayload
}

export async function getAuthUser(request: Request): Promise<JWTPayload | null> {
  try {
    const authHeader = request.headers.get("Authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return null
    }

    const token = authHeader.substring(7)
    return await verifyToken(token)
  } catch (error) {
    return null
  }
}

export async function requireAuth(request: Request): Promise<JWTPayload> {
  const user = await getAuthUser(request)
  if (!user) {
    throw new Error("Unauthorized")
  }
  return user
}

export async function requireAdmin(request: Request): Promise<JWTPayload> {
  const user = await requireAuth(request)
  if (!user) {
    throw new Error("Unauthorized")
  }
  return user
}
