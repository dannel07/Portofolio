import { drizzle } from 'drizzle-orm/libsql';
import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import { createClient } from '@libsql/client';
import * as schema from '@/db/schema';

export async function getDb() {
  // Production: Use Turso (when TURSO credentials are available)
  if (process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    
    return drizzle(client, { schema });
  }
  
  // Development: Use local better-sqlite3
  // This will be used when TURSO credentials are not available
  const { getLocalDb } = await import('./db-local');
  return getLocalDb();
}

export type Database = Awaited<ReturnType<typeof getDb>>;
