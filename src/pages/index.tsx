import { Row } from "antd";
import React from "react";
import Header from "@ui/header";
import PageContainer from "@ui//PageContainer";
import Home from "@ui/Home";
import ContributeClip from "@ui/contribute";
import Search from "@ui/search";

export default function Page() {
    return (
        <Row className="flex flex-col">
            <Header isSearch={true} />
            <PageContainer>
                <Search />
             </PageContainer>
        </Row>
    );
}
