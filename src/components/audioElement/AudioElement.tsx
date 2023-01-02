import { Button, Col, Collapse, Row, Typography } from "antd";
import { memo } from "react";
import { BiPlay } from "react-icons/bi";
const { Panel } = Collapse;

function AudioElement({ url, key }: { url: string; key: string }) {
  return (
    <Row className="block border border-balck p-2 rounded max-w-xl w-full mx-auto">
      <Typography.Title className="block">كلمة عربية </Typography.Title>
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

              <Col className="flex-grow flex items-center">
                ذكر من مصر
              </Col>
              <Button>قيّم</Button>
            </Row>
          );
        })}
      </Row>
    </Row>
  );
}

export default memo(AudioElement);
