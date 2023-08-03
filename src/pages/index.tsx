import React from "react";
import Header from "@ui/header";
import PageContainer from "@ui//PageContainer";
import { trpc } from "@utils/trpc";

export default function Page() {
    const s = trpc.word.getTop10Words4TheDay.useQuery();
    console.log(s);

    return (
        <PageContainer>
            <p>{"//////////////////////////////////////"}</p>
            <p>{"/// "}Todo: Some thing</p>
            <p>{"//////////////////////////////////////"}</p>
        </PageContainer>
    );
}
