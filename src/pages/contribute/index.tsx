import { Row, Button, Typography, Spin, notification } from "antd";
import useRecorder from "@wmik/use-media-recorder";
import React from "react";
import PageContainer from "../../components/PageContainer";
import Header from "../../components/header";
import { useToggle } from "react-use";
import { v4 } from "uuid";
import Axios from "axios";
import useAxios from "axios-hooks";

interface WordType {
  ar: string;
  en: string;
  id: string;
}

export default function Page() {
  ///////////////////////////////////////////////////////////
  // Audio recording instance
  ///////////////////////////////////////////////////////////
  const recorder = useRecorder({
    blobOptions: { endings: "transparent", type: "audio/webm" },
    mediaStreamConstraints: { audio: true, video: false },
    mediaRecorderOptions: { mime: "audio/webm" },
  });

  const [word, refetch] = useAxios({ url: "/api/word/getWordWithTheLeastClips" }, { manual: false });
  const [clip, submitClip] = useAxios({}, { manual: true });

  const url = React.useMemo(() => {
    if (!recorder.mediaBlob) return "";
    return typeof window !== "undefined" ? URL.createObjectURL(recorder.mediaBlob) : "";
  }, [recorder.status, recorder.mediaBlob]);

  async function submit() {
    try {
      if (recorder.status === "recording") {
        const uid = v4();
        notification["warning"]({
          type: "error",
          message: "اوقف التسجيل اولا",
          key: uid,
        });
        setTimeout(() => {
          notification["destroy"](uid);
        }, 1000);
        return;
      }

      if (recorder.mediaBlob?.size === 0) return false;
      if (!word.data?.id) return false;
      if (!recorder.mediaBlob) return false;

      const form = new FormData();
      form.append("clip", recorder.mediaBlob);
      form.append("wordID", word.data.id);

      await submitClip({
        data: form,
        method: "POST",
        url: `/api/clip/append`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await refetch();

      
      recorder.clearMediaBlob();
      recorder.clearMediaStream();
      
      const uid = v4();
      notification["success"]({
        message: "تَم الحِفظ.",
        closeIcon: true,
        duration: 40,
        btn: true,
        key: uid,
      });
      setTimeout(() => {
        notification["destroy"](uid);
      }, 1000);
    } catch {
      const uid = v4();
      notification["error"]({
        message: "تَم الحِفظ.",
        closeIcon: true,
        duration: 4000,
        key: uid,
      });
      setTimeout(() => {
        notification["destroy"](uid);
      }, 1000);
    }
  }

  return (
    <>
      <Header isSearch={false} />
      <PageContainer>
        <Row className="flex flex-col w-full">
          <Row className=" flex justify-center align-middle">
            <Typography.Title className="text-7xl flex justify-center align-middle">
              {word?.data?.ar} - {word?.data?.id}
            </Typography.Title>
          </Row>
          <Row className="w-full">
            <audio src={url} preload="" controls className="w-full" />
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
          </Row>
        </Row>
      </PageContainer>
    </>
  );
}
