"use client";
import { PauseCircleFilled, PlayCircleFilled } from "@ant-design/icons";
import { Button, Col, Flex, Switch } from "antd";
import { TiTick } from "react-icons/ti";
import { FaTimes } from "react-icons/fa";
import { useAudio } from "react-use";
import { api } from "~/trpc/react";

export default function ClipAdminComponent({
  clipId,
  wordId,
  publicUrl,
  text,
}: {
  clipId: string;
  wordId: string;
  publicUrl: string;
  text: string;
}) {
  const approveClip = api.clip.approveClip.useMutation();
  const rejectClip = api.clip.rejectClip.useMutation();
  const audio = useAudio({
    src: publicUrl,
  });
  function stopAllOtherAudiosInThePage() {
    const audios = document.querySelectorAll("audio");
    audios.forEach((element) => {
      element.pause();
    });
  }
  function play() {
    stopAllOtherAudiosInThePage();

    if (audio[1].paused) {
      audio[2].seek(0);
      audio[2].play();
    }
  }
  return (
    <>
      {audio[0]}

      <Flex className="w-full gap-3 border p-3 hover:cursor-pointer">
        s
        <Col>
          <Button
            color="green"
            icon={
              <>
                {audio[1].playing ? (
                  <PauseCircleFilled />
                ) : (
                  <PlayCircleFilled />
                )}
              </>
            }
            onClick={play}
          />
        </Col>
        <Col>
          <Button
            color="green"
            icon={<TiTick />}
            onClick={(e) => {
              console.log("Here");
              approveClip.mutate({
                clipId: clipId,
              });
            }}
          />
        </Col>
        <Col>
          <Button
            onClick={(e) => {
              console.log("Here@");
              rejectClip.mutate({
                clipId: clipId,
              });
            }}
            icon={<FaTimes />}
          />
        </Col>
        <Col className="flex h-full items-center">{text}</Col>
      </Flex>
    </>
  );
}
