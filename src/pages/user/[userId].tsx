"use client";
import PageContainer from "@ui/PageContainer";
import { trpc } from "@utils/trpc";
import { getQueryItem } from "../word/[word]";
import { useRouter } from "next/router";
import NextImage from "next/image"
import { Avatar } from "antd";

export default function UserPage() {
    const router = useRouter()
    const user = trpc.user.query$user.QueryUserById.useQuery(getQueryItem(router.query.userId), {
        enabled: !!getQueryItem(router.query.userId)
    })
    return <PageContainer contribute="no">
        <NextImage src={user.data?.image || ""} width={60} height={60} alt={user.data?.name || "Name goes here"} />
        {user.data?.name}
        {user.data?.role}
    </PageContainer>
}