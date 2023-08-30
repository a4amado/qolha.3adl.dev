import Head from "next/head";
import React from "react";
import PageContainer from "@ui/PageContainer";
import { useSession } from "next-auth/react";
import Loading from "@ui/Loading";
import { useRouter } from "next/router";
import { trpc } from "@utils/trpc";
import ClipComponent from "@ui/ClipAction";
import { Button, Table } from "antd"; // Import Ant Design components
import LoadingComponent from "@ui/ComponentLoading";

const { Column, ColumnGroup } = Table; // Destructure Column and ColumnGroup components from Ant Design Table

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

            <PageContainer>
                <div className="flex flex-col relative">
                    <LoadingComponent isLoading={clip.isLoading || clip.isFetching || clip.isRefetching} />
                    <Button onClick={() => clip.refetch()}>Fetch</Button>
                    <span>{clip?.data?.PendingClips._count._all} clips need revision</span>
                    <Table dataSource={clip.data?.clips} rowKey="id">
                        <Column title="Word" dataIndex={["word", "ar"]} key="word" />
                        <Column title="Username" dataIndex={["user", "name"]} key="username" />
                        <Column
                            title="Actions"
                            key="actions"
                            render={(clip, _, i) => (
                                <ClipComponent userId={clip.user?.id || ""} ar={clip.word.ar} clipId={clip.id} number={i} username={clip?.user?.name || ""} />
                            )}
                        />
                    </Table>
                </div>
            </PageContainer>
        </>
    );
}

export default Clips;
