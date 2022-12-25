// import 'antd/dist/reset.css';
// import "antd/dist/antd.min.js"

import { type AppType } from "next/app";

import { createClient } from "@supabase/supabase-js";
import { Session } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import "../styles/globals.css";
import GoToUp from "../components/gotToUp";
import Loading from "../components/loading";
import React from "react";

const MyApp: AppType<{ initialSession: Session | null }> = ({
  Component,
  pageProps: { initialSession, ...pageProps },
}) => {
  const [s] = React.useState(() =>
    createClient(
      "https://jgyzpbionzzxtjxmomjq.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpneXpwYmlvbnp6eHRqeG1vbWpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA5Mzg3NzQsImV4cCI6MTk4NjUxNDc3NH0.sHwRTXVc1U_bLQlT2hZDXGjZzbdVs_jVTL1N5LeL5qA"
    )
  );
  return (
    <SessionContextProvider supabaseClient={s} initialSession={initialSession}>
      <Loading />
      <Component {...pageProps} />
      <GoToUp />
    </SessionContextProvider>
  );
};

export default MyApp;
