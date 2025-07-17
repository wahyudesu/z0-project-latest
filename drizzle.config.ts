// drizzle.config.ts
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load .dev.vars instead of default .env
config({ path: ".dev.vars" });

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});