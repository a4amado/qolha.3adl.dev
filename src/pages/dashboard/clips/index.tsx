import Header from "../../../components/header";
import { AutoSizer, List } from "react-virtualized";
import "react-virtualized/styles.css";
import { Button, Row, Spin } from "antd";
import Head from "next/head";
import React from "react";
import PageContainer from "../../../components/PageContainer";
import {
    PlayCircleOutlined,
    PauseCircleOutlined,
    CheckCircleTwoTone,
    CloseOutlined,
    DoubleLeftOutlined
} from "@ant-design/icons";


function Clips() {
    const [clips, setClips] = React.useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
        22, 23, 24, 25, 26, 27, 28, 29, 30,
    ]);


    const [activeClip, setActiveClip] = React.useState(clips[0]);

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/disable_scroll.css" />
            </Head>
            <Header isSearch={false} />

            <PageContainer>
                <Row className="flex flex-col">
                    <Spin spinning={false}>
                        <Row className="h-56 flex flex-row p-5">
                            <h1 className="h-full w-1/2 text-6xl grid">
                                <span className="place-items-center">ضارب</span>
                            </h1>
                            <Row className="flex flex-row w-1/2 gap-2">
                                <Button className="w-full h-1/3">
                                    <PlayCircleOutlined className="text-4xl" />
                                    <PauseCircleOutlined className="text-4xl" />
                                </Button>
                                <Button type="primary" className="w-full h-1/3 bg-green-500 hover:bg-green-400">
                                    <CheckCircleTwoTone
                                        twoToneColor="#52c41a"
                                        className="text-4xl"
                                    />
                                    قبول
                                </Button>
                                <Button type="primary" danger className="w-full h-1/3">
                                    <CloseOutlined className="text-4xl" />
                                    رفض
                                </Button>
                            </Row>
                        </Row>
                    </Spin>
                    <Row className="flex flex-col gap-2 p-5">

                        {Array.from({ length: 5 }).map((e, i) => {


                            return <Row className={`flex flex-row border   rounded-md border-cyan-900 ${i === 0 ? "bg-green-500": ""}`}>
                                {i === 0 && <DoubleLeftOutlined  className="self-center p-2 text-2xl"/>}
                                <Row className="p-2" >
                                    <p className={`text-2xl p-1 ${i ===0 ? "text-slate-50": ""}`}>الكلمة التالية.</p>
                                </Row>
                            </Row>

                        })}
                    </Row>
                </Row>
            </PageContainer>
        </>
    );
}

export default Clips;
