import { Box, Button, ButtonGroup } from "@mui/material";
import MicNoneIcon from "@mui/icons-material/MicNone";
import StopIcon from "@mui/icons-material/Stop";
import useRecorder from "@wmik/use-media-recorder";
import { useState } from "react";

export default function Recorder({ onFinish, disabled }: { onFinish: (b: Blob, link: string) => any; disabled: boolean }) {
    const link = useState("");

    const rec = useRecorder({
        recordScreen: false,
        mediaStreamConstraints: { audio: true, video: false },
        onStop: (b) => {
            const url = URL.createObjectURL(b);
            link[1](url);
            onFinish(b, url);
        },
    });

    return (
        <Box className="flex flex-col gap-2">
            <ButtonGroup className="w-full flex justify-around">
                <Button
                    className="w-1/2 bg-blue-500 text-white hover:bg-blue-300"
                    onClick={() => (["recording", "paused"].includes(rec.status) ? rec.stopRecording() : rec.startRecording())}
                    title={["recording", "paused"].includes(rec.status) ? "Record" : "Stop_"}
                >
                    {rec.status === "recording" ? <StopIcon /> : <MicNoneIcon />}
                </Button>
                <Button
                    className="w-1/2 bg-blue-500 text-white hover:bg-blue-300"
                    disabled={rec.mediaBlob?.size === 0}
                    onClick={() => {
                        rec.clearMediaBlob();
                        rec.clearMediaStream();
                    }}
                >
                    reset
                </Button>
            </ButtonGroup>

            <audio src={link[0]} controls />
        </Box>
    );
}
