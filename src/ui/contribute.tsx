import { Callout, Dialog, DialogBody, DialogFooter, Divider, Spinner } from "@blueprintjs/core";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import Recorder from "@ui/recorder";
import { trpc } from "@utils/trpc";
import useAxios from "axios-hooks";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

export default function ContributeClip() {
    const [open, setOpen] = useState(false);
    const [blob, setBlob] = useState<Blob | null>(null);
    const [link, setLink] = useState<string | null>(null);
    const word = trpc.word.getWordThatNeedsClips.useQuery();
    const [clip, axiosSubmitClip] = useAxios({ method: "POST", withCredentials: true, url: `/api/clip/insert?wordId=${word?.data && word?.data?.id}`, headers: { "Content-Type": "multipart/form-data" } }, { manual: true });
    const deleted_word = trpc.word.deleteWord.useMutation();
    const session = useSession();
    React.useEffect(() => {
        word.refetch();
    }, [open]);

    function handleFinishRecord(recordBlob: Blob, link: string) {
        setBlob(recordBlob);
        setLink(link);
    }

    async function submitClip() {
        if (blob?.size === 0 || !blob) return;
        const f = new FormData();
        f.append("clip", blob);
        await axiosSubmitClip({ data: f });
        setBlob(null);
        setLink(null);
        word.refetch();
    }

    return (
        <>
            <Box className="flex relative flex-col gap-2 my-3 max-w-xs border p-2">
                {session.status === "unauthenticated" &&
                    <Box sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        bgcolor: "white",
                        zIndex: 4
                    }}>Login</Box>
                }
                {session.status === "loading" || clip.loading &&
                    <Box sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        bgcolor: "white",
                        zIndex: 4
                    }}><Spinner  /></Box>
                }
                <Typography className="text-center" variant="h3">
                    {session.status != "authenticated" ? "شجل دخولك" : word.data?.ar}
                </Typography>
                <Recorder disabled={!word.data?.ar || session.status != "authenticated"} onFinish={handleFinishRecord} />
                <Button
                        className="  bg-blue-500"
                        type="button"
                        onClick={async () => {
                            await submitClip();
                            word.refetch();
                        }}
                        disabled={session.status != "authenticated" || clip.loading}
                        variant="contained"
                        
                    >
                        send
                    </Button>
 
               
            </Box>
        </>
    );
}
