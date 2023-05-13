import "../styles/globals.css";
import { type AppType } from "next/app";
import GoToUp from "@ui/GoToUp";
import Loading from "@ui/Loading";

import React, { Suspense } from "react";
import Router from "next/router";
import Axios, { AxiosError, AxiosResponse } from "axios";
import { showNotification } from "./contribute";
import { SessionProvider } from "next-auth/react";

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

const MyApp: AppType = ({ Component, pageProps: { session, ...pageProps } }: any) => {
    React.useEffect(() => {
        function handleSuccess(response: AxiosResponse) {
            return response;
        }

        function handleError(error: AxiosError) {
            // @ts-ignore
            error.response?.data.message.map((e) => {
                showNotification({
                    message: e,
                    type: "error",
                    destroyAfter: 1500,
                });
            });

            return Promise.reject(error);
        }
        const id = Axios.interceptors.response.use(handleSuccess, handleError);
        return () => Axios.interceptors.response.eject(id);
    }, []);

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
