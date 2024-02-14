"use client"

import { Flex } from "antd";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import AddClip from "~/app/_components/AddClip";
 
export default   function Page() {
 
  return (
    <Flex className="h-screen w-full">
      {" "}
      <AddClip />
    </Flex>
  );
}
