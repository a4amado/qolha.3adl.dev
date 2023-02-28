import { Button, Col, Row, Typography, Modal } from "antd";
import { memo, useEffect, useState } from "react";
import { BiPlay } from "react-icons/bi";
import { useAudio, useToggle } from "react-use";
import ReportWord from "@ui/ReportWord";
 import URLQrCode from "@ui/URLQrCode";
import RateRecord from "@ui//RateRecord";

function AudioHero({ word }: { word: any }) {
  return (
    <Row className="block border border-balck p-2 rounded max-w-xl w-full mx-auto">
      <Col className="flex flex-row justify-end my-2"><ReportWord wordID={word.id} /></Col>
      <Col className="flex flex-row justify-between ">
        <Typography.Title className="block">{word.ar}</Typography.Title>
        
        <URLQrCode />
      </Col>

      <Row className="flex gap-1">
        {word.clips.map((e: any, i: any) => (
          <AudioElement e={e} key={i} />
        ))}
      </Row>
    </Row>
  );
}

export default memo(AudioHero);

const AudioElement = ({ e }: any) => {
  const state = useToggle(false);
  const s = useState<any>();
  useEffect(() => {
    const f = new Audio(`/api/clip/stream/${e.path}`);
    s[1](f);
  }, []);

  return (
    <Row className="flex w-full flex-row items-stretch align-middle gap-1 border p-1 rounded" key={Math.random().toString()}>
      <Button
        onClick={() => {
          if (s[0].paused) {
            s[0].play();
            state[1](true);
          } else {
            s[0].pause();
            state[1](false);
          }
        }}
      >
        <BiPlay />
      </Button>

      <Col className="flex-grow flex items-center">{e?.createBy?.name}</Col>
      <RateRecord id={e.id} />
    </Row>
  );
};
