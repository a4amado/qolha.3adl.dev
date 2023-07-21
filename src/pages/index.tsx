import React from "react";
import Header from "@ui/header";
import PageContainer from "@ui//PageContainer";
import Search from "@ui/search";

export default function Page() {
    return (
        <div className="flex flex-col">
            <Header isSearch={true} />
            <PageContainer>
                <Search />
            </PageContainer>
        </div>
    );
}
