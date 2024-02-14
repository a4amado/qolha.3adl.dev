"use client";

import { TiTick } from "react-icons/ti";

interface AcceptComponentProps {
  clipId: string;
}

export const AcceptComponent: React.FC<AcceptComponentProps> = ({ clipId }) => {
  const approveClip = api.clip.approveClip.useMutation();
  const [clip, setClips] = useAtom(clipsState);
  function updateState() {
 
    if (!clip || clip.length == 0) return;
    const newState = clip.filter((value: ReviewClipItem) => value.id != clipId);
 
    setClips(newState);
  }

  return (
    <Col>
      <Button
        color="green"
        icon={<TiTick />}
        onClick={() => {
          approveClip
            .mutateAsync({
              clipId: clipId,
            })
            .then(() => updateState());
        }}
      />
    </Col>
  );
};
import { Button, Col, Flex } from "antd";
import { FaTimes } from "react-icons/fa";
import { api } from "~/trpc/react";
import { useAudio } from "react-use";
import { PauseCircleFilled, PlayCircleFilled } from "@ant-design/icons";
import { useAtom } from "jotai";
import { clipsState, ReviewClipItem } from "~/state/reviewClips";

interface RejectComponentProps {
  clipId: string;
}

export const RejectComponent: React.FC<RejectComponentProps> = ({ clipId }) => {
  const rejectClip = api.clip.rejectClip.useMutation();
  const [clip, setClips] = useAtom(clipsState);
  function updateState() {
 

    if (!clip || clip.length == 0) return;
    
    const newState = clip.filter((value: ReviewClipItem) => value.id != clipId);

    setClips(newState);
  }

  return (
    <Col>
      <Button
        onClick={() => {
          console.log("Here@");
          rejectClip
            .mutateAsync({
              clipId: clipId,
            })
            .then(() => updateState());
        }}
        icon={<FaTimes />}
      />
    </Col>
  );
};

interface PlayComponentProps {
  publicUrl: string;
  text: string;
}

interface PlayComponentProps {
  publicUrl: string;
  text: string;
}

export const PlayComponent: React.FC<PlayComponentProps> = ({
  publicUrl,
  text,
}) => {
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
        <Col className="flex h-full items-center">{text}</Col>
      </Flex>
    </>
  );
};
