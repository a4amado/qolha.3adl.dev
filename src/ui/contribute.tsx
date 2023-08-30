import { Button } from "antd";
import useRecorder from "@wmik/use-media-recorder";
import { trpc } from "@utils/trpc";
import useAxios from "axios-hooks";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import LoadingComponent from "./ComponentLoading";
import { useAudio } from "react-use";
import { PauseCircleFilled, PlayCircleFilled } from "@ant-design/icons";

export default function ContributeClip({
    wordId,
    afterFunc
}: {
    wordId?: string;
    afterFunc?: Function;
}) {
    const word = trpc.word.getWordThatNeedsClips.useQuery(wordId);
    const [clip, axiosSubmitClip] = useAxios(
        {
            method: "POST",
            withCredentials: true,
            url: `/api/clip/insert?wordId=${word?.data && word?.data?.id}`,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        },
        {
            manual: true
        }
    );
    const [link, setLink] = useState("");

    const audio = useAudio({
        src: link,
    })

    const session = useSession();

    const rec = useRecorder({
        recordScreen: false,
        mediaStreamConstraints: {
            audio: true,
            video: false
        },
        onStop: (b) => {
            const url = URL.createObjectURL(b);
            setLink(url);
        }
    });

    async function submitClip() {
        if (!rec.mediaBlob?.size || !rec.mediaBlob) return;

        const f = new FormData();
        f.append("clip", rec.mediaBlob);
        await axiosSubmitClip({
            data: f
        });

        if (!!afterFunc) {
            return afterFunc();
        }

        setLink("");

        word.refetch();
    }

    return (
        <div className="flex w-full flex-col bg-white p-10 relative gap-2 rounded overflow-hidden">
            <LoadingComponent isLoading={clip.loading || session.status === "loading"} />
            <div className="flex flex-row w-full justify-around gap-2">
                <Button
                    size="small"
                    shape="round"
                    onClick={() =>
                        ["recording", "paused"].includes(rec.status)
                            ? rec.stopRecording()
                            : rec.startRecording()
                    }
                >
                    {rec.status === "recording" ? "Stop" : "Start"}
                </Button>
                <Button
                    onClick={async () => {
                        await submitClip();
                        await word.refetch();
                    }}
                    disabled={session.status !== "authenticated" || clip.loading}
                    size="small"
                    shape="round"
                >
                    Send
                </Button>
            </div>
            <div className="w-full border border-black text-2xl h-24 flex justify-center items-center font-sans">
                {word.data?.ar}
            </div>
            <div>
                {audio[0]}
                <Button onClick={audio[2].play}>
                    <PlayCircleFilled />
                </Button>
                <Button onClick={audio[2].pause}>
                    <PauseCircleFilled />
                </Button>
            </div>
        </div>
    );
}
