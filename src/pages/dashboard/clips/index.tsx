import Header from "@ui/header";
import Head from "next/head";
import React from "react";
import PageContainer from "@ui/PageContainer";

import { useSession } from "next-auth/react";
import Loading from "@ui/Loading";
import { useRouter } from "next/router";
import { trpc } from "@utils/trpc";

import ClipComponent from "@ui/ClipComponent";
import { Button, ButtonGroup } from "@blueprintjs/core";

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
                    <ButtonGroup>
                        <Button icon="feed" text="fetch" onClick={() => clip.refetch()} />
                    </ButtonGroup>
                    <span>{clip?.data?.PendingClips._count._all} clips needs revision</span>
                    <table width="500px">
                        {clip.data?.clips?.map((clip, i) => (
                            <ClipComponent userId={clip.user?.id || ""} ar={clip.word.ar} clipId={clip.id} number={i} username={clip?.user?.name || ""} key={clip.id} />
                        ))}
                    </table>
                </div>
            </PageContainer>
        </>
    );
}

export default Clips;
