import { drizzle } from 'drizzle-orm/libsql';
import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import { createClient } from '@libsql/client';
import * as schema from '@/db/schema';

// Check environment
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

export async function getDb() {
  // Production: Use Turso (Vercel deployment)
  if (isProduction && process.env.TURSO_DATABASE_URL) {
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    });
    
    return drizzle(client, { schema });
  }
  
  // Development: Use local better-sqlite3
  if (isDevelopment) {
    const { getLocalDb } = await import('./db-local');
    return getLocalDb();
  }
  
  // Fallback (shouldn't happen, but safe default)
  throw new Error('Database configuration error. Please check environment variables.');
}

export type Database = Awaited<ReturnType<typeof getDb>>;
