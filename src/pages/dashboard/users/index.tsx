import PageContainer from "@ui/PageContainer";
import { List, Input, Spin, Alert } from "antd";

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
import { trpc } from "@utils/trpc";
import { useFirstMountState } from "react-use";

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

    const user = trpc.user.query$user.useQuery({
        _email: email,
    });

    React.useEffect(() => {
        if (!email) return;
        let g = setTimeout(() => {
            user.refetch();
        }, 500);
        return () => clearTimeout(g);
    }, [email]);

    if (session.status === "loading") return <Loading />;
    if (session.status === "unauthenticated") {
        return router.push({ pathname: "/api/auth/signin" });
    }
    // @ts-ignore
    // if (session.data.user.role != "owner") {
    //     return router.push({ pathname: "/" });
    // }

    return (
        <>
            <Header isSearch={false} />

            <PageContainer>
                <Input value={email} className="text-center font-bold text-lg" placeholder="email@email.email" onChange={(e) => setEmail(e.target.value)} />

                <div className="flex flex-col justify-evenly w-full gap-2">
                    {user.status === "error" && <Alert type="error" message="Error" />}

                    {user.status === "loading" && <Spin />}

                    {/* @ts-ignore */}
                    {user.status === "success" && user.data && <UserItem email={user.data.email} id={user.data.id} image={user.data.image || ""} name={user.data.name} role={user.data.role ? user.data.role : "user"} />}
                </div>
            </PageContainer>
        </>
    );
}

export default Users;
