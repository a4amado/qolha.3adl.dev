import {
  Row,
  Button,
  Typography,
  Spin,
  notification

} from "antd";

import { useHotkeys } from "react-hotkeys-hook";

import useRecorder from "@wmik/use-media-recorder";
import React from "react";
import FormData from "form-data";

import PageContainer from "../../components/PageContainer";
import Header from "../../components/header";
import { useToggle } from "react-use";

export default function Page() {
  ///////////////////////////////////////////////////////////
  // Audiorecording instance
  ///////////////////////////////////////////////////////////
  const recorder = useRecorder({
    blobOptions: { endings: "transparent", type: "audio/webm" },
    mediaStreamConstraints: { audio: true, video: false },
    mediaRecorderOptions: { mime: "audio/webm" },
  });



  const audioRef = React.useRef<any>();
  const url = React.useMemo(() => {
    if (!recorder.mediaBlob) return "";
    return typeof window !== "undefined"
      ? URL.createObjectURL(recorder.mediaBlob)
      : "";
  }, [recorder.status, recorder.mediaBlob]);
  const sound = new FormData();
  React.useEffect(() => {
    sound.append("audio", recorder.mediaBlob);
  }, [recorder.status]);

  const [o, OF] = useToggle(false);
  const [, setError] = React.useState(false);



  async function submit() {
    try {
      OF(true)
      setError(false);
      if (!recorder.mediaBlob) return false;

      // await subabase.storage.from("audios").upload(`audios/${cuid()}`, recorder.mediaBlob);

      OF(false)
      recorder.clearMediaBlob();
      recorder.clearMediaStream();
      notification["success"]({
        message: "تَم الحِفظ.",
        closeIcon: true,
        duration: 4000
      })

    } catch {
      OF(false)
      setError(true);
      notification["error"]({
        message: "تَم الحِفظ.",
        closeIcon: true,
        duration: 4000
      });
    }
  }

  useHotkeys(
    "a",
    () => {
      if (recorder.status !== "recording") recorder.startRecording();
    },
    { keydown: true },
    [recorder.status],
  );

  useHotkeys(
    "a",
    () => {
      recorder.stopRecording();
    },
    { keyup: true },
    [recorder.status],
  );

  useHotkeys(
    "s",
    () => {
      submit();
    },

    [recorder.status],
  );

  useHotkeys(
    "d",
    () => {
      audioRef.current.play();
    },
    [recorder.status],
  );

  return (
    <>
      <Header isSearch={false} />
      <PageContainer>
        <Row className="flex flex-col w-full">
          <Row className=" flex justify-center align-middle">
            <Typography.Title className="text-7xl flex justify-center align-middle">السلام عليكم</Typography.Title>
          </Row>
          <Row className="w-full">
            <audio src={url} preload="" controls className="w-full" />
          </Row>
          <Row className="flex flex-row justify-stretch h-80 gap-2 my-2 mx-0 relative">
            {o && (
              <Row className="flex flex-col absolute w-full h-full bg-slate-200 z-[9999]">
                <Spin />
                <Typography>إنتظر لحظة</Typography>
              </Row>
            )}

            {
              recorder.status === "recording" ? <Button
                className={`flex-grow border border-red-600`}
                onClick={() => recorder.startRecording()}
              >
                تَسجيل
              </Button> : <Button
                className={`flex-grow`}
                onClick={() => recorder.startRecording()}
              >
                تَسجيل
              </Button>
            }
            <Button onClick={() => recorder.stopRecording()} className="flex-grow">
              صَهِِ!
            </Button>
            <Button onClick={submit} className="flex-grow">
              ارسل
            </Button>
          </Row>
        </Row>
      </PageContainer>
    </>
  );
}
