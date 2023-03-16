import { Row, Button, Typography, Spin, notification } from "antd";
import useRecorder from "@wmik/use-media-recorder";
import React, { ReactElement } from "react";
import PageContainer from "@ui/PageContainer";
import Header from "@ui/header";
import { v4 } from "uuid";
import useAxios from "axios-hooks";
import useHotkeys from "@reecelucas/react-use-hotkeys";


// words/:wordID/skip
export default function Page() {
  const recorder = useRecorder({
    blobOptions: { endings: "transparent", type: "audio/webm" },
    mediaStreamConstraints: { audio: true, video: false },
    mediaRecorderOptions: { mime: "audio/webm" },
  });

  const [word, refetch] = useAxios({ url: "http://localhost:4000/words/getWordWithTheLeastClips", method: "GET" }, { manual: false });
  const [clip, submitClip] = useAxios({ method: "POST", withCredentials: true , url: `http://localhost:4000/words/${word?.data?.id}/clip`, headers: { "Content-Type": "multipart/form-data" }}, { manual: true });
  const [skip, skipClip] = useAxios({ method: "POST", url: `http://localhost:4000/words/${word?.data?.id}/skip` }, { manual: true });
  const controller = React.useRef<HTMLAudioElement>()

  const url = React.useMemo(() => {
    if (!recorder.mediaBlob) return "";
    return typeof window !== "undefined" ? URL.createObjectURL(recorder.mediaBlob) : "";
  }, [recorder.status, recorder.mediaBlob]);


  useHotkeys("1", (e) => {
recorder.startRecording()
recorder.stopRecording()

  });
  useHotkeys("2", () => {
    controller.current?.play()
    controller.current?.pause()

  })
  

    

        
  async function submit() {
    try {
      if (recorder.status === "recording") {
        const uid = v4();
        notification["warning"]({ type: "error", message: "اوقف التسجيل اولا", key: uid });
        setTimeout(() => notification["destroy"](uid), 1000);
        return;
      }

      if (recorder.mediaBlob?.size === 0) return false;
      if (!word.data?.id) return false;
      if (!recorder.mediaBlob) return false;

      const form = new FormData();
      form.append("clip", recorder.mediaBlob);
    

      await submitClip({ data: form });
      await refetch();

      recorder.clearMediaBlob();
      recorder.clearMediaStream();

      const uid = v4();
      notification["success"]({ message: "تَم الحِفظ.", closeIcon: true, duration: 40, btn: true, key: uid });
      setTimeout(() => notification["destroy"](uid), 1000);
    } catch {
      const uid = v4();
      notification["error"]({ message: "تَم الحِفظ.", closeIcon: true, duration: 4000, key: uid });
      setTimeout(() => notification["destroy"](uid), 1000);
    }
  }

  async function skipWord( ) {
    skipClip({
      withCredentials: true
    })
  }

  return (
    <>
      <Header isSearch={false} />
      <PageContainer>
        <Row className="flex flex-col w-full">
          <Row className=" flex justify-center align-middle">
            <Typography.Title className="text-7xl flex justify-center align-middle">
              {word?.data?.ar}
            </Typography.Title>
          </Row>
          
          <Row className="w-full">
            {/* @ts-ignore */}
            <audio ref={controller} src={url} preload="true" controls className="w-full" />
          </Row>
          <Row className="flex flex-row justify-stretch h-80 gap-2 my-2 mx-0 relative">
            <Row className={`${clip.loading ? "flex flex-col absolute w-full h-full bg-slate-200 z-[9999]" : "hidden"}`}>
              <Spin />
              <Typography>إنتظر لحظة</Typography>
            </Row>

            <Button className={`flex-grow border ${["recording"].includes(recorder.status) && "border-red-600"}`} onClick={() => recorder.startRecording()}>
              تَسجيل
            </Button>

            <Button onClick={recorder.stopRecording} className="flex-grow">
              صَهِِ!
            </Button>
            <Button onClick={submit} className="flex-grow">
              ارسل
            </Button>
            <Button onClick={skipWord} className="flex-grow">
              تخط
            </Button>
          </Row>
        </Row>
      </PageContainer>
    </>
  );
} 