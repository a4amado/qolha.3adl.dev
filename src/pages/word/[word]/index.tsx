import {
    IconButton,
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    PopoverBody,
    PopoverContent,
    Popover,
    PopoverTrigger,
    Spacer,
} from "@chakra-ui/react";
import PageContainer from "@ui/PageContainer";
import { trpc } from "@utils/trpc";
import type { GetServerSideProps } from "next";
import React from "react";
import { BiPlay } from "react-icons/bi";
import ContributeClip from "@ui/contribute";
import { useAudio } from "react-use";

export function getQueryItem(query: any) {
    if (typeof query === "string") return query;

    if (Array.isArray(query)) return query[0];
}

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
    props: {
        // trpcState: helpers.dehydrate(),
        word: ctx.query.word,
    },
});

export default function WordPage({ word }: { word: string }) {
    const QueryWord = trpc.search.searchWord.useMutation();

    React.useEffect(() => {
        QueryWord.mutate(word);
    }, []);

    return (
        <>
            <PageContainer>
                <Flex direction={"column"} gap={"5px"}>
                    <Text as="h1" textAlign={"center"}>
                        <b>{QueryWord.data?.word}</b>
                    </Text>
                    {QueryWord?.data?.words && <RenderWords props={QueryWord?.data} />}
                </Flex>
            </PageContainer>
        </>
    );
}

const NoClipsComponent = ({ wordId }: { wordId: string }) => {
    const open = useDisclosure({ defaultIsOpen: false });

    return (
        <>
            <Button onClick={open.onOpen}>Help, Now !!!</Button>
            <Modal onEsc={open.onClose} closeOnOverlayClick closeOnEsc onClose={open.onClose} isOpen={open.isOpen}>
                <ModalHeader title="Thanks for helping the community." />
                <ModalBody>
                    <ModalOverlay />
                    <ModalContent>
                        <ContributeClip afterFunc={open.onClose} wordId={wordId} />
                    </ModalContent>
                </ModalBody>
                <ModalFooter>ss</ModalFooter>
            </Modal>
        </>
    );
};

const RenderAudio = ({ clipId, username, userId }: { clipId: string; username: string; userId: string }) => {
    const audio = useAudio({
        src: `/api/clip/${clipId}/stream`,
    });

    return (
        <Flex justifyContent={"space-between"}>
            {audio[0]}
            <Text>{username}</Text>
            <IconButton aspectRatio={"square"} aria-label="PlayClip" icon={<BiPlay />} onClick={audio[2].play} />
        </Flex>
    );
};

import type { RouterOutput } from "../../../server/routers/_app";

const RenderWords = ({ props }: { props: RouterOutput["search"]["searchWord"] }) => {
    return (
        <>
            {props.words?.map((e) => (
                <Flex key={e.id} gap={"3px"} padding={"5px"} justifyContent={"space-between"} border={"1px solid black"}>
                    <Text>{e.ar}</Text>
                    <Spacer />
                    <ClipsPopover clips={e.clips} wordId={e.id} />
                </Flex>
            ))}
        </>
    );
};

const ClipsPopover = ({ clips, wordId }: { clips: RouterOutput["search"]["searchWord"]["words"][number]["clips"]; wordId: string }) => {
    return (
        <Popover>
            <PopoverTrigger>
                <IconButton aria-label="open menu" icon={<BiPlay />} size={"xs"} />
            </PopoverTrigger>


            <PopoverContent>
                <Flex display={"flex"} flexDirection={"column"} gap={"5px"} padding={"5px"}>
                    {clips.length === 0 && <NoClipsMessage />}

                    {clips.map((clip) => (
                        <RenderAudio userId={clip.user?.id || ""} username={clip.user?.name || ""} clipId={clip.id} />
                    ))}

                    <NoClipsComponent wordId={wordId} />
                </Flex>
            </PopoverContent>

        </Popover >
    );
};
const NoClipsMessage = () => (
    <Flex flexDirection={"column"} padding={"0 5px"}>
        <Text>This word need clips, would like to help ?</Text>
    </Flex>
);
