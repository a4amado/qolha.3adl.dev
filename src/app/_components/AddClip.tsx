"use client";

import { Button, Col, Flex } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
export default function AddClip() {
  return (
    <Flex className="w-screen justify-center items-center">
      <Flex
        vertical
        className="w-full max-w-sm aspect-square p-3 border rounded m-3 shadow-md relative"
        gap={10}
      >
        <Button
          className="!absolute top-1 right-1"
          icon={
            <LoadingOutlined
              onTransitionEndCapture={undefined}
            />
          }
        />
        <Flex className="h-2/5 justify-center items-center">كلمه عربيه</Flex>
        <Flex className="h-1/5 justify-center items-center text-bold">
          <Col className="justify-end">
            <span>{Math.floor(234 / 60)}</span>
          </Col>
          <Col>:</Col>
          <Col className="justify-start">
            <span>{Math.floor(123 % 60)}</span>
          </Col>
        </Flex>
        <Flex className="h-1/5" gap={10}>
          <Col className="w-1/2 h-full">
            <Button className="w-full !h-full block !shadow-md" type="primary">
              تسجيل
            </Button>
          </Col>
          <Col className="w-1/2 h-full">
            <Button
              className="w-full !h-full block  !shadow-md"
              type="primary"
              danger
            >
              تشغيل
            </Button>
          </Col>
        </Flex>
        <Flex className="h-1/5">
          <Button className="w-full !h-full block !shadow-lg" type="primary">
            إرسال
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
