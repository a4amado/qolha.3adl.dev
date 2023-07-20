import { ButtonGroup, Button } from "@blueprintjs/core";
import { trpc } from "@utils/trpc";
import { useState } from "react";
import { useAudio } from "react-use";
import NextLink from "next/link";


export default function ClipComponent({ isAdminPage = true, number, ar, username, clipId, userID }: { number: number; ar: string; username: string; clipId: string; ClipName: string; userID: string, isAdminPage: boolean }) {
    const rej = trpc.clip.reject.useMutation();
    const acc = trpc.clip.accept.useMutation();
    const disabled = useState(false);
    const audio = useAudio({
        src: `/api/clip/${clipId}/stream`,
    });
    return (
        <div className={`flex justify-between p-1 ${number % 2 === 0 ? "bg-slate-200" : ""}`}>
            <span>{ar}</span>
            <NextLink href={`/dashboard/clips?userID=${userID}`}>{username}</NextLink>
            {audio[0]}
            <ButtonGroup className="gap-2">
                <Button disabled={disabled[0]} onClick={audio[2].play} small icon="play" text="play" />
                {isAdminPage && <Button
                    disabled={disabled[0]}
                    onClick={async () => {
                        await acc.mutateAsync({ clipId: clipId });
                        disabled[1](true);
                    }}
                    small
                    intent="primary"
                    text="accept"

                />}
                {isAdminPage &&
                    <Button
                        disabled={disabled[0]}
                        onClick={async () => {
                            await rej.mutateAsync({ clipId: clipId });
                            disabled[1](true);
                        }}
                        small
                        intent="danger"
                        icon="trash"
                        text="reject"
                        hidden={!isAdminPage}
                    />}
            </ButtonGroup>
        </div>
    );
}
