import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@/db/schema";
import path from "path";
import fs from "fs";

// Local SQLite database for development
let db: ReturnType<typeof drizzle> | null = null;

export function getLocalDb() {
  if (!db) {
    try {
      // Find the actual database file in .wrangler directory
      const d1Dir = path.join(process.cwd(), ".wrangler", "state", "v3", "d1", "miniflare-D1DatabaseObject");
      
      if (!fs.existsSync(d1Dir)) {
        console.error(`D1 database directory not found at ${d1Dir}`);
        throw new Error(`D1 database directory not found. Run: wrangler d1 migrations apply portfolio-db --local`);
      }
      
      // Look for .sqlite files (usually a hash-named file)
      const files = fs.readdirSync(d1Dir);
      const dbFile = files.find(f => 
        f.endsWith('.sqlite') && 
        f !== 'metadata.sqlite' && 
        f !== 'db.sqlite' &&
        f.length > 20
      );
      
      if (!dbFile) {
        console.error('Available files:', files);
        throw new Error('No D1 database file found. Run: wrangler d1 migrations apply portfolio-db --local');
      }
      
      const dbPath = path.join(d1Dir, dbFile);
      console.log('📂 Using database file:', dbPath);
      
      // Check if file is empty
      const stats = fs.statSync(dbPath);
      if (stats.size === 0) {
        console.error('Database file is empty!');
        throw new Error('Database is empty. Run migrations: wrangler d1 migrations apply portfolio-db --local');
      }
      
      console.log('📊 Database size:', (stats.size / 1024).toFixed(2), 'KB');
      
      const sqlite = new Database(dbPath);
      
      // Test connection
      try {
        sqlite.prepare('SELECT 1').get();
        console.log('✅ Database connection successful!');
      } catch (error) {
        console.error('❌ Database connection test failed:', error);
        throw error;
      }
      
      // Initialize drizzle WITHOUT schema mode to avoid timestamp conversion issues
      db = drizzle(sqlite, { 
        schema,
        logger: false // Disable logging to avoid timestamp parsing in logs
      });
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }
  return db;
}

export type LocalDatabase = ReturnType<typeof getLocalDb>;
