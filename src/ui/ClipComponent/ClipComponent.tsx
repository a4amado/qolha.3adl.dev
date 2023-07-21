import { ButtonGroup, Button } from "@blueprintjs/core";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useAudio } from "react-use";

export default function ClipComponent({ number, ar, username, clipId }: { number: number; ar: string; username: string; clipId: string }) {
    const rej = trpc.clip.reject.useMutation();
    const acc = trpc.clip.accept.useMutation();
    const disabled = useState(false);
    const session = useSession();
    const audio = useAudio({
        src: `/api/clip/${clipId}/stream`,
    });
    return (
        <div className={`flex p-1 justify-between ${number % 2 === 0 ? "bg-slate-200" : ""}`}>
            <span>{ar}</span>
            <span>{username}</span>
            {audio[0]}
            <ButtonGroup className="gap-2">
                <Button disabled={disabled[0]} onClick={audio[2].play} small icon="play" text="play" />
                {/** @ts-ignore */}
                {session.status === "authenticated" && ["owner", "admin"].includes(session.data?.user?.role || "") && (
                    <Button
                        disabled={disabled[0]}
                        onClick={async () => {
                            await acc.mutateAsync({ clipId: clipId });
                            disabled[1](true);
                            audio[2].pause();
                        }}
                        small
                        intent="primary"
                        text="accept"
                    />
                )}
                {/** @ts-ignore */}
                {session.status === "authenticated" && ["owner", "admin"].includes(session.data?.user?.role || "") && (
                    <Button
                        disabled={disabled[0]}
                        onClick={async () => {
                            await rej.mutateAsync({ clipId: clipId });
                            disabled[1](true);
                            audio[2].pause();
                        }}
                        small
                        intent="danger"
                        icon="trash"
                        text="reject"
                    />
                )}
            </ButtonGroup>
        </div>
    );
}
