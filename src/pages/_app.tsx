import "../styles/globals.css";

import { type AppType } from "next/app";
import BackToTheTop from "@ui/backToTheTop";
import Loading from "@ui/Loading";

import React, { Suspense } from "react";
import Router from "next/router";
import Axios, { AxiosError, AxiosResponse } from "axios";

import { SessionProvider } from "next-auth/react";
import { trpc } from "@utils/trpc";
import { SnackbarProvider, useSnackbar } from "notistack";
import wait from "@utils/wait";
import { FluentProvider } from "@fluentui/react-components";

Router.events.on("routeChangeStart", () => {
    const loadingContainer = document.getElementById("loading-container");
    loadingContainer?.classList.remove("out-loading");
    loadingContainer?.classList.remove("hide-loading");
    loadingContainer?.classList.add("active-loading");
});

Router.events.on("routeChangeComplete", async () => {
    const loadingContainer = document.getElementById("loading-container");
    loadingContainer?.classList.add("out-loading");
    await wait(500);
    loadingContainer?.classList.add("hide-loading");
});

const MyApp: AppType = ({ Component, pageProps: { session, ...pageProps } }: any) => {
    const snackbar = useSnackbar();
    React.useEffect(() => {
        function handleSuccess(response: AxiosResponse) {
            return response;
        }

        function handleError(error: AxiosError) {
            // @ts-ignore
            error.response?.data.message.map((e) => {
                snackbar.enqueueSnackbar({
                    message: e,
                    autoHideDuration: 2000,
                    style: { backgroundColor: "red" },
                });
            });

            return Promise.reject(error);
        }
        const id = Axios.interceptors.response.use(handleSuccess, handleError);
        return () => Axios.interceptors.response.eject(id);
    }, []);

    return (


        <SessionProvider session={session}>
            <FluentProvider>
                <SnackbarProvider maxSnack={3}>
                    <Loading />
                    <Component {...pageProps} />
                    <BackToTheTop />
                </SnackbarProvider>
            </FluentProvider>
        </SessionProvider>

    );
};

export default trpc.withTRPC(MyApp);
