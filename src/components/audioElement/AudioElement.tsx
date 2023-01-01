import { Col, Collapse, Divider, List, Row, Typography } from "antd";
import { memo } from "react";

const { Panel } = Collapse;

function AudioElement({ url, key }: { url: string; key: string }) {
  return (
    <Row className="block border border-balck p-2 rounded max-w-xl w-full mx-auto">
      <Typography.Title className="block">كلمة عربية </Typography.Title>
      <Row className="block">
        {Array.from({ length: 6 }).map((e, i) => {
          return (
            <Row className="flex flex-row items-stretch">
              <Col>s</Col>
              <Col className="flex-grow">s</Col>
              <Col>s</Col>
            </Row>
          );
        })}
      </Row>
    </Row>
  );
}

export default memo(AudioElement);
