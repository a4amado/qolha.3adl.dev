import { Button, Divider, Modal, Popover, Typography, Space, Table } from "antd"; // Import Ant Design components
import { InfoCircleOutlined, PlayCircleOutlined } from "@ant-design/icons"; // Import Ant Design icons
import PageContainer from "@ui/PageContainer";
import { trpc } from "@utils/trpc";
import { NextPageContext } from "next";
import React, { useEffect, useState } from "react";
import ContributeClip from "@ui/contribute";
import { useAudio } from "react-use";
import { RouterOutput } from "src/server/routers/_app";
import NextLink from "next/link";

const { Text, Title } = Typography;

export function getQueryItem(query: any) {
    if (typeof query === "string") return query;

    if (Array.isArray(query)) return query[0];
}

interface WordPageProps {
    word: string;
}

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {
            word: getQueryItem(context.query.word),
        },
    };
}

export default function WordPage({ word }: WordPageProps) {
    const QueryWord = trpc.search.searchWord.useMutation();

    useEffect(() => {
        QueryWord.mutate(word);
    }, []);

    return (
        <PageContainer contribute="yes">
            <div className="flex flex-col gap-5">
                <Title className="text-center">
                    <b>{QueryWord.data?.word}</b>
                </Title>
                <Table rowKey="id" dataSource={QueryWord?.data?.words}>
                    <Table.Column title="Word" dataIndex={["ar"]} key="ar" />
                    <Table.Column
                        title="Username"
                        render={(user: RouterOutput["search"]["searchWord"]["words"][number]) => {
                            return <a href={`/user/${user.user?.id}`}>{user.user?.name}</a>;
                        }}
                        key="username"
                    />
                    <Table.Column
                        title="Clips"
                        key="clips"
                        render={(props: RouterOutput["search"]["searchWord"]["words"][number]) => {
                            return <ClipsPopover clips={props.clips} wordId={props.id} />;
                        }}
                    />
                </Table>
            </div>
        </PageContainer>
    );
}

const RenderAudio = ({ clipId, username, userId }: { clipId: string; username: string; userId: string }) => {
    const [audio, state, controls] = useAudio({
        src: `/api/clip/${clipId}/stream`,
    });

    return (
        <div className="flex items-center justify-between">
            {audio}
            <Text>{username}</Text>
            <Button shape="circle" icon={<PlayCircleOutlined />} onClick={controls.play} />
        </div>
    );
};

const ClipsPopover = ({ clips, wordId }: { clips: RouterOutput["search"]["searchWord"]["words"][number]["clips"]; wordId: string }) => {
    return (
        <Popover content={<PopoverContent clips={clips} wordId={wordId} />}>
            <Button icon={<PlayCircleOutlined />} size="small" />
        </Popover>
    );
};

const PopoverContent = ({ clips, wordId }: { clips: RouterOutput["search"]["searchWord"]["words"][number]["clips"]; wordId: string }) => {
    return (
        <div className="flex flex-col gap-5 p-5">
            {clips.length === 0 && <NoClipsMessage wordId={wordId} />}
            {clips.map((clip) => (
                <RenderAudio userId={clip.user?.id || ""} username={clip.user?.name || ""} clipId={clip.id} />
            ))}
        </div>
    );
};

const NoClipsMessage = ({ wordId }: { wordId: string }) => (
    <div className="flex flex-col p-5">
        <Text>
            This word needs clips. Would you like to <NextLink href={`/clip/contribute/${wordId}`}>help</NextLink>?
        </Text>
    </div>
);
