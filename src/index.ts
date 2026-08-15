import { serve } from "bknd/adapter/cloudflare";
import getConfig from "../config";

let fetchHandler: ExportedHandlerFetchHandler<Cloudflare.Env> | undefined;

export default {
   // env bindings are identical for every request, build once per isolate
   fetch: (request, env, ctx) =>
      (fetchHandler ??= serve(getConfig(env)).fetch)(request, env, ctx),
} satisfies ExportedHandler<Cloudflare.Env>;
