import { Row, Button, Typography, Spin, notification } from "antd";
import useRecorder from "@wmik/use-media-recorder";
import React from "react";
import PageContainer from "../../components/PageContainer";
import Header from "../../components/header";
import { useToggle } from "react-use";
import { v4 } from "uuid";
import Axios from "axios";

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
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [word, setWord] = React.useState<WordType | null>();
  


  async function getWord() {
    try {
      const word = await Axios({
        url: "/api/word/getWordWithTheLeastClips",
      });

      setWord(word.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  // GET Word onMount
  React.useEffect(() => {
    getWord();
  }, []);

  const url = React.useMemo(() => {
    if (!recorder.mediaBlob) return "";
    return typeof window !== "undefined"
      ? URL.createObjectURL(recorder.mediaBlob)
      : "";
  }, [recorder.status, recorder.mediaBlob]);

  const [o, OF] = useToggle(false);
  const [, setError] = React.useState(false);

  async function submit() {
    try {
      if (recorder.status === "recording") {
        return notification["warning"]({
          type: "error",
          message: "اوقف التسجيل اولا",
        });
      }
      if (recorder.mediaBlob?.size === 0) return false;
      if (!word?.id) return false;

      setError(false);
      if (!recorder.mediaBlob) return false;

      const form = new FormData();
      form.append("clip", recorder.mediaBlob);

      await Axios({
        method: "POST",
        url: `/api/word/${word.id}/clip/append`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: form,
      });

      OF(true);
      setIsSubmitting(true);

      await getWord();

      OF(false);
      setIsSubmitting(false);
      recorder.clearMediaBlob();
      recorder.clearMediaStream();
      const uid = v4();
      const not = notification["success"]({
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
      OF(false);
      setError(true);
      notification["error"]({
        message: "تَم الحِفظ.",
        closeIcon: true,
        duration: 4000,
      });
    }
  }

  return (
    <>
      <Header isSearch={false} />
      <PageContainer>
        <Row className="flex flex-col w-full">
          <Row className=" flex justify-center align-middle">
            <Typography.Title className="text-7xl flex justify-center align-middle">
              {word?.ar} - {word?.id}
            </Typography.Title>
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

            {recorder.status === "recording" ? (
              <Button
                className={`flex-grow border border-red-600`}
                onClick={() => recorder.startRecording()}
              >
                تَسجيل
              </Button>
            ) : (
              <Button
                className={`flex-grow`}
                onClick={() => recorder.startRecording()}
              >
                تَسجيل
              </Button>
            )}
            <Button
              onClick={() => recorder.stopRecording()}
              className="flex-grow"
            >
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
