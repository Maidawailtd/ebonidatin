import { handleSignup } from "@/lib/auth-handlers";
import { NextRequest } from "next/server";

export const POST = (req: NextRequest) => handleSignup(req);
