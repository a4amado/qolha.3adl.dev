import React from "react";
import Header from "@ui/header";
import PageContainer from "@ui//PageContainer";
import { trpc } from "@utils/trpc";
import Search from "@ui/search";

export default function Page() {
    const s = trpc.word.getTop10Words4TheDay.useQuery();
    return (
        <div className="flex flex-col">
            <PageContainer>
                <Search />
            </PageContainer>
        </div>
    );
}
