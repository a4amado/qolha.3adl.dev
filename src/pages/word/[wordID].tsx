import PageContainer from "@ui/PageContainer";
import Header from "@ui/header";
import { trpc } from "@utils/trpc";
import { GetServerSideProps } from "next";
import { createServerSideHelpers } from "@trpc/react-query/server";
import React from "react";
import { appRouter } from "src/server/routers/_app";

export function getQueryItem(query: any) {
    if (typeof query === "string") return query;
    if (query.length > 0) return query[0];
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const helpers = createServerSideHelpers({
        router: appRouter,
        ctx: {},
    });

    await helpers.word.getWordById.prefetch("bebad36d-a031-4986-89d6-ead45c043736");

    return {
        props: {
            trpcState: helpers.dehydrate(),
            wordID: ctx.query.wordID,
        },
    };
};

export default function WordPage({ trpcState, wordID }: any) {
    const word = trpc.word.getWordById.useQuery(wordID);

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
                {word.data?.ar}

                {word.data?.description}

                {word.data?.clips.map((e) => {
                    return (
                        <p key={e.id}>
                            <audio controls src={`http://localhost:3000/api/clip/${e.clipName}/stream`} />
                            {e.user?.name}
                        </p>
                    );
                })}
            </PageContainer>
        </>
    );
}