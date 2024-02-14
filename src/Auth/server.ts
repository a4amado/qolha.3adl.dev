import { createClient } from "@supabase/supabase-js";
import { env } from "~/env";

export const supabaseServer = createClient(
  env.SUPABASE_BASEURL,
  env.SUPABASE_SECRET_SERVICE_ROLE,
);
