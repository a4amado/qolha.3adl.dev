import PageContainer from "@ui/PageContainer";
import { trpc } from "@utils/trpc";
import type { GetServerSideProps } from "next";
import React from "react";

 
export function getQueryItem(query: any) {
    if (typeof query === "string") return query;

    if (Array.isArray(query)) return query[0];
}

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
    props: {
        // trpcState: helpers.dehydrate(),
        word: ctx.query.word,
    },
});

export default function WordPage({ word }: { word: string }) {
    const QueryWord = trpc.search.searchWord.useMutation();

    React.useEffect(() => {
        QueryWord.mutate(word);
    }, []);

    return (
        <>
            <PageContainer>
                {QueryWord.data?.map((e) => (
                    <div key={e.id}>
                        {e.ar}
                        {e.clips.length}
                    </div>
                ))}
            </PageContainer>
        </>
    );
}
