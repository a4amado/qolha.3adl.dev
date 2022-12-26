import "../styles/globals.css";
import { type AppType } from "next/app";
import GoToUp from "../components/gotToUp";
import Loading from "../components/loading";
import React, { Suspense } from "react";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <Suspense>
      <Loading />
      <Component {...pageProps} />
      <GoToUp />
    </Suspense>
  );
};

export default MyApp;
