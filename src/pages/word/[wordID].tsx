import PageContainer from "@ui/PageContainer";
import Header from "@ui/header";
import { trpc } from "@utils/trpc";
import { GetServerSideProps } from "next";
import { createServerSideHelpers } from "@trpc/react-query/server";
import React from "react";
import { appRouter } from "src/server/routers/_app";
import ClipComponent from "@ui/ClipComponent";

export function getQueryItem(query: any) {
    if (typeof query === "string") return query;
    if (query.length > 0) return query[0];
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const helpers = createServerSideHelpers({
        router: appRouter,
        ctx: {},
    });

    // @ts-ignore
    await helpers.word.getWord.prefetch(ctx.query.wordID);

    return {
        props: {
            trpcState: helpers.dehydrate(),
            wordID: ctx.query.wordID,
        },
    };
};

export default function WordPage({ trpcState, wordID }: any) {
    const word = trpc.word.getWord.useQuery(wordID);

    if (word.status != "success") {
        return (
            <>
                <Header isSearch={true} />
                <PageContainer>Loading</PageContainer>
            </>
        );
    }
    return (
        <>
            <Header isSearch={true} />
            <PageContainer>
                <>
                    {word?.data &&
                        word?.data?.clips.map((e, i) => <ClipComponent ClipName={e.id} ar={word.data?.ar || ""} clipId={e.id} number={i} username={e.userId || ""} />)}
                </>
            </PageContainer>
        </>
    );
}
