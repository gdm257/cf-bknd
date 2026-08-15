import postgres from "postgres";
import { postgresJs } from "bknd";
import type { CloudflareBkndConfig } from "bknd/adapter/cloudflare";

declare global {
   namespace Cloudflare {
      interface Env {
         /**
          * External database, takes precedence over the D1 binding.
          * `postgres://` / `postgresql://` -> PostgreSQL,
          * anything else (`libsql://`, `https://`, `file:`) -> SQLite (LibSQL).
          */
         DATABASE_URL?: string;
      }
   }
}

/**
 * The whole config depends on which database is used: a PostgreSQL connection
 * is passed directly, which is incompatible with `d1.session`, so it can't be
 * decided inside `app: (env) => ...` alone.
 */
export default function getConfig(env: Pick<Cloudflare.Env, "DATABASE_URL">): CloudflareBkndConfig {
   const url = env.DATABASE_URL;
   if (url?.startsWith("postgres")) {
      return {
         app: () => ({
            connection: postgresJs({ postgres: postgres(url) }),
         }),
      };
   }
   if (url) {
      return {
         app: () => ({ connection: { url } }),
      };
   }
   return {
      // sessions only apply to the D1 connection
      d1: {
         session: true,
      },
   };
}
