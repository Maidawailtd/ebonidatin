
import { drizzle } from "drizzle-orm/d1";

export const getDb = (d1: D1Database) => {
  if (!d1) {
    throw new Error(
      "Cloudflare D1 binding is not available. Please check your wrangler.toml"
    );
  }
  return drizzle(d1);
};
