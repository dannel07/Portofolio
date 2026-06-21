import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

// This will be used in production with Cloudflare D1
export function getDb(d1: D1Database) {
  return drizzle(d1, { schema });
}

// For development, we'll use a mock or local SQLite
// You can use better-sqlite3 for local development
export type Database = ReturnType<typeof getDb>;
