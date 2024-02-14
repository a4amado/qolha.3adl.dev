import { getServerSession } from "next-auth/next";
import AddWord from "~/app/_components/AddWord";
 
export default function Page() {
  return (
    <>
      <AddWord />
    </>
  );
}
