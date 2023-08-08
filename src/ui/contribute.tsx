import {  Button, ButtonGroup, Flex, Spinner } from "@chakra-ui/react";

import useRecorder from "@wmik/use-media-recorder";
import { trpc } from "@utils/trpc";
import useAxios from "axios-hooks";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

export default function ContributeClip() {
    const word = trpc.word.getWordThatNeedsClips.useQuery();
    const [clip, axiosSubmitClip] = useAxios({ method: "POST", withCredentials: true, url: `/api/clip/insert?wordId=${word?.data && word?.data?.id}`, headers: { "Content-Type": "multipart/form-data" } }, { manual: true });
    const [link, setLink] = useState("");

    const session = useSession();

    const rec = useRecorder({
        recordScreen: false,
        mediaStreamConstraints: { audio: true, video: false },
        onStop: (b) => {
            const url = URL.createObjectURL(b);
            setLink(url);
        },
    });

    async function submitClip() {
        if (rec.mediaBlob?.size === 0 || !rec.mediaBlob) return;
        const f = new FormData();
        f.append("clip", rec.mediaBlob);
        await axiosSubmitClip({ data: f });
        setLink("");
        word.refetch();
    }

    return (
        <Flex flexDirection={"column"} bgColor={"white"} p="10px" position={"relative"} gap={2} borderRadius={1} overflow={"hidden"}>
    
            <Flex pos="absolute" top={0} left={0} width="100%" height="100%" bgColor="white" zIndex={4} display={clip.loading || session.status === "loading" ? "flex" : "none"}>
                <Spinner />
            </Flex>

            <Flex flexDirection={"row"}  w="full" justifyContent="space-around" gap={2}>
                <Button
                    
                    onClick={() => (["recording", "paused"].includes(rec.status) ? rec.stopRecording() : rec.startRecording())}
                    title={["recording", "paused"].includes(rec.status) ? "Record" : "Stop_"}
                    
                >
                    {rec.status === "recording" ? "Stop" : "Start"}
                </Button>
                <Button
                    
                    type="button"
                    onClick={async () => {
                        await submitClip();
                        await word.refetch();
                    }}
                    disabled={session.status !== "authenticated" || clip.loading}
                    size={"md"}
                    
                >
                    send
                </Button>
            </Flex>

            <Flex w="full" border="1px solid black" fontSize="20px" h="100px" display="flex" justifyContent="center" alignItems="center" fontFamily="IBM Plex Sans Arabic">
                {word.data?.ar}
            </Flex>
            <audio src={link} controls />
        </Flex>
    );
}
