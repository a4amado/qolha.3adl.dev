import { PropsWithChildren, useRef, useState } from "react";
import ContributeClip from "./contribute";
import NextLink from "next/link";
import { useSession } from "next-auth/react";
import AddWord from "./addWord";
import Header from "./header";
import React from "react";

import { Flex, Spacer } from "@chakra-ui/react";

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
        <Flex flexDirection={"column"} height={"full"}  alignItems={"stretch"}>
            <Header />


            <Flex flex={"30px 1 0"} gap={"10px"} width={"full"} height={"full"} maxWidth={"1100px"} padding={"10px 20px"} margin={"0 auto"} flexDirection={{ base: "column", lg: "row" }}>
                <Flex minHeight={"full"} position={"relative"} bgColor={"white"} padding={"10px"} width="full"  >
                    {children}
                </Flex>
                <Flex as="aside" height={"fit-content"}>
                    <ContributeClip />
                </Flex>
            </Flex>



        </Flex>
    );
}
