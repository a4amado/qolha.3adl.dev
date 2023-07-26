import { ButtonGroup } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useAudio } from "react-use";
import NextImage from "next/image";
import NextLink from "next/link";
import SolidButton from "@ui/Button";

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
            <td className="self-center">
                <span>{ar}</span>
            </td>
            <td align="right" width="100%" className="flex-block self-center gap-1 px-1">
                <NextLink href={`/dashboard/users/${userId}`}>
                    <NextImage className="inline-block" alt="FLAG" src="https://flagsapi.com/BE/shiny/64.png" width={20} height={14} />
                    <span className="inline-block px-1">{username}</span>
                </NextLink>
            </td>

            {audio[0]}
            <td>
                <ButtonGroup>
                    <SolidButton variant="contained" size="small" className="bg-blue-700" endIcon={<PlayArrowIcon />} disabled={disabled[0]} onClick={audio[2].play}>
                        play
                    </SolidButton>

                    <SolidButton
                        disabled={disabled[0]}
                        onClick={async () => {
                            await acc.mutateAsync({ clipId: clipId });
                            disabled[1](true);
                            audio[2].pause();
                        }}
                        color="success"
                        variant="contained"
                        size="small"
                        className="bg-green-700"
                        sx={{
                            // @ts-ignore
                            display: session.status === "authenticated" && ["owner", "admin"].includes(session.data?.user?.role || "") ? "inline-flex" : "none",
                        }}
                    >
                        accept
                    </SolidButton>

                    <SolidButton
                        disabled={disabled[0]}
                        onClick={async () => {
                            await rej.mutateAsync({ clipId: clipId });
                            disabled[1](true);
                            audio[2].pause();
                        }}
                        color="error"
                        variant="contained"
                        size="small"
                        className="bg-red-700"
                        startIcon={<DeleteIcon />}
                        sx={{
                            // @ts-ignore
                            display: session.status === "authenticated" && ["owner", "admin"].includes(session.data?.user?.role || "") ? "inline-flex" : "none",
                        }}
                    >
                        reject
                    </SolidButton>
                </ButtonGroup>
            </td>
        </tr>
    );
}
