import React, { ReactNode } from "react";
import ContributeClip from "./contribute";
import Header from "./header";
import { Layout, Row, Col } from "antd";
import classNames from "classnames";

const { Content } = Layout;

interface PageContainerProps {
    children: ReactNode;
    contribute: "yes" | "no";
}

export default function PageContainer({ children, contribute = "yes" }: PageContainerProps) {



    return (
        <>
            <Header />
            <Content className={classNames("w-full", "h-full", "max-w-6xl", "mx-auto", "flex", "flex-row", "m-4", "gap-5")}>
                <Row gutter={10} className={classNames({
                    "w-3/4": contribute === "yes",
                    "w-full": contribute === "no",
                })}>
                    <div className="w-full bg-white p-10 relative">
                        <span>{children}</span>
                    </div>
                </Row>
                {contribute === "yes" && (
                    <Row className="w-1/4 h-fit">
                        <ContributeClip kind="priority" />
                    </Row>
                )}
            </Content>
        </>
    );
}
