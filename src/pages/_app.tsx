// import 'antd/dist/reset.css';
// import "antd/dist/antd.min.js"

import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";
import GoToUp from "../components/gotToUp";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <GoToUp />
    </SessionProvider>
  );
};

export default MyApp;
