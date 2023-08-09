import React, { useState, KeyboardEvent } from "react";
import { trpc } from "@utils/trpc";
import { Input, Flex, Link, Box } from "@chakra-ui/react";
import Router from "next/router";
import { Circular, Node } from "doublie";
import { RouterOutput } from "../../server/routers/_app";
import NextLink from "next/link";
import LoadingComponent from "@ui/ComponentLoading";

export default function Search() {
    const [input, setInput] = React.useState("");

    const [items, setItems] = useState<Circular<RouterOutput["search"]["searchWord"][number]> | null>(() => new Circular());
    const data = items?.toArray() || [];
    const [activeItem, setActiveItem] = useState<Node<RouterOutput["search"]["searchWord"][number]> | null>(() => new Node());

    function handleBtnDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            // @ts-ignore
            setActiveItem(activeItem?.next);
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            // @ts-ignore
            setActiveItem(activeItem?.prev);
        }

        if (e.key === "Enter") {
            e.preventDefault();
            Router.push(`/word/${activeItem?.value.ar}`);
        }

        return true;
    }

    const w = trpc.search.searchWord.useMutation({
        onSuccess(data) {
            const circular = new Circular();

            for (const e of data) {
                circular.append(e);
            }

            setItems(circular);
            setActiveItem(circular.head);
        },
    });

    React.useEffect(() => {
        w.mutate(input);
    }, [input]);

    return (
        <Flex flexDirection={"column"}>
            <Flex position={"relative"} background={"white"} borderRadius={"5px"}>
                <Input
                    onKeyDown={handleBtnDown}
                    value={input}
                    width={"full"}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                    _focusVisible={{}}
                    borderBottomLeftRadius={data.length > 0 ? 0 : "nssone"}
                    borderBottomRightRadius={data.length > 0 ? 0 : "nossne"}
                    borderBottom={data.length > 0 ? "none" : "asdasd"}
                />
                <Flex
                    padding={2}
                    borderColor={"inherit"}
                    display={data?.length > 0 ? "flex" : "none"}
                    background={"white"}
                    borderTop={"none!important"}
                    border={"1px solid black"}
                    flexDirection={"column"}
                    position={"absolute"}
                    top={"100%"}
                    left={"0"}
                    width={"full"}
                    zIndex={1}
                >
                    <LoadingComponent height={"200px"} isLoading={w.isLoading} />
                    {w.isSuccess &&
                        data.map((e) => (
                            <Link display={"flex"} alignItems={"end"} padding={1} as={NextLink} href={`/word/${e.ar}`} backgroundColor={activeItem?.value.id === e.id ? "yellow" : ""}>
                                <Box height={"10"} as="span"  >{e.ar}</Box>
                            </Link>
                        ))}
                </Flex>
            </Flex>
        </Flex>
    );
}
