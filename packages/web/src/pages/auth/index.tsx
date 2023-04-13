import PageContainer from "@ui/PageContainer";
import { Button, Typography, Col, Input, notification, Modal, Alert, Row } from "antd";
import { signIn } from "next-auth/react";

import Header from "@ui/header";
import { FcGoogle } from "react-icons/fc";

import useAxios from "axios-hooks";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as yup from "yup";
import { useToggle } from "react-use";
import Head from "next/head";
import Router from "next/router";
import axios from "axios";
import { showNotification } from "../contribute";

const LoginModal = () => {
    const [{ loading, data, error }, refetch] = useAxios(
        {
            method: "POST",
            withCredentials: true,
        },
        { manual: true }
    );

    function signUp(e: any) {
        // @ts-ignore
        refetch({
            data: {
                email: e.email,
                password: e.password,
                vPassword: e.vPassword,
                username: e.username,
            },
            url: `http://localhost:4000/auth/signUp?no-cach=${Math.random()}`,
        }).catch((e) => {
            (e?.response?.data || []).map((e: any) => {
                notification["error"]({
                    message: e,
                });
            });
        });
    }
    const [open, toogle] = useToggle(false);

    return (
        <>
            <Button onClick={() => toogle(true)}>التسجيل</Button>{" "}
            <Modal open={open} onOk={() => toogle(false)} onCancel={() => toogle(false)} destroyOnClose={true}>
                <Typography.Title>التسجيل</Typography.Title>

                <Formik
                    onSubmit={signUp}
                    initialValues={{ email: "", username: "", password: "", vPassword: "" }}
                    validationSchema={yup.object().shape({
                        email: yup.string().email().required(),
                        username: yup.string().required(),
                        password: yup.string().required().min(10),
                        vPassword: yup
                            .string()
                            .required()
                            .min(10)
                            .oneOf([yup.ref("password")], "vPassword must equal the password"),
                    })}
                >
                    {(props) => {
                        return (
                            <>
                                <Head>
                                    <title>التسجيل</title>
                                </Head>
                                <Col className="block my-2">
                                    <label className="block my-2">البريد الالكتروني</label>
                                    <Field as={Input} name="email" />
                                    <ErrorMessage name="email" />
                                </Col>

                                <Col className="block my-2">
                                    <label className="block my-2">إسم المستخدم</label>
                                    <Field as={Input} name="username" />
                                    <ErrorMessage name="username" />
                                </Col>
                                <Col className="flex flex-row gap-2 w-full">
                                    <Col className="w-1/2">
                                        <label className="block my-2">كلمة السر</label>
                                        <Field as={Input} name="password" type="password" />
                                        <ErrorMessage name="password" />
                                    </Col>

                                    <Col className="w-1/2">
                                        <label className="block my-2">تأكيد كلمة السر</label>
                                        <Field as={Input} name="vPassword" type="password" />
                                        <ErrorMessage name="vPassword" />
                                    </Col>
                                </Col>
                                <Col className="my-2">
                                    <Input className="block my-2" onClick={() => props.handleSubmit()} type="submit" value="التسجيل" size="large" />
                                </Col>
                            </>
                        );
                    }}
                </Formik>
            </Modal>
        </>
    );
};

const AuthPage = () => {
    React.useEffect(() => {
        if (Router.query.error) {
            notification["error"]({
                message: Router.query.error,
            });
        }
        () => Router.replace({ pathname: Router.pathname, query: { ...Router.query, error: "" } }, Router.asPath, { locale: Router.locale, shallow: true });
    }, []);

    return (
        <>
            <Header isSearch={false} />
            <PageContainer>
                <Button onClick={() => signIn("google")} className="w-full h-auto">
                    <FcGoogle className="block mx-auto text-5xl" />
                </Button>
                <Formik
                    onSubmit={(e) =>
                        axios({
                            method: "POST",
                            url: "http://localhost:4000/auth/logIn",
                            data: e,
                            withCredentials: true,
                        })
                    }
                    initialValues={{ email: "", password: "" }}
                    validationSchema={yup.object().shape({
                        email: yup.string().email().required(),

                        password: yup.string().required().min(10),
                    })}
                >
                    {(props) => {
                        return (
                            <>
                                <Head>
                                    <title>الدخول</title>
                                </Head>
                                <Row className="my-3"></Row>
                                <Typography.Title>تسجيل الدخول</Typography.Title>
                                <Col className="my-2">
                                    <label className="my-2 block">البريد الالكتروني</label>
                                    <Field as={Input} name="email" />
                                    <ErrorMessage name="email" />
                                </Col>
                                <Col className="my-2">
                                    <label className="my-2 block">كلمة السر</label>
                                    <Field as={Input} name="password" type="password" />
                                    <ErrorMessage name="password" />
                                </Col>

                                <Col className="my-2">
                                    <Input onClick={() => props.handleSubmit()} type="submit" value="الدخول" size="large" />
                                </Col>
                            </>
                        );
                    }}
                </Formik>

                <LoginModal />
            </PageContainer>
        </>
    );
};

export default AuthPage;
