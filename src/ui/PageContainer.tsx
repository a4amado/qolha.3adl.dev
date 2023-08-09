import React, { PropsWithChildren } from "react";
import ContributeClip from "./contribute";
import Header from "./header";
import { Flex } from "@chakra-ui/react";

export default function PageContainer({ children }: PropsWithChildren) {
    return (
        <Flex flexDirection={"column"} height={"full"} alignItems={"stretch"}>
            <Header />
            <Flex
                flex={"30px 1 0"}
                gap={"10px"}
                width={"full"}
                height={"full"}
                maxWidth={"1100px"}
                padding={"10px 20px"}
                margin={"0 auto"}
                flexDirection={{
                    base: "column",
                    lg: "row",
                }}
            >
                <Flex flexDirection={"column"} minHeight={"full"} position={"relative"} bgColor={"white"} padding={"10px"} width="full">
                    {children}
                </Flex>
                <Flex as="aside" height={"fit-content"}>
                    <ContributeClip />
                </Flex>
            </Flex>
        </Flex>
    );
}
