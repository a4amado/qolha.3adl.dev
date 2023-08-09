import Head from "next/head";
import React from "react";
import PageContainer from "@ui/PageContainer";
import { useSession } from "next-auth/react";
import Loading from "@ui/Loading";
import { useRouter } from "next/router";
import { trpc } from "@utils/trpc";
import ClipComponent from "@ui/ClipComponent";
import { Button, ButtonGroup, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import LoadingComponent from "@ui/ComponentLoading";

function Clips() {
    const session = useSession();
    const router = useRouter();

    const clip = trpc.clip.getClipThatNeedsRevision.useQuery();

    if (session.status === "loading") return <Loading />;

    if (session.status === "unauthenticated") {
        router.push({
            pathname: "/api/auth/signin",
        });
        return null;
    }

    // @ts-ignore
    if (session.data.user.role !== "owner") {
        router.push({
            pathname: "/",
        });
        return null;
    }

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/disable_scroll.css" />
            </Head>
            <PageContainer>
                <div className="flex flex-col relative">
                    <LoadingComponent isLoading={clip.isLoading || clip.isFetching || clip.isRefetching} />
                    <ButtonGroup>
                        <Button onClick={() => clip.refetch()}>Fetch</Button>
                    </ButtonGroup>
                    <span>{clip?.data?.PendingClips._count._all} clips need revision</span>
                    <Table width="500px">
                        <Thead>
                            <Tr>
                                <Th>Word</Th>
                                <Th>Username</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {clip.data?.clips?.map((clip, i) => (
                                <ClipComponent userId={clip.user?.id || ""} ar={clip.word.ar} clipId={clip.id} number={i} username={clip?.user?.name || ""} key={clip.id} />
                            ))}
                        </Tbody>
                    </Table>
                </div>
            </PageContainer>
        </>
    );
}

export default Clips;
