import Header from "@ui/header";
import { Button, Row } from "antd";
import Head from "next/head";
import React from "react";
import PageContainer from "@ui/PageContainer";
import { PlayCircleOutlined, PauseCircleOutlined, CheckCircleTwoTone, CloseOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import axios from "axios";

import useAxios from "axios-hooks";
import { QueryClip } from "src/query/clip";

const clipType = { word: { ar: "s", id: "s" }, id: "s", path: "s" };

function Clips() {
    const [clips, refetch, q] = useAxios<Array<typeof clipType>>({
        url: QueryClip({
            url: "/api",
            query: {
                _accepted: false,
                _limit: 1,
                _page: 1,
            },
        }),
        method: "GET",
    });
    const activeClip = React.useMemo(() => {
        if (!clips?.data || typeof clips?.data[0] === "undefined") return null;
        return clips?.data[0];
    }, [clips.data]);

    const acceptClip = async () => {
        if (!activeClip) return;
        await axios({ method: "POST", url: `/api/clips/${activeClip.id}/accept` });
        refetch();
    };

    const rejectClip = async () => {
        if (!activeClip) return;
        await axios({ method: "POST", url: `/api/clips/${activeClip.id}/reject` });
        await refetch();
    };

    const disabled = [!!clips.loading, !!clips.error, clips.data?.length === 0].includes(true);

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/disable_scroll.css" />
            </Head>
            <Header isSearch={false} />

            <PageContainer>
                <Row className="flex flex-col">
                    <Row className="min-h-56 flex flex-row p-5">
                        <h1 className="h-full w-1/2 text-4xl grid">
                            {/* @ts-ignore */}
                            <span className="place-items-center">{disabled ? "خلاص كدا" : activeClip?.path}</span>
                        </h1>

                        <Row className="flex flex-row  gap-2 h-full w-1/2 ">
                            <Button disabled={disabled} className="w-full h-1/3">
                                <PlayCircleOutlined className="text-4xl" />
                                <PauseCircleOutlined className="text-4xl" />
                            </Button>
                            <Button disabled={disabled} type="primary" onClick={acceptClip} className="w-full h-1/3 bg-green-500 hover:bg-green-400">
                                <CheckCircleTwoTone twoToneColor="#52c41a" className="text-4xl" />
                                قبول
                            </Button>
                            <Button disabled={disabled} onClick={rejectClip} type="primary" danger className="w-full h-1/3">
                                <CloseOutlined className="text-4xl" />
                                رفض
                            </Button>
                        </Row>
                    </Row>
                    <Row className="flex flex-col gap-2 p-5 w-full">
                        {clips?.data?.map((e, i) => {
                            if (i === 0) return <></>;
                            return (
                                <Row key={e.id} className={`flex flex-row border flex-nowrap whitespace-nowrap w-full  rounded-md border-cyan-900 ${i === 1 && "bg-green-500"}`}>
                                    {i === 1 && <DoubleLeftOutlined className="self-center p-2 text-2xl" />}
                                    <Row className={`p-2 text-2xl overflow-hidden max-w-fit text-ellipsis ${i === 1 && "text-slate-50"}`}>{e.path}</Row>
                                </Row>
                            );
                        })}
                    </Row>
                </Row>
            </PageContainer>
        </>
    );
}

export default Clips;
