"use client";

import { Button, Col, Flex, Typography } from "antd";
import { ReloadOutlined, LoadingOutlined } from "@ant-design/icons";
import { api } from "~/trpc/react";
import useMediaRecorder from "@wmik/use-media-recorder";
import { useEffect, useMemo, useState } from "react";
import { IoReloadOutline } from "react-icons/io5";
import useAxios from "axios-hooks";
import FormData from "form-data";
import { useAudio, useFirstMountState } from "react-use";

type AddClipProps =
  | { type: "random" }
  | {
      type: "specefic";
      id: string;
      text: string;
      close: () => void
    };

export default function AddClip(props: AddClipProps) {
  const first = useFirstMountState();
  const [seconds, setSeconds] = useState(0);

  const [{ data, loading: clipSubmitLoading, error: clipSubmitError }, submit] =
    useAxios(
      {
        url: "/api/clip/upload",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
      {
        manual: true,
      },
    );

  // @ts-ignore
  const word = api.word.getaWordThatNeedClips.useQuery(null, {
    refetchOnWindowFocus: false,
    enabled: props.type === "random",
  });

  const wordId = props.type === "specefic" ? props.id : word.data?.id;
  const text = props.type === "specefic" ? props.text : word.data?.text;
  let {
    error,
    status,
    mediaBlob,
    stopRecording,
    getMediaStream,
    startRecording,
    clearMediaBlob,
    clearMediaStream,
  } = useMediaRecorder({
    blobOptions: { type: "audio/webm" },
    mediaStreamConstraints: { audio: true },
  });

  const [src, setSrc] = useState("");

  useEffect(() => {
    if (!mediaBlob) return;
    setSrc(URL.createObjectURL(mediaBlob));
  }, [status]);
  const [audio, inf, controller] = useAudio({
    src: src,
  });

  const loading =
    (word.isFetching ||
      word.isRefetching ||
      word.isLoading ||
      clipSubmitLoading) &&
    props.type !== "specefic";

  useEffect(() => {
    if (status !== "recording") return;
    const interval = setInterval(() => {
      setSeconds((v) => v + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, status]);

  function record() {
    if (status == "recording") stopRecording();
    else {
      setSeconds(0);
      startRecording();
    }
  }

  return (
    <Flex className=" justify-center">
      {audio}
      <Flex
        vertical
        className="relative m-3 aspect-square h-fit w-full max-w-sm rounded border p-3 shadow-md"
        gap={10}
      >
        <Button
          className="!absolute right-1 top-1"
          disabled={loading}
          loading={word.isFetching || word.isRefetching || word.isLoading}
          icon={<IoReloadOutline />}
          onClick={() => word.refetch()}
        />
        <Flex className="h-2/5 items-center justify-center">
          {text && <span className="text-3xl font-bold">{text}</span>}
          {loading && <LoadingOutlined />}
        </Flex>
        <Flex className="text-bold h-1/5 items-center justify-center">
          <Col className="justify-start">
            <span>
              {Math.floor(seconds % 60)
                .toString()
                .padStart(2, "0")}
            </span>
          </Col>
          :
          <Col className="justify-end">
            <span>
              {Math.floor(seconds / 60)
                .toString()
                .padStart(2, "0")}
            </span>
          </Col>
        </Flex>
        <Flex className="h-1/5" gap={10}>
          <Col className="h-full w-1/2">
            <Button
              disabled={loading}
              onClick={record}
              className="block !h-full w-full !shadow-md"
              type="primary"
            >
              {status == "recording" ? "توقف" : "تسجيل"}
            </Button>
          </Col>
          <Col className="h-full w-1/2">
            <Button
              disabled={loading}
              className="block !h-full w-full  !shadow-md"
              type="primary"
              danger
              onClick={() => {
                if (inf.playing) {
                  controller.pause();
                } else {
                  controller.play();
                }
              }}
            >
              {inf.playing ? "توقف" : "تشغيل"}
            </Button>
          </Col>
        </Flex>
        <Flex className="h-1/5">
          <Button
            onClick={async () => {
              if (status === "recording" || mediaBlob === null) return;
              const form = new FormData();
              form.append("file", mediaBlob);
              form.append("word_id", wordId);
              await submit({ data: form });
              clearMediaStream();
              clearMediaBlob();
              setSeconds(0);

              if (props.type === "specefic") {
                return props.close()
              }
              
              word.refetch();
            }}
            loading={clipSubmitLoading}
            disabled={loading}
            className="block !h-full w-full !shadow-lg"
            type="primary"
          >
            إرسال
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
