

import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useAudio } from "react-use";
import NextImage from "next/image";
import NextLink from "next/link";

import { Text } from "@fluentui/react-components";
import { Button } from "@fluentui/react";
import { mergeStyles } from "@fluentui/react";




export default function ClipComponent({ number, ar, username, clipId, userId }: { number: number; ar: string; username: string; clipId: string; userId: string }) {
    
    
    const rej = trpc.clip.reject.useMutation();
    const acc = trpc.clip.accept.useMutation();
    const disabled = useState(false);
    const session = useSession();
    const audio = useAudio({
        src: `/api/clip/${clipId}/stream`,
    });
    return (
        <tr className={mergeStyles({
            display: "flex",
            flexDirection: "row",
            padding: "5px",
            justifyContent: "space-between",
            background: number % 2 === 0 ? "yellow" : ""
        })
        }>
            <td className={mergeStyles({
                justifySelf: "center"
            })}>
                <span>{ar}</span>
            </td>
            <td align="right" width="100%" className={mergeStyles({
                display: "flex-block",
                justifySelf: "center",
                gap: "5px",
                padding: "0 5px"
            })}>
                <NextLink href={`/dashboard/users/${userId}`}>
                    <NextImage className="inline-block" alt="FLAG" src="https://flagsapi.com/BE/shiny/64.png" width={20} height={14} />
                    <span className="inline-block px-1">{username}</span>
                </NextLink>
            </td>

            {audio[0]}
            <td>
                <div className={mergeStyles({
                    display: "flex",
                    flexDirection: "row"
                })}>

                    <Button  className="bg-blue-700" disabled={disabled[0]} onClick={audio[2].play}>
                        play
                    </Button>

                    <Button
                        disabled={disabled[0]}
                        onClick={async () => {
                            await acc.mutateAsync({ clipId: clipId });
                            disabled[1](true);
                            audio[2].pause();
                        }}
                        color="success"
                        
                        shape="rounded"
                        

                        className={mergeStyles({
                            // @ts-ignore
                            display: session.status === "authenticated" && ["owner", "admin"].includes(session.data?.user?.role || "") ? "inline-flex" : "none",
                            
                        })}
                        
                    >
                        accept
                    </Button>

                    <Button
                        disabled={disabled[0]}
                        onClick={async () => {
                            await rej.mutateAsync({ clipId: clipId });
                            disabled[1](true);
                            audio[2].pause();
                        }}
                        color="error"
                        
                    


                        className={mergeStyles({
                            // @ts-ignore
                            display: session.status === "authenticated" && ["owner", "admin"].includes(session.data?.user?.role || "") ? "inline-flex" : "none",
                        })}
                    >
                        reject
                    </Button>
                </div>

            </td>
        </tr>
    );
}

