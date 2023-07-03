import Header from "@ui/header";
import { Button, Col, Row } from "antd";
import Head from "next/head";
import React from "react";
import PageContainer from "@ui/PageContainer";
import { PlayCircleOutlined, PauseCircleOutlined, CheckCircleTwoTone, CloseOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import Loading from "@ui/Loading";
import { useRouter } from "next/router";
import { getBaseUrl, trpc } from "@utils/trpc";
import { useAudio, useInterval } from "react-use";
import { showNotification } from "src/pages/contribute";

function Clips() {
    const session = useSession();
    const router = useRouter();

    const clip = trpc.clip.getClipThatNeedsRevision.useQuery();
    const acc = trpc.clip.accept.useMutation();
    const rej = trpc.clip.reject.useMutation();

    const disabled = clip.isLoading || acc.isLoading || rej.isLoading || !(clip.data?.clip?.id || false);

    function handleAction(id: string, action: "accept" | "reject") {
        if (!clip.data?.clip?.id) return;

        (action === "accept" ? acc : rej).mutate(
            {
                clipId: id,
            },
            {
                onSuccess: () => clip.refetch(),
                onError: (error) => showNotification({ message: error.message, destroyAfter: 800, type: "error" }),
            }
        );
    }

    if (session.status === "loading") return <Loading />;
    if (session.status === "unauthenticated") {
        return router.push({ pathname: "/api/auth/signin" });
    }

    // @ts-ignore
    // if (session.data.user.role != "owner") {
    //     return router.push({ pathname: "/" });
    // }

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/disable_scroll.css" />
            </Head>
            <Header isSearch={false} />

            <PageContainer>
                <Row className="flex flex-col">
                    <Row className="min-h-56 flex flex-row p-5">
                        <h1 className="h-full w-1/2 text-4xl grid">
                            {}
                            <span className="place-items-center">{clip.data?.clip?.word.ar}</span>
                        </h1>

                        <Row className="flex flex-row  gap-2 h-full w-1/2 ">
                            <Audio clipID={clip.data?.clip?.id || ""} />
                            <Button type="primary" disabled={disabled} onClick={() => handleAction(clip.data?.clip?.id || "", "accept")} className="w-full h-1/3 bg-green-500 hover:bg-green-400">
                                <CheckCircleTwoTone twoToneColor="#52c41a" className="text-4xl" />
                                قبول
                            </Button>
                            <Button disabled={disabled} onClick={() => handleAction(clip.data?.clip?.id || "", "reject")} type="primary" danger className="w-full h-1/3">
                                <CloseOutlined className="text-4xl" />
                                رفض
                            </Button>
                        </Row>
                    </Row>
                    <Row className="flex flex-col gap-2 p-5 w-full">
                        {clip.data?.RandomClips.map((clip, i) => {
                            return (
                                <Row key={clip.id} className={`flex flex-row border flex-nowrap whitespace-nowrap w-full  rounded-md border-cyan-900 ${i === 0 && "bg-green-500"}`}>
                                    {i === 0 && <DoubleLeftOutlined className="self-center p-2 text-2xl" />}
                                    <Row className={`p-2 text-2xl overflow-hidden max-w-fit text-ellipsis ${i === 0 && "text-slate-50"}`}>{clip.word.ar}</Row>
                                </Row>
                            );
                        })}
                    </Row>
                </Row>
            </PageContainer>
        </>
    );
}

export default Clips;

function Audio({ clipID }: { clipID: string }) {
    const [time, setTime] = React.useState<number>(0);

    const [Element, state, { pause, play, seek }] = useAudio({
        src: `${getBaseUrl()}/api/clip/${clipID}/stream`,
    });

    useInterval(() => {
        if (!state.playing) return;
        setTime(state.time * state.duration * 10);
    }, 100);

    return (
        <Row className="flex w-full h-1/3 justify-center">
            {Element}
            <Button
                className="w-1/2 h-[100%]"
                onClick={() => {
                    pause();
                    seek(0);
                }}
            >
                reset
            </Button>
            <Button className="w-1/2 h-full" onClick={() => (state.playing ? pause() : play())}>
                {!state.playing && <PlayCircleOutlined className="text-4xl" />}
                {state.playing && <PauseCircleOutlined className="text-4xl" />}
            </Button>
        </Row>
    );
}
