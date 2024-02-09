"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Flex } from "antd";

import { client } from "~/supabase/client";


export default function Page() {
  return <Auth supabaseClient={client} providers={[]} appearance={{ theme: ThemeSupa }} />
}
