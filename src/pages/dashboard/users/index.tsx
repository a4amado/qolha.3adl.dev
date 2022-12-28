import { GetServerSideProps } from "next/types";
import { adminDB } from "../../../server/admin";
import isAdmin from "../../../server/common/isAdmin";
import RedirectToHome from "../../../server/common/redirectToHome";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const IsTheUserAdmin = isAdmin.isAdminSSR(ctx);
  if (!IsTheUserAdmin) return RedirectToHome();

  await adminDB.collection("ADMIN").add({
    text: "Hello Admin",
  });

  return {
    props: {},
  };
};

export default function Page() {
  return <p>Good!</p>;
}
