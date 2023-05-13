// import PageContainer from "@ui/PageContainer";
// import { Button, Typography, Col, Input, notification, Modal, Alert, Row } from "antd";

import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        redirect: {
            destination: "/api/auth/signin",
            permanent: true,
        },
    };
};
export default function D() {
    return <></>;
}
// import Header from "@ui/header";

// import useAxios from "axios-hooks";
// import React from "react";
// import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
// import { RxDiscordLogo } from "react-icons/rx"

// import { useToggle } from "react-use";
// import Head from "next/head";
// import Router from "next/router";
// import axios from "axios";
// import { Schema$Client$SignUp } from "@schema/auth/signUp";
// import { Schema$Client$signIn } from "@schema/auth/signIn";
// import { signIn } from "next-auth/react";
// import { FcGoogle } from "react-icons/fc";

// const LoginModal = () => {
//     const [{ loading, data, error }, refetch] = useAxios(
//         {
//             method: "POST",
//             withCredentials: true,
//         },
//         { manual: true }
//     );

//     async function signUp(e: any, form: FormikHelpers<any>) {
//         // @ts-ignore
//         refetch({
//             data: {
//                 email: e.email,
//                 password: e.password,
//                 vPassword: e.vPassword,
//                 username: e.username,
//             },
//             url: `/api/auth/signUp`,
//         });
//         form.resetForm();
//     }
//     const [open, toogle] = useToggle(false);

//     return (
//         <>
//             <Button onClick={() => toogle(true)}>التسجيل</Button>
//             <Modal open={open} onOk={() => toogle(false)} onCancel={() => toogle(false)} destroyOnClose={true}>
//                 <Typography.Title>التسجيل</Typography.Title>

//                 <Formik onSubmit={signUp} initialValues={{ email: "", username: "", password: "", vPassword: "" }} validationSchema={Schema$Client$SignUp}>
//                     {(props) => {
//                         return (
//                             <>
//                                 <Head>
//                                     <title>التسجيل</title>
//                                 </Head>
//                                 <Col className="block my-2">
//                                     <label className="block my-2">البريد الالكتروني</label>
//                                     <Field as={Input} name="email" />
//                                     <ErrorMessage name="email" />
//                                 </Col>

//                                 <Col className="block my-2">
//                                     <label className="block my-2">إسم المستخدم</label>
//                                     <Field as={Input} name="username" />
//                                     <ErrorMessage name="username" />
//                                 </Col>
//                                 <Col className="flex flex-row gap-2 w-full">
//                                     <Col className="w-1/2">
//                                         <label className="block my-2">كلمة السر</label>
//                                         <Field as={Input} name="password" type="password" />
//                                         <ErrorMessage name="password" />
//                                     </Col>

//                                     <Col className="w-1/2">
//                                         <label className="block my-2">تأكيد كلمة السر</label>
//                                         <Field as={Input} name="vPassword" type="password" />
//                                         <ErrorMessage name="vPassword" />
//                                     </Col>
//                                 </Col>
//                                 <Col className="my-2">
//                                     <Button className="block my-2" onClick={() => props.handleSubmit()} size="large">
//                                         التسجيل
//                                     </Button>
//                                 </Col>
//                             </>
//                         );
//                     }}
//                 </Formik>
//             </Modal>
//         </>
//     );
// };

// const AuthPage = () => {
//     async function SignIn(e: any, form: FormikHelpers<any>) {
//         await axios({
//             method: "POST",
//             url: "/api/auth/signIn",
//             data: e,
//             withCredentials: true,
//         });
//         form.resetForm();
//         Router.replace({ pathname: "/contribute", query: { ...Router.query, error: "" } }, Router.asPath, { locale: Router.locale, shallow: true });
//     }

//     return (
//         <>
//             <Header isSearch={false} />

//             <PageContainer>
//                 <Col className="w-full flex flex-col gap-1">
//                     <Button onClick={() => signIn("discord")} ><RxDiscordLogo /> </Button>
//                     <Button onClick={() => signIn("google")}><FcGoogle /></Button>
//                 </Col>
//                 <Formik onSubmit={SignIn} initialValues={{ email: "", password: "" }} validationSchema={Schema$Client$signIn}>
//                     {(props) => {
//                         return (
//                             <>
//                                 <Head>
//                                     <title>الدخول</title>
//                                 </Head>
//                                 <Row className="my-3"></Row>
//                                 <Typography.Title>تسجيل الدخول</Typography.Title>
//                                 <Col className="my-2">
//                                     <label className="my-2 block">البريد الالكتروني</label>
//                                     <Field as={Input} name="email" />
//                                     <ErrorMessage name="email" />
//                                 </Col>
//                                 <Col className="my-2">
//                                     <label className="my-2 block">كلمة السر</label>
//                                     <Field as={Input} name="password" type="password" />
//                                     <ErrorMessage name="password" />
//                                 </Col>

//                                 <Col className="my-2">
//                                     <Input onClick={() => props.handleSubmit()} type="submit" value="الدخول" size="large" />
//                                 </Col>
//                             </>
//                         );
//                     }}
//                 </Formik>

//                 <LoginModal />
//             </PageContainer>
//         </>
//     );
// };

// export default AuthPage;
