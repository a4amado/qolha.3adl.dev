"use client";

import { Button, Col, Flex, Typography } from "antd";
import { ReloadOutlined, LoadingOutlined } from "@ant-design/icons";
import { api } from "~/trpc/react";
import useMediaRecorder from "@wmik/use-media-recorder"
import { useEffect, useState } from "react";
import { IoReloadOutline } from "react-icons/io5";
import useAxios from 'axios-hooks'
import FormData from "form-data"
import { useFirstMountState } from "react-use";
import type { AppRouter } from "~/server/api/root";


export default function AddClip() {
  const first = useFirstMountState()
  const [seconds, setSeconds] = useState(0);
  const [{ data, loading: clipSubmitLoading, error: clipSubmitError }, submit] = useAxios({
    url: "/api/clip/upload", method: "POST", headers: {
      "Content-Type": "multipart/form-data"
    }
  }, {
    manual: true
  })


  // @ts-ignore
  const word = api.word.getaWordThatNeedClips.useQuery(null, { refetchOnWindowFocus: false, enabled: !first });

  let {
    error,
    status,
    mediaBlob,
    stopRecording,
    getMediaStream,
    startRecording,
    clearMediaBlob,
    clearMediaStream
  } = useMediaRecorder({
    blobOptions: { type: 'audio/webm' },
    mediaStreamConstraints: { audio: true }
  });

  const loading = word.isFetching || word.isRefetching || word.isLoading || clipSubmitLoading;

  useEffect(() => {
    if (status !== "recording") return;
    const interval = setInterval(() => {
      setSeconds((v) => v + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [seconds, status])

  function record() {
    if (status == "recording") stopRecording()
    else {
      setSeconds(0)
      startRecording()
    }
  }


  return (
    <Flex className="w-screen justify-center">
      <Flex
        vertical
        className="w-full h-fit max-w-sm aspect-square p-3 border rounded m-3 shadow-md relative"
        gap={10}
      >
        <Button
          className="!absolute top-1 right-1"
          disabled={loading}
          loading={word.isFetching || word.isRefetching || word.isLoading}
          icon={<IoReloadOutline />}
          onClick={() => word.refetch()}
        />
        <Flex className="h-2/5 justify-center items-center">
          {word.data?.text && <span className="font-bold text-3xl">{word.data?.text}</span>}
          {loading && <LoadingOutlined />}
        </Flex>
        <Flex className="h-1/5 justify-center items-center text-bold">

          <Col className="justify-start">
            <span>{Math.floor(seconds % 60).toString().padStart(2, "0")}</span>
          </Col>:
          <Col className="justify-end">
            <span>{Math.floor(seconds / 60).toString().padStart(2, "0")}</span>
          </Col>
        </Flex>
        <Flex className="h-1/5" gap={10}>
          <Col className="w-1/2 h-full">
            <Button disabled={loading} onClick={record} className="w-full !h-full block !shadow-md" type="primary">
              {
                status == "recording" ? "توقف" : "تسجيل"
              }
            </Button>
          </Col>
          <Col className="w-1/2 h-full">
            <Button disabled={loading}
              className="w-full !h-full block  !shadow-md"
              type="primary"
              danger
            >
              تشغيل
            </Button>
          </Col>
        </Flex>
        <Flex className="h-1/5">
          <Button onClick={async () => {
            if (status === "recording" || mediaBlob === null) return;
            const form = new FormData();
            form.append("file", mediaBlob)
            form.append("word_id", word.data?.id)
            await submit({ data: form });
            clearMediaStream();
            clearMediaBlob()
            setSeconds(0)
            word.refetch()
          }} loading={clipSubmitLoading} disabled={loading} className="w-full !h-full block !shadow-lg" type="primary">
            إرسال
          </Button>
        </Flex>
      </Flex >
    </Flex >
  );
}
