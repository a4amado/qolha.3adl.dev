import { Row } from "antd";
import React from "react";
import Header from "@ui/header";
import PageContainer from "@ui//PageContainer";
import TargetWord from "@ui/TargetWord";
import { GetServerSideProps as G, GetServerSidePropsResult } from "next/types";
import AudioHero from "@ui/AudioHero";
import validateYupSchema from "@backend/utils/validate.yup";
import * as yup from "yup";
import Home from "@ui/Home";
import prisma from "@db";
import { Clip, User, Word } from "@prisma/client";
import butters from "a-promise-wrapper";
import { useSession } from "next-auth/react";

const QueryWordSSR = yup.object().shape({
    id: yup.string().uuid().required(),
    word: yup.string().required(),
});

export type homeWord = {
    description: Word["description"];
    id: Word["id"];
    ar: Word["ar"];
    clips: homeClip[];
};

export type homeClip = {
    clipName: Clip["clipName"];
    id: Clip["id"];
    user: {
        id: User["id"];
        name: User["name"];
        image: User["image"];
    };
};

type Wordoptions = {
    home?: boolean;
    error?: boolean;
    messages?: string[];
    word?: homeWord;
};

export const getServerSideProps: G = async (ctx): Promise<GetServerSidePropsResult<Wordoptions>> => {
    if (!ctx.query.q && !ctx.query.word) {
        return {
            props: {
                home: true,
            },
        };
    }
    console.log(ctx.query);

    const { data: Input, errors } = validateYupSchema(QueryWordSSR, ctx.query);
    if (errors.length > 0) {
        return {
            props: {
                error: true,
                messages: errors,
            },
        };
    }

    const word = await butters(
        prisma.word.findFirst({
            where: {
                id: Input.id,
            },
            select: {
                clips: {
                    take: 4,
                },
                ar: true,
                id: true,
                description: true,
                user: {
                    select: {
                        name: true,
                        id: true,
                        image: true,
                    },
                },
            },
        })
    );

    if (word.error) {
        return {
            props: {
                error: true,
                messages: ["Internal Server Error"],
            },
        };
    }
    if (!word.data) {
        return {
            props: {
                error: true,
                messages: ["لم نجد ما تبحث عنه"],
            },
        };
    }
    return {
        props: {
            // @ts-ignore
            word: word.data,
        },
    };
};

export default function Page(props: Wordoptions) {
    const isHome = props?.home;
    const isError = props?.error;
    const isWord = props?.word;
    const s = useSession();
    console.log(s);

    return (
        <>
            <Row className="flex flex-col">
                <Header isSearch={true} />

                <PageContainer>
                    {isError && props.messages?.map((e) => <TargetWord word={e} />)}
                    {isHome && <Home />}
                    {isWord && <AudioHero key="1" word={props.word} />}
                </PageContainer>
            </Row>
        </>
    );
}
