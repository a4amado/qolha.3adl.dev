import Header from "../../../../ui/header";
import PageContainer from "../../../../ui/PageContainer";
import { GetServerSideProps as GSSP } from "next/types";
import { List, Alert, Typography } from "antd";

// import getQueryItem from "@utils/getQueryItem";

export const getServerSideProps: GSSP = async (ctx) => {
    try {
        // const words = await prisma.word.findMany({
        //     where: {
        //         userId: getQueryItem(ctx.query.userID)
        //     },
        //     take: 100,
        //     select: {
        //         id: true, _count: true, accepted: true, ar: true
        //     }
        // });
        return {
            props: {
                words: Array.from({ length: 55 }, () => ({ ar: "أنا", id: Math.random().toString() })) as Array<{ id: string; ar: string }>,
            },
        };
    } catch (e) {
        return {
            redirect: {
                destination: "/error",
                permanent: false,
            },
        };
    }
};

export default function UserWordsPage({ words }: any) {
    console.log(words);

    return (
        <>
            <Header isSearch={true} />
            <PageContainer>
                <Typography.Title className="text-4xl">اصوات ساهم بها المستخدم</Typography.Title>
                <List className="gap-2 flex flex-col" dataSource={words} renderItem={(e: { ar: string; id: string }) => <Alert className="my-2" message={e?.ar} type="info" />} />
            </PageContainer>
        </>
    );
}
