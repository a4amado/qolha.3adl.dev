
import { AppProps } from "next/app";
import { Layout } from "antd"; // Import the Layout component from Ant Design
import { SessionProvider } from "next-auth/react";
import Router from "next/router";
import Axios, { AxiosError, AxiosResponse } from "axios";
import { trpc } from "@utils/trpc";
import Head from "next/head";

import "../styles/globals.css"; // Import your Tailwind CSS styles

const { Header, Content } = Layout; // Destructure Header and Content components from Ant Design Layout

const noop = () => { };

Router.events.on("routeChangeStart", () => {
    // Your loading animation logic
});

Router.events.on("routeChangeComplete", () => {
    // Your loading animation logic
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

function MyApp({ Component, pageProps, session }: AppProps & { session: any }) {
    return (
        <Layout>
            <SessionProvider session={session}>
                <Head>
                    <style global jsx>{`
                        body {
                            background-image: url("/633.png");
                            background-size: 250px;
                            background-repeat: repeat;
                        }
                    `}</style>
                </Head>

                <Content>
                    <Component {...pageProps} />
                </Content>
            </SessionProvider>
        </Layout>
    );
}

export default trpc.withTRPC(MyApp);
