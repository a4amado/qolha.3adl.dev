import Header from "@ui/header";
import Head from "next/head";
import React, { useState } from "react";
import PageContainer from "@ui/PageContainer";
import { PlayCircleOutlined, PauseCircleOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import Loading from "@ui/Loading";
import { useRouter } from "next/router";
import { getBaseUrl, trpc } from "@utils/trpc";
import { useAudio, useInterval } from "react-use";
import { Button, ButtonGroup, Divider, Toaster } from "@blueprintjs/core";


function Clips() {
    const session = useSession();
    const router = useRouter();

    const clip = trpc.clip.getClipThatNeedsRevision.useQuery();
    const acc = trpc.clip.accept.useMutation();
    const rej = trpc.clip.reject.useMutation();

 


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
                <div className="flex flex-col max-w-sm ">
                    {
                        clip.data?.clips?.map((clip, i) => <ClipReview ClipName={clip.clipName}
                            ar={clip.word.ar}
                            clipId={clip.id}
                            number={i}
                            username={clip?.user?.name || ""}

                        />)
                    }
                </div>
            </PageContainer>
        </>
    );
}

export default Clips;

function ClipReview({ number, ar, username, clipId, ClipName }: {
    number: number, ar: string, username: string, clipId: string, ClipName: string
}) {
    const rej = trpc.clip.reject.useMutation()
    const acc = trpc.clip.accept.useMutation()
    const disabled = useState(false);
    const audio = useAudio({
        src: `/api/clip/${clipId}/stream`
    })
    return <div className={`flex p-1 justify-between ${number % 2 === 0 ? "bg-slate-200" : ""}`}>
        <span>{ar}</span>
        <span>{username}</span>
        {audio[0]}
        <ButtonGroup className="gap-2">
            <Button disabled={disabled[0]} onClick={audio[2].play} small icon="play" text="play" />
            <Button disabled={disabled[0]} 
            onClick={async() => {
                await acc.mutateAsync({clipId: clipId})
                disabled[1](true)

            }}
            small intent="primary" text="accept" />
            <Button disabled={disabled[0]} onClick={async () => {
                await rej.mutateAsync({ clipId: clipId })
                disabled[1](true)
            }} small intent="danger" icon="trash" text="reject" />
        </ButtonGroup>
    </div>
}