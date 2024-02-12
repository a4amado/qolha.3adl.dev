import { createClient } from "@supabase/supabase-js";
import { env } from "~/env";

export const client = createClient(env.SUPABASE_BASEURL, env.SUPABASE_SECRET);
