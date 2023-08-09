import { AppProps } from "next/app";
import GoToUp from "@ui/GoToUp";
import { ChakraProvider, extendTheme, PortalManager, ThemeConfig } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import Router from "next/router";
import Axios, { AxiosError, AxiosResponse } from "axios";
import { trpc } from "@utils/trpc";
import Head from "next/head";
import { Styles } from "@chakra-ui/theme-tools";

const noop = () => {};

const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: true,
};

const styles: Styles = {
    global: () => ({
        body: {
            overflow: "scroll",
        },
    }),
};

const theme = extendTheme({
    styles,
    config,
});

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

function handleSuccess(response: AxiosResponse) {
    return response;
}

function handleError(error: AxiosError) {
    // @ts-ignore
    error.response?.data.message.map(noop);

    return Promise.reject(error);
}

Axios.interceptors.response.use(handleSuccess, handleError);
// @ts-ignore
function MyApp({ Component, pageProps, session }) {
    return (
        <ChakraProvider theme={theme}>
            <SessionProvider session={session}>
                <PortalManager>
                    <Head>
                        <style global>{`
                    body {
                    background-image: url("/633.png")!important;
                    background-size: 250px !important;
                    background-repeat: repeat!important;
                }
                    `}</style>
                    </Head>
                    {/* <Loading /> */}
                    <Component {...pageProps} />
                    <GoToUp />
                </PortalManager>
            </SessionProvider>
        </ChakraProvider>
    );
}

export default trpc.withTRPC(MyApp);
