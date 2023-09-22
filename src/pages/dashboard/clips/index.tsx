import React, { useState } from "react";
import PageContainer from "@ui/PageContainer";
import { useSession } from "next-auth/react";
import Loading from "@ui/Loading";
import { useRouter } from "next/router";
import { trpc } from "@utils/trpc";
import ClipComponent from "@ui/ClipAction";
import { Button, Table } from "antd";
import LoadingComponent from "@ui/ComponentLoading";
import classNames from "classnames";

const { Column } = Table;

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
            <PageContainer contribute="no">
                <div className={classNames("flex", "flex-col", "relative")}>
                    <LoadingComponent isLoading={clip.isLoading || clip.isFetching || clip.isRefetching} />
                    <Button onClick={() => clip.refetch()}>Fetch</Button>
                    <span>{clip?.data?.PendingClips._count._all} clips need revision</span>
                    <Table dataSource={clip.data?.clips} rowKey="id">
                        <Column title="Word" key="word" dataIndex={["word", "ar"]} />
                        <Column title="Username" render={(user) => <a href="/user">{user.name}</a>} dataIndex={["user"]} key="username" />
                        <Column title="Actions" key="actions" render={(clip, _, i) => <ClipComponent clipId={clip.id} />} />
                    </Table>
                </div>
            </PageContainer>
        </>
    );
}

export default Clips;
