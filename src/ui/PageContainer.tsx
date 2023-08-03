import { PropsWithChildren, useRef, useState } from "react";
import ContributeClip from "./contribute";
import NextLink from "next/link";
import { useSession } from "next-auth/react";
import AddWord from "./addWord";
import Header from "./header";
import React from "react";
import { Box, ButtonGroup, Divider } from "@mui/material";
import { mergeStyles } from "@fluentui/react";
import { useMediaQuery } from 'react-responsive'





export default function PageContainer({
    children,
    contributeClip = true,
    contributeWord = true,
}: PropsWithChildren & {
    contributeWord?: boolean;
    contributeClip?: boolean;
}) {
    const session = useSession();
    const isComputer = useMediaQuery({
        query: `(min-width: 1100px)`
    })

    const logedIn = session.status === "authenticated";
    const NotlogedIn = session.status === "unauthenticated";
    return (
        <>
            <Header />
            <div className={mergeStyles({
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "1100px",
                padding: "5px 10px",
                margin: "0 auto",
            })}>
                <div className={mergeStyles({
                    display: "flex",
                    flexDirection: isComputer ? "flex": "column",
                    width: "100%",
                })}>
                    <main className={mergeStyles({
                        width: "100%",
                        minHeight: "400px",
                    })}>{children}</main>
                    <Divider variant="middle" />
                    <ContributeClip />
                </div>
                <footer className="flex p-1 border  gap-2 bg-orange-400">Qolha Phonatic Dictionary</footer>
            </div>
        </>
    );
}
