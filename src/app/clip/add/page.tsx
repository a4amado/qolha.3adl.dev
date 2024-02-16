"use client";

import { Flex } from "antd";
import AddClip from "~/app/_components/add-clip";

export default function Page() {
  return (
    <Flex className="h-screen w-full">
      <AddClip type="random" />
    </Flex>
  );
}
