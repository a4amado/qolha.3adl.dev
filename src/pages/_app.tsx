import "../styles/globals.css";
import { type AppType } from "next/app";
import GoToUp from "../components/gotToUp";
import Loading from "../components/loading";
import React, { Suspense } from "react";
import { SessionProvider } from "next-auth/react";

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}: any) => {
  return (
    <Suspense>
      <SessionProvider session={session}>
        <Loading />
        <Component {...pageProps} />
        <GoToUp />
      </SessionProvider>
    </Suspense>
  );
};

export default MyApp;
