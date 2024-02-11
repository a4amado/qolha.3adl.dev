import { getServerSession } from "next-auth/next";
import AddWord from "~/app/_components/AddWord";
import { authOptions } from "~/server/auth";

export default function Page() {
  return (
    <>
      <AddWord />
    </>
  );
}
