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
    const contentClassName = classNames("w-full", "max-w-6xl", "mx-auto", "flex", "flex-row", "m-4", "gap-5");
    const rowClassName = classNames({
        "w-3/4": contribute === "yes",
        "w-full": contribute === "no",
    });

    return (
        <Layout>
            <Header />
            <Content className={contentClassName}>
                <Row gutter={10} className={rowClassName}>
                    <div className="w-full bg-white p-10 relative">{children}</div>
                </Row>
                {contribute === "yes" && (
                    <Row className="w-1/4 h-fit">
                        <ContributeClip kind="priority" />
                    </Row>
                )}
            </Content>
        </Layout>
    );
}
