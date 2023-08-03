import { Spinner } from "@blueprintjs/core";

import MicNoneIcon from "@mui/icons-material/MicNone";
import StopIcon from "@mui/icons-material/Stop";
import useRecorder from "@wmik/use-media-recorder";

import { trpc } from "@utils/trpc";
import useAxios from "axios-hooks";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
import { mergeStyles } from "@fluentui/react";
import { Text, Button } from "@fluentui/react-components";



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
            <div
                className={mergeStyles({
                    display: "flex",
                    position: "relative",
                    flexDirection: "column",
                    gap: "10px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    maxWidth: "400px",
                    width: "100%",
                    border: "1px solid black",
                    padding: "10px",
                })}
            >
                <span
                    className={mergeStyles({
                        width: "100%",
                        textAlign: "center",
                        fontWeight: "bold",
                    })}
                >
                    Contribute
                </span>
                <LoadingOverlay active={clip.loading || session.status == "loading"} />
                <LoadingOverlay active={session.status === "unauthenticated"} icon={"Login"} />

                <Button onClick={() => (["recording", "paused"].includes(rec.status) ? rec.stopRecording() : rec.startRecording())} title={["recording", "paused"].includes(rec.status) ? "Record" : "Stop_"} appearance="outline">
                    {rec.status === "recording" ? <StopIcon /> : <MicNoneIcon />}
                </Button>
                <Button
                    type="button"
                    onClick={async () => {
                        await submitClip();
                        await word.refetch();
                    }}
                    disabled={session.status != "authenticated" || clip.loading}
                    appearance="outline"
                >
                    send
                </Button>

                <span
                    className={mergeStyles({
                        width: "100%",
                        border: "1px solid black",
                        fontSize: "20px",
                        height: "100px",
                    })}
                >
                    <Text className={mergeStyles({ alignSelf: "center", fontFamily: "IBM Plex Sans Arabic" })}>{word.data?.ar}</Text>
                </span>
                <audio src={link} controls />
            </div>
        </>
    );
}
