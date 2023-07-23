import PageContainer from "@ui/PageContainer";
import { trpc } from "@utils/trpc";
import type { GetServerSideProps } from "next";
import { createServerSideHelpers } from "@trpc/react-query/server";
import React from "react";
import { appRouter } from "src/server/routers/_app";
import ClipComponent from "@ui/ClipComponent";

export function getQueryItem(query: any) {
    if (typeof query === "string") return query;
    if (Array.isArray(query)) return query[0];
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // const helpers = createServerSideHelpers({
    //     router: appRouter,
    //     ctx: {},
    // });

    // @ts-ignore
    // await helpers.word.getWord.prefetch(ctx.query.wordID);

    return {
        props: {
            // trpcState: helpers.dehydrate(),
            word: ctx.query.word,
        },
    };
};

export default function WordPage({ trpcState, word }: any) {
    const QueryWord = trpc.search.searchWord.useMutation();

    React.useEffect(() => {
        QueryWord.mutate(word);
    }, []);

    return (
        <>
            <PageContainer>
                {QueryWord.data?.map((e) => {
                    return (
                        <div>
                            {e.ar} {e.clips.length}
                        </div>
                    );
                })}
            </PageContainer>
        </>
    );
}
