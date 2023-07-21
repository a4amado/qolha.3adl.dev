import { Button, ButtonGroup, Callout, Dialog, DialogBody, DialogFooter, Divider } from "@blueprintjs/core";
import PageContainer from "@ui/PageContainer";
import Header from "@ui/header";
import Recorder from "@ui/recorder";
import { trpc } from "@utils/trpc";
import useAxios from "axios-hooks";
import React, { useState } from "react";

export default function ContributeClip() {
    const [open, setOpen] = useState(false);
    const [blob, setBlob] = useState<Blob | null>(null);
    const [link, setLink] = useState<string | null>(null);
    const word = trpc.word.getWordThatNeedsClips.useQuery();
    const [clip, axiosSubmitClip] = useAxios({ method: "POST", withCredentials: true, url: `/api/clip/insert?wordId=${word?.data && word?.data?.id}`, headers: { "Content-Type": "multipart/form-data" } }, { manual: true });
    const deleted_word = trpc.word.deleteWord.useMutation();

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
            <Button title="open" text="open" onClick={() => setOpen(true)} />
            <Dialog isOpen={open} title="Contribute a Clip" icon="info-sign" isCloseButtonShown onClose={() => setOpen(false)}>
                <DialogBody>
                    <div className="flex flex-col max-w-xs border p-2 mx-auto">
                        <Callout icon="new-text-box" intent="primary" title={word.data?.ar} />
                        <Recorder disabled={!word.data?.ar} onFinish={handleFinishRecord} />

                        <ButtonGroup nonce="">
                            <Button
                                className="w-1/2"
                                intent="primary"
                                icon="send-to"
                                title="send"
                                text="send"
                                onClick={async () => {
                                    await submitClip();
                                    word.refetch();
                                }}
                            />
                            <Divider />
                            <Button
                                className="w-1/2"
                                intent="danger"
                                icon="delete"
                                title="delete"
                                text="delete"
                                onClick={async () => {
                                    if (!word?.data?.id) return;
                                    await deleted_word.mutateAsync({
                                        wordId: word?.data?.id,
                                    });
                                    word.refetch();
                                }}
                            />
                        </ButtonGroup>
                    </div>{" "}
                </DialogBody>
                <DialogFooter actions={<Button onClick={() => setOpen(false)} intent="primary" text="Close" />} />
            </Dialog>
        </>
    );
}
