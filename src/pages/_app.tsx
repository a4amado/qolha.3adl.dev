import "../styles/globals.css";
import { type AppType } from "next/app";
import GoToUp from "../components/gotToUp";
import Loading from "../components/loading";
import React, { Suspense } from "react";
import { SessionProvider } from "next-auth/react";
import Router from "next/router";

Router.events.on("routeChangeStart", () => {
  const loadingContainer = document.getElementById("loading-container");
  loadingContainer?.classList.remove("out-loading");
  loadingContainer?.classList.remove("hide-loading");
  loadingContainer?.classList.add("active-loading");
});

Router.events.on("routeChangeComplete", () => {
  const loadingContainer = document.getElementById("loading-container");

  loadingContainer?.classList.add("out-loading");
  setTimeout(() => {
    loadingContainer?.classList.add("hide-loading");
  }, 500);
});

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
