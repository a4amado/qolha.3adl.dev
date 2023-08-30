import { Button, Space, Popconfirm } from "antd";
import { DeleteOutlined, CheckOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useAudio } from "react-use";
import NextLink from "next/link";

interface ClipActionProps {
    number: number;
    ar: string;
    username: string;
    clipId: string;
    userId: string;
}

export default function ClipAction({
    number,
    ar,
    username,
    clipId,
    userId,
}: ClipActionProps) {
    const rej = trpc.clip.reject.useMutation();
    const acc = trpc.clip.accept.useMutation();
    const [disabled, setDisabled] = useState(false);
    const session = useSession();

    const [audio, state, controls] = useAudio({
        src: `/api/clip/${clipId}/stream`,
    });

    const handlePlayClick = () => {
        controls.play();
    };

    const handleAcceptClick = async () => {
        await acc.mutateAsync({
            clipId: clipId,
        });
        setDisabled(true);
        controls.pause();
    };

    const handleRejectClick = async () => {
        await rej.mutateAsync({
            clipId: clipId,
        });
        setDisabled(true);
        controls.pause();
    };

    return (

        <Space>
            {audio}
            <Button size="small" onClick={() => controls.play()}>
                <PlayCircleOutlined /> Play
            </Button>
            {session.status === "authenticated" && ["owner", "admin"].includes(session.data?.user?.role || "") && (
                <>
                    <Popconfirm
                        title="Are you sure you want to accept this clip?"
                        onConfirm={handleAcceptClick}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="primary"
                            icon={<CheckOutlined />}
                            size="small"
                        />
                    </Popconfirm>
                    <Popconfirm
                        title="Are you sure you want to reject this clip?"
                        onConfirm={handleRejectClick}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="default"
                            icon={<DeleteOutlined />}
                            size="small"
                        />
                    </Popconfirm>
                </>
            )}
        </Space>

    );
}
