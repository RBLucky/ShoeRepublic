// src/lib/db/index.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/index";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// Cache the database connection
let client: ReturnType<typeof postgres> | null = null;
if (process.env.NODE_ENV === "production") {
  if (!client) {
    client = postgres(process.env.DATABASE_URL, { prepare: false });
  }
} else {
  // In development, create a new client for each request to avoid issues with hot-reloading
  client = postgres(process.env.DATABASE_URL, { prepare: false });
}

export const db = drizzle(client, { schema });