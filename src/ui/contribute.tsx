import { Spinner } from "@blueprintjs/core";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";

import MicNoneIcon from "@mui/icons-material/MicNone";
import StopIcon from "@mui/icons-material/Stop";
import useRecorder from "@wmik/use-media-recorder";
import SolidButton from "@ui/Button";

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
        <>
            <Box className="flex relative flex-col gap-2 my-3 max-w-xs border p-2">
                <Box sx={{ width: "100%", textAlign: "center", fontWeight: "bold" }}>Contribute</Box>

                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        bgcolor: "white",
                        zIndex: 4,
                        display: session.status === "unauthenticated" ? "felx" : "none",
                    }}
                >
                    Login
                </Box>

                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        bgcolor: "white",
                        zIndex: 4,
                        display: clip.loading || session.status == "loading" ? "flex" : "none",
                    }}
                >
                    <Spinner />
                </Box>

                <ButtonGroup className="w-full flex justify-around">
                    <SolidButton
                        className="aspect-square bg-blue-500 text-white hover:bg-blue-300"
                        onClick={() => (["recording", "paused"].includes(rec.status) ? rec.stopRecording() : rec.startRecording())}
                        title={["recording", "paused"].includes(rec.status) ? "Record" : "Stop_"}
                        variant="contained"
                    >
                        {rec.status === "recording" ? <StopIcon /> : <MicNoneIcon />}
                    </SolidButton>
                    <SolidButton
                        className="  bg-blue-500"
                        type="button"
                        onClick={async () => {
                            await submitClip();
                            await word.refetch();
                        }}
                        disabled={session.status != "authenticated" || clip.loading}
                        variant="contained"
                    >
                        send
                    </SolidButton>
                </ButtonGroup>

                <Box
                    sx={{
                        width: "100%",
                        border: "1px solid black",
                        fontSize: "20px",
                        height: "100px",
                    }}
                    className="text-center"
                >
                    <Typography sx={{ alignSelf: "center", fontFamily: "IBM Plex Sans Arabic" }}>{word.data?.ar}</Typography>
                </Box>
                <audio src={link} controls />
            </Box>
        </>
    );
}
