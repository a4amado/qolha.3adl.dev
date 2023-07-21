import { Button, ButtonGroup, Divider, Callout } from "@blueprintjs/core";
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
        <>
            <Divider role="alert" />

            <ButtonGroup className="w-full flex justify-around">
                <Button
                    className="w-1/2"
                    icon={
                        ["recording", "paused"].includes(rec.status) ? (
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                        ) : (
                            "record"
                        )
                    }
                    disabled={disabled}
                    onClick={() => (["recording", "paused"].includes(rec.status) ? rec.stopRecording() : rec.startRecording())}
                    title={["recording", "paused"].includes(rec.status) ? "Record" : "Stop_"}
                    text={["recording", "paused"].includes(rec.status) ? "Stop_" : "Record"}
                />
                <Divider />
                <Button
                    className="w-1/2"
                    disabled={disabled}
                    onClick={() => (rec.status === "paused" ? rec.resumeRecording() : rec.pauseRecording())}
                    title={rec.status === "paused" ? "Resume" : "Pause "}
                    text={rec.status === "paused" ? "Resume" : "Pause "}
                />
            </ButtonGroup>
            <Divider role="alert" />

            <Callout intent="primary" icon="record" className="text-center" title={rec.status} />
            <Divider role="alert" />
            <audio src={link[0]} controls />
            <Divider role="alert" />
        </>
    );
}
