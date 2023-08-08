import React, { useState } from "react";
import NextLink from "next/link";
import { trpc } from "@utils/trpc";
import { Input, MenuItem, Menu, Text, useToast, Flex, MenuList, MenuProvider } from "@chakra-ui/react";
import { useRef } from "react";
import { useRouter } from "next/router";


export default function Search() {
    const word = useState("");
    const [selected, setSelected] = useState("");
    const w = trpc.search.searchWord.useMutation();
    const ref = useRef<HTMLInputElement | null>(null);
    const router = useRouter();
    const toast = useToast();

    return (
        <Flex flexDir={"column"}>

            <p>sss</p>
        </Flex>
    );
}

