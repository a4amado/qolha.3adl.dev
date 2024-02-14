"use server";

import { PlayCircleOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Popover, Typography } from "antd";
import { NextRequest } from "next/server"


import { api } from "~/trpc/server";

// @ts-ignore
let words;

// @ts-ignore
const WordList = async (ctx) => {

  words = await api.word.search.query(ctx.searchParams.word);

  return (
    <Flex className="!w-full justify-center">
      <Flex className="w-full max-w-4xl flex-col gap-3 p-4">
        {words.map((_, idx) => {
          return (
            <div className="w-full">
              <WordListItem wordIDX={idx} />
            </div>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default WordList



const WordContributor = async ({
  wordIDX,
  clipIDX,
}: {
  wordIDX: number;
  clipIDX: number;
}) => {
  return <Col className="flex items-center"></Col>;
};

const ClipItemList = async ({
  clipIDX,
  wordIDX,
}: {
  clipIDX: number;
  wordIDX: number;
}) => {
  return (
    <Flex className="w-full">
      <Button className=" flex !aspect-square !h-full items-center justify-center">
        <PlayCircleOutlined className="text-1xl !flex !items-center !justify-center rounded-full shadow-xl" />
      </Button>
      <WordContributor wordIDX={wordIDX} clipIDX={clipIDX} />
    </Flex>
  );
};

const RenderClips = async ({ wordIDX }: { wordIDX: number }) => (
  <Flex className="h-full w-full max-w-xl flex-col gap-2 overflow-y-scroll">
    {/** @ts-ignore */}
    {words[wordIDX]?.clips.map((_, clipIDX) => {
      return <ClipItemList wordIDX={wordIDX} clipIDX={clipIDX} />;
    })}
  </Flex>
);

const WordListItem = async ({ wordIDX }: { wordIDX: number }) => {
  return (
    <Flex className="border p-2 shadow-sm">
      <Col className="flex  !text-4xl">
        <Popover
          placement="bottom"
          title={
            <Typography className="text-center">
              {/** @ts-ignore */}
              <h2>{words[wordIDX]?.text}</h2>
            </Typography>
          }
          className="!w-full max-w-4xl"
          overlayStyle={{ width: 400 }} // Set the width to 400px
          content={<RenderClips wordIDX={wordIDX} />}
        >
          <Button className=" flex !aspect-square !h-full items-center justify-center">
            <PlayCircleOutlined className="text-1xl !flex !items-center !justify-center rounded-full shadow-xl" />
          </Button>
        </Popover>
      </Col>

      <Col className="flex-grow-1 flex w-full items-center justify-start  !text-4xl">
        <Typography className=" px-4 !text-4xl">
          {/** @ts-ignore */}
          {words[wordIDX]?.text}
        </Typography>
      </Col>
    </Flex>
  );
};