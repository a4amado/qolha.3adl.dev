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
  DoubleLeftOutlined,
} from "@ant-design/icons";
import { useToggle } from "react-use";
import axios from "axios";
import cuid from "cuid";

const clipType = { word: { ar: "", id: "" }, id: "", path: "" };

function Clips() {
  const [spinning, setSpinning] = useToggle(false);
  const [clips, setClips] = React.useState<Array<typeof clipType>>([]);

  const [activeClip, setActiveClip] = React.useState<typeof clipType>();

  React.useEffect(() => {
    getClip();
  }, []);

  const acceptClip = React.useCallback(async () => {
    try {
      setSpinning(true);

      const s = await axios({
        method: "POST",
        url: `/api/word/${activeClip?.word?.id}/clip/${activeClip?.id}/accept`,
      });

      await getClip();
      setSpinning(false);
    } catch (error) {}
  }, [activeClip, spinning]);

  const getClip = React.useCallback(async () => {
    try {
      const s = await axios({
        method: "GET",
        url: `/api/word/${cuid() /* Placeholder */}/clip/toBeReviewed`,
      });

      console.log(s);

      setActiveClip(s.data[0]);
      setClips(s.data);
    } catch (error) {}
  }, [activeClip, spinning]);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/disable_scroll.css" />
      </Head>
      <Header isSearch={false} />

      <PageContainer>
        <Row className="flex flex-col">
          <Row className="h-56 flex flex-row p-5">
            <h1 className="h-full w-1/2 text-4xl grid">
              <span className="place-items-center">{activeClip?.path}</span>
            </h1>

            <Spin spinning={spinning || !activeClip?.id} className="w-1/2">
              <Row className="flex flex-row  gap-2 h-full w-full ">
                <Button className="w-full h-1/3">
                  <PlayCircleOutlined className="text-4xl" />
                  <PauseCircleOutlined className="text-4xl" />
                </Button>
                <Button
                  type="primary"
                  onClick={acceptClip}
                  className="w-full h-1/3 bg-green-500 hover:bg-green-400"
                >
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
            </Spin>
          </Row>
          <Row className="flex flex-col gap-2 p-5">
            {clips.map((e, i) => {
              if (i === 0) return <></>;

              return (
                <Row
                  className={`flex flex-row border   rounded-md border-cyan-900 ${
                    i === 1 ? "bg-green-500" : ""
                  }`}
                >
                  {i === 1 && (
                    <DoubleLeftOutlined className="self-center p-2 text-2xl" />
                  )}
                  <Row className="p-2">
                    <p
                      className={`text-2xl p-1 ${
                        i === 1 ? "text-slate-50" : ""
                      }`}
                    >
                      {e.path}
                    </p>
                  </Row>
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
