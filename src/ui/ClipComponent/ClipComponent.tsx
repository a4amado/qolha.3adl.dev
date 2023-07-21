import { ButtonGroup, Button } from "@blueprintjs/core";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useAudio } from "react-use";
import NextImage from "next/image";
import NextLink from "next/link";

export default function ClipComponent({ number, ar, username, clipId, userId }: { number: number; ar: string; username: string; clipId: string; userId: string }) {
    const rej = trpc.clip.reject.useMutation();
    const acc = trpc.clip.accept.useMutation();
    const disabled = useState(false);
    const session = useSession();
    const audio = useAudio({
        src: `/api/clip/${clipId}/stream`,
    });
    return (
        <tr className={`flex p-1 justify-between ${number % 2 === 0 ? "bg-slate-200" : ""}`}>
            <td>
                <span>{ar}</span>
            </td>
            <td align="right" width="100%" className="flex-block gap-1 px-1">
                <NextLink href={`/dashboard/users/${userId}`}>
                    <NextImage className="inline-block" alt="FLAG" src="https://flagsapi.com/BE/shiny/64.png" width={20} height={14} />
                    <span className="inline-block px-1">{username}</span>
                </NextLink>
            </td>

            {audio[0]}
            <td>
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
            </td>
        </tr>
    );
}
