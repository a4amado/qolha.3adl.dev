import { Row, Button, Typography, Spin, notification } from "antd";
import useRecorder from "@wmik/use-media-recorder";
import React from "react";
import PageContainer from "@ui/PageContainer";
import Header from "@ui/header";

import useAxios from "axios-hooks";
import useHotkeys from "@reecelucas/react-use-hotkeys";



type NotificationProps = {
    message: string;
    destroyAfter: number;
    type: keyof typeof notification;
};
export function showNotification(Props: NotificationProps) {
    notification[Props.type]({ type: "error", message: Props.message, duration: Props.destroyAfter });
    return;
}

// words/:wordID/skip
export default function Page() {
    const recorder = useRecorder({
        blobOptions: { endings: "transparent", type: "audio/webm" },
        mediaStreamConstraints: { audio: true, video: false },
        mediaRecorderOptions: { mime: "audio/webm" },
    });

    const [word, refetch] = useAxios(
        {
            url: QueryWord({
                query: {
                    _order: "asc",
                    _sort: "clips",
                    _limit: 1,
                },
                url: `api/word`,
            }),
            method: "GET",
        },
        { manual: false }
    );
    const [clip, submitClip] = useAxios({ method: "POST", withCredentials: true, url: `/api/clip/insert?wordId=${word?.data?.id}`, headers: { "Content-Type": "multipart/form-data" } }, { manual: true });
    const [deleted_word, deleteWord] = useAxios({ method: "DELETE", url: `/api/word/${word?.data?.id}/delete` }, { manual: true });
    const controller = React.useRef<HTMLAudioElement>();

    const url = React.useMemo(() => {
        if (!recorder.mediaBlob) return "";
        return typeof window !== "undefined" ? URL.createObjectURL(recorder.mediaBlob) : "";
    }, [recorder.status, recorder.mediaBlob]);

    useHotkeys("1", (e) => {
        recorder.startRecording();
        recorder.stopRecording();
    });

    useHotkeys("2", () => {
        controller.current?.play();
        controller.current?.pause();
    });

    async function submit() {
        try {
            if (recorder.status === "recording")
                return showNotification({
                    destroyAfter: 1000,
                    message: "اوقف التسجيل اولا",
                    type: "error",
                });

            if (recorder.mediaBlob?.size === 0 || !word.data?.id || !recorder.mediaBlob)
                return showNotification({
                    message: "Noting to Submit",
                    destroyAfter: 1500,
                    type: "error",
                });

            const form = new FormData();
            form.append("clip", recorder.mediaBlob);

            await submitClip({ data: form });
            await refetch();

            recorder.clearMediaBlob();
            recorder.clearMediaStream();

            showNotification({
                destroyAfter: 40,
                message: "تَم الحِفظ.",
                type: "success",
            });
        } catch {
            showNotification({
                message: "Something went wrong",
                destroyAfter: 800,
                type: "error",
            });
        }
    }

    return (
        <>
            <Header isSearch={false} />
            <PageContainer>
                <Row className="flex flex-col w-full">
                    <Row className=" flex justify-center align-middle">
                        <Typography.Title className="text-7xl flex justify-center align-middle">{word?.data?.ar}</Typography.Title>
                    </Row>

                    <Row className="w-full">
                        {/* @ts-ignore  */}
                        <audio ref={controller} src={url} preload="true" controls className="w-full" />
                    </Row>
                    <Row className="flex flex-row justify-stretch h-80 gap-2 mx-0 relative">
                        <Row className={`${clip.loading ? "flex flex-col absolute w-full h-full bg-slate-200 z-[9999]" : "hidden"}`}>
                            <Spin />
                            <Typography>إنتظر لحظة</Typography>
                        </Row>

                        <Button className={`flex-grow border ${["recording"].includes(recorder.status) && "border-red-600"}`} onClick={() => recorder.startRecording()}>
                            تَسجيل
                        </Button>

                        <Button onClick={recorder.stopRecording} className="flex-grow">
                            صَهِِ!
                        </Button>
                        <Button onClick={submit} className="flex-grow">
                            ارسل
                        </Button>
                        <Button onClick={() => deleteWord()} className="flex-grow">
                            تخط
                        </Button>
                    </Row>
                </Row>
            </PageContainer>
        </>
    );
}
