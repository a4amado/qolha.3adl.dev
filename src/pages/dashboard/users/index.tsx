import { Button, notification, Typography } from "antd";
import axios, { AxiosError } from "axios";
import { GetServerSideProps } from "next/types";
import React from "react";
import PageContainer from "../../../components/PageContainer";
import isAdmin from "../../../server/common/isAdmin";
import RedirectToHome from "../../../server/common/redirectToHome";
import { auth } from "../../../server/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "../../../components/header";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const IsTheUserAdmin = isAdmin.isAdminSSR(ctx);
  console.log(IsTheUserAdmin);

  if (!IsTheUserAdmin) return RedirectToHome();

  return {
    props: {},
  };
};

export default function Page(props: any) {
  const [user, loading, error] = useAuthState(auth);

  console.log(user);

  if (loading) return "Lading";
  if (error) return "error";
  return (
    <>
      <Header isSearch={false} />
      <PageContainer>
        <Button
          onClick={() => {
            axios({
              method: "POST",
              url: "/api/admin/user/custom-claims/add",
              data: {
                email: user?.email,
                uid: user?.uid,
                role: "owner",
              },
            }).catch((res: AxiosError) => {
              const data: any = res.response?.data;

              notification["error"]({
                message: data.message || "Unkowen Error",
              });
            });
          }}
        >
          add Test
        </Button>
      </PageContainer>
    </>
  );
}
