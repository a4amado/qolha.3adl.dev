import { ButtonGroup, Button } from "@blueprintjs/core";
import { trpc } from "@utils/trpc";
import { useState } from "react";
import { useAudio } from "react-use";

export default function ClipComponent({ number, ar, username, clipId, ClipName }: {
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
                onClick={async () => {
                    await acc.mutateAsync({ clipId: clipId })
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