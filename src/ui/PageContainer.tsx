import React, { ReactNode } from "react";
import ContributeClip from "./contribute";
import Header from "./header";
import { Layout, Row, Col } from "antd"; // Import Ant Design components

const { Content } = Layout; // Destructure Content component from Ant Design Layout

interface PageContainerProps {
    children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
    return (
        <Layout>
            <Header />
            <Content className="w-full max-w-6xl mx-auto flex flex-row m-4 gap-5">
                <Row gutter={10} className="w-3/4">
                    <div className="w-full bg-white p-10  relative">
                        {children}
                    </div>

                </Row>
                <Row className="w-1/4 h-fit">
                    <ContributeClip />
                </Row>
            </Content>
        </Layout>
    );
}
