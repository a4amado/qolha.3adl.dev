import { PropsWithChildren, useRef, useState } from "react";
import ContributeClip from "./contribute";
import NextLink from "next/link";
import { useSession } from "next-auth/react";
import AddWord from "./addWord";
import Header from "./header";
import React from "react";
import { ButtonGroup, Divider } from "@mui/material";

export default function PageContainer({
    children,
    contributeClip = true,
    contributeWord = true,
}: PropsWithChildren & {
    contributeWord?: boolean;
    contributeClip?: boolean;
}) {
    const session = useSession();

    const logedIn = session.status === "authenticated";
    const NotlogedIn = session.status === "unauthenticated";
    return (
        <>
            <Header />
            <div className="flex flex-col  w-full max-w-4xl px-4 py-2 mx-auto mt-16 ">
                <div className="flex flex-row p-1 border  gap-2 bg-orange-400">
                    <ButtonGroup
                        sx={{
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <NextLink className="text-black" href="/">
                            Home
                        </NextLink>
                        <NextLink className={`text-black ${session.status === "authenticated" ? "none" : "inline-flex"}`} hidden={!NotlogedIn} href="/api/auth/signin">
                            SignIn
                        </NextLink>

                        <NextLink className={`text-black ${session.status === "unauthenticated" ? "none" : "inline-flex"}`} hidden={!logedIn} href="/api/auth/signout">
                            SignOut
                        </NextLink>
                        <NextLink className="text-black" href="/dashboard/clips">
                            Review Clips
                        </NextLink>
                    </ButtonGroup>
                </div>
                <div className="flex flex-col lg:flex-row  w-full">
                    <main className="w-full min-h-[400px]">{children}</main>
                    {contributeClip && (
                        <aside>
                            <ContributeClip />{" "}
                        </aside>
                    )}
                </div>
                {contributeWord && (
                    <div className="w-full">
                        <span className="flex p-1 border  gap-2 bg-orange-400">Contribute Word</span>
                        <AddWord />
                    </div>
                )}

                <footer className="flex p-1 border  gap-2 bg-orange-400">Qolha Phonatic Dictionary</footer>
            </div>
        </>
    );
}
