import PageContainer from "@ui/PageContainer";
import { List, Input } from "antd";

import useAxios from "axios-hooks";
import React, { useState } from "react";
import Header from "@ui/header";
import ChangeRole, { roles } from "@ui/ChangeRole";
import NextImage from "next/image";
import RoleBadge from "@ui/RoleBadge";
import { useSession } from "next-auth/react";
import Loading from "@ui/Loading";
import { useRouter } from "next/router";
import queryUserGen from "src/query/user";
import UserItem from "@ui/UserItem";

type User = {
    image: string;
    name: string;
    role: roles;
    email: string;
    id: string;
};
function Users() {
    const session = useSession();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [user, searchForAUser] = useAxios(
        {
            method: "GET",
        },
        { manual: true, autoCancel: true, }
    );

    const User = user.data as User;

    React.useEffect(() => {
        if (!email) return;
        let g = setTimeout(() => {
            searchForAUser({
                url: queryUserGen({
                    url: "/api/user/query",
                    query: {
                        _email: email,
                    },
                }),
            })
        }, 500)
        return () => clearTimeout(g)
    }, [email]);

    if (session.status === "loading") return <Loading />;
    if (session.status === "unauthenticated") {
        return router.push({ pathname: "/api/auth/signin" });
    }
    // @ts-ignore
    if (session.data.user.role != "owner") {
        return router.push({ pathname: "/" });
    }

    return (
        <>
            <Header isSearch={false} />

            <PageContainer>
                <Input value={email} className="text-center font-bold text-lg" placeholder="email@email.email" onChange={(e) => setEmail(e.target.value)} />

                <div className="flex flex-col justify-evenly w-full gap-2">
                    <List
                        loading={user.loading}
                        dataSource={user.data ? [user.data] : undefined}
                        renderItem={(item, i) => (
                            <List.Item key={i} ><UserItem user={item} /></List.Item>
                        )}

                    />
                </div>
            </PageContainer>
        </>
    );
}

export default Users;
