import Header from "@ui/header";
import Head from "next/head";
import React from "react";
import PageContainer from "@ui/PageContainer";

import { useSession } from "next-auth/react";
import Loading from "@ui/Loading";
import { useRouter } from "next/router";
import { trpc } from "@utils/trpc";

import ClipComponent from "@ui/ClipComponent";
import { Button, ButtonGroup, Spinner } from "@blueprintjs/core";
import { Box } from "@mui/material";

function Clips() {
    const session = useSession();
    const router = useRouter();

    const clip = trpc.clip.getClipThatNeedsRevision.useQuery();
 
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
            <PageContainer>
                <div className="flex flex-col relative">
                {clip.isLoading || clip.isFetching || clip.isRefetching  && <Box sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        bgcolor: "white",
                        zIndex: 55
                    }} ><Spinner /></Box>}
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
