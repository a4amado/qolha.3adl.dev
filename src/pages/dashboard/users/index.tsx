import { Button, notification, Typography } from "antd";
import axios, { AxiosError } from "axios";
import { GetServerSideProps } from "next/types";
import React from "react";
import PageContainer from "../../../components/PageContainer";
import { adminDB, adminUser } from "../../../server/admin";
import isAdmin from "../../../server/common/isAdmin";
import RedirectToHome from "../../../server/common/redirectToHome";
import { auth } from "../../../server/firebase";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const IsTheUserAdmin = isAdmin.isAdminSSR(ctx);
  if (!IsTheUserAdmin) return RedirectToHome();
 const admin = await adminUser.getUserByEmail("a4addel@gmail.com")
 
 const a = {
  uid: admin.uid,
  email: admin.email,
  customClaims: admin.customClaims
 }
 
  return {
    props: {
      admin: a
    },
  };
};

export default function Page(props: any) {
  
  
  return <PageContainer>
    {
      JSON.stringify(props.admin)
    }
    <Button onClick={() => {
        axios({
          method: "POST",
          url: "/api/admin/user/custom-claims/add",
          data: {
            email: props.admin.email,
            uid: props.admin.uid,
            role: "owner",
          }
        }).catch((res: AxiosError) => {
          const data: any = res.response?.data;
          
          notification["error"]({
            
            message: data.message || "Unkowen Error"
          })
        })
    }}>
  add Test
    </Button>
  </PageContainer>
}
