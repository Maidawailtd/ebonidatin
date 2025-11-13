import { handleUser } from "@/lib/auth-handlers";
import { NextRequest } from "next/server";

export const GET = (req: NextRequest) => handleUser(req);
