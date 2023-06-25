import { Row } from "antd";
import React from "react";
import Header from "@ui/header";
import PageContainer from "@ui//PageContainer";
import Home from "@ui/Home";

export default function Page() {
    return (
        <Row className="flex flex-col">
            <Header isSearch={true} />
            <PageContainer>
                <Home />
            </PageContainer>
        </Row>
    );
}
