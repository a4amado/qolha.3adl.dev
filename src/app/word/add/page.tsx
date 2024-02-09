import { getServerSession } from "next-auth/next";
import AddWord from "~/app/_components/AddWord";
import { authOptions } from "~/server/auth";

export default async function Page() {
  const sess = getServerSession(authOptions)
  return <>


    <AddWord />
  </>
}
