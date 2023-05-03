import Header from "@ui/header";
import PageContainer from "@ui/PageContainer";
import { Alert, Col, Typography } from "antd";
import NextImage from "next/image";
import { TfiWrite } from "react-icons/tfi";
import { BiUserVoice } from "react-icons/bi";
import NextLink from "next/link";

export default function UserPage() {
    return (
        <>
            <Header isSearch={true} />
            <PageContainer>
                <Col className="flex flex-row">
                    <NextImage className="p-3 mx-3 border border-cyan-200" src="/unnamed.jpg" width={150} height={150} alt="Image" />
                    <Col>
                        <Typography className="text-4xl">أحمد عادل</Typography>
                        <Typography>مصر</Typography>
                        <Typography>انضم منذ: 3 اعوام</Typography>
                        <Col>تابعة علي : فيسبوك انسجرام</Col>
                    </Col>
                </Col>
                <Col className="flex flex-col sm:flex-row gap-2 m-2">
                    <NextLink className="block w-full" href="/user/[id]/words">
                        <Alert showIcon={true} icon={<TfiWrite className="text-3xl" />} type="info" message="55 كلمة" />
                    </NextLink>
                    <NextLink className="block w-full" href="/user/[id]/clips">
                        <Alert showIcon={true} icon={<BiUserVoice className="text-3xl" />} type="info" message="44 صوت" />
                    </NextLink>
                </Col>
            </PageContainer>
        </>
    );
}
