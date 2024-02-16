"use client";

import { PlayCircleOutlined } from "@ant-design/icons";
import { Flex, Button } from "antd";
import { useAudio } from "react-use";

const ClipItemList = ({ url, word }: { url: string; word: string }) => {
  const [audio, s, c] = useAudio({
    src: url,
  });

  function play() {
    if (!s.playing) c.play();
    else c.pause();
  }

  return (
    <Flex className="w-full">
      {audio}
      <Button
        onClick={play}
        className=" flex !aspect-square !h-full items-center justify-center"
      >
        <PlayCircleOutlined className="text-1xl !flex !items-center !justify-center rounded-full shadow-xl" />
      </Button>
      {/* {words[wordIDX]?.clips[clipIDX]?.supabase_public_url} */}
      {/* <WordContributor wordIDX={wordIDX} clipIDX={clipIDX} /> */}
    </Flex>
  );
};

export default ClipItemList;
