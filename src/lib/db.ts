import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/db/schema";

// Runtime detection for Cloudflare environment
function isCloudflareRuntime(): boolean {
  // Check if we're in Cloudflare Workers/Pages environment
  return (
    typeof process === 'undefined' || 
    process.env.CF_PAGES === '1' ||
    typeof (globalThis as any).caches !== 'undefined'
  );
}

// For production/edge: use Cloudflare D1 binding
// For development: use better-sqlite3 (imported dynamically)
export async function getDb() {
  // In Cloudflare environment, use D1
  if (isCloudflareRuntime()) {
    // Get the D1 binding from the global context
    // This is provided by Cloudflare Pages at runtime
    const binding = (globalThis as any).DB || (process as any).env.DB;
    
    if (!binding) {
      console.error('D1 binding not found in Cloudflare environment');
      throw new Error('D1 binding not found. Make sure DB binding is configured in Cloudflare Pages.');
    }
    
    return drizzle(binding, { schema });
  } else {
    // Development: use better-sqlite3
    const { getLocalDb } = await import('./db-local');
    return getLocalDb();
  }
}

export type Database = Awaited<ReturnType<typeof getDb>>;
