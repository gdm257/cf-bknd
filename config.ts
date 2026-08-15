import type { CloudflareBkndConfig } from "bknd/adapter/cloudflare";

declare global {
   namespace Cloudflare {
      interface Env {
         /**
          * External SQLite database (e.g. Turso/LibSQL): `libsql://<host>?authToken=<token>`
          * When set, it takes precedence over the D1 binding.
          */
         DATABASE_URL?: string;
      }
   }
}

export default {
   // DATABASE_URL set -> use it, otherwise the first D1 binding found in the env
   app: (env) => (env.DATABASE_URL ? { connection: { url: env.DATABASE_URL } } : {}),
   d1: {
      // sessions only apply to the D1 connection
      session: true,
   },
} satisfies CloudflareBkndConfig;
