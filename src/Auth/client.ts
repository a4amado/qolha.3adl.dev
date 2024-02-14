"use client";
import { createClient } from "@supabase/supabase-js";
import { env } from "~/env";

export const supabaseclient = createClient(
  env.NEXT_PUBLIC_SUPABASE_BASEURL,
  env.NEXT_PUBLIC_SUPABASE_SECRET_ANON,
);
