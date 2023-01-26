import { Button, Col, Row, Typography, Modal } from "antd";
import { memo } from "react";
import { BiPlay } from "react-icons/bi";
import RateRecord from "../RateRecord";
import URLQrCode from "../URLQrCode";

function AudioElement({ url, key }: { url: string; key: string }) {
  return (
    <Row className="block border border-balck p-2 rounded max-w-xl w-full mx-auto">
      <Col className="flex flex-row justify-between ">
        <Typography.Title className="block">كلمة عربية </Typography.Title>
        <URLQrCode />
      </Col>
      <Row className="flex gap-1">
        {Array.from({ length: 6 }).map((e, i) => {
          return (
            <Row
              className="flex w-full flex-row items-stretch align-middle gap-1 border p-1 rounded"
              key={i}
            >
              <Button>
                <BiPlay />
              </Button>

              <Col className="flex-grow flex items-center">ذكر من مصر</Col>
              <RateRecord />
            </Row>
          );
        })}
      </Row>
    </Row>
  );
}

export default memo(AudioElement);
