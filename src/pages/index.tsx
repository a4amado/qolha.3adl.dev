import React from "react";
import Header from "@ui/header";
import PageContainer from "@ui//PageContainer";
import { trpc } from "@utils/trpc";

export default function Page() {
    const s = trpc.word.getTop10Words4TheDay.useQuery();
    return (
        <div className="flex flex-col">
            <PageContainer>
                <p>{">//////////////////////////////////////"}</p>
                <p>Todo: Top 10 Word of the day</p>
                <p>{"//////////////////////////////////////"}</p>
            </PageContainer>
        </div>
    );
}
