import React from "react";
import PageContainer from "@ui//PageContainer";
import Search from "@ui/search";

export default function Page() {
    return (
        <div className="flex flex-col">
            <PageContainer>
                <Search />
            </PageContainer>
        </div>
    );
}
