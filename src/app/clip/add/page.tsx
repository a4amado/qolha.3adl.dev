"use client";

import { Flex } from "antd";
 import AddClip from "~/app/_components/AddClip";

export default function Page() {
  return (
    <Flex className="h-screen w-full">
      {" "}
      <AddClip />
    </Flex>
  );
}
