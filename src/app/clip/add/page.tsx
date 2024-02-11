import { Flex } from "antd";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import AddClip from "~/app/_components/AddClip";
import { authOptions } from "~/server/auth";

export default async function Page() {
  const sess = await getServerSession(authOptions);
  if (!sess) {
    redirect("/auth");
  }
  return (
    <Flex className="h-screen w-full">
      {" "}
      <AddClip />
    </Flex>
  );
}
