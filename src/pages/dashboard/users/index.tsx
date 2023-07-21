import PageContainer from "@ui/PageContainer";

import React, { useState } from "react";
import Header from "@ui/header";
import { useSession } from "next-auth/react";
import Loading from "@ui/Loading";
import { useRouter } from "next/router";
import UserItem from "@ui/UserItem";
import { trpc } from "@utils/trpc";
import { InputGroup } from "@blueprintjs/core";
import Prisma from "@prisma/client";

type User = {
    image: string;
    name: string;
    role: Prisma.Role;
    email: string;
    id: string;
};

function Users({ userID }: { userID: string }) {
    const session = useSession();
    const router = useRouter();
    const [email, setEmail] = useState("");

    const user = trpc.user.query$user.useQuery({
        _email: email,
        _userId: userID,
    });

    React.useEffect(() => {
        if (!email) return;
        const g = setTimeout(() => {
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
                <InputGroup value={email} className="text-center font-bold text-lg" placeholder="email@email.email" onChange={(e) => setEmail(e.target.value)} />
                {/* @ts-ignore */}
                <UserItem email={user?.data?.email || ""} id={user?.data?.id || ""} image={user?.data?.image || ""} name={user?.data?.name || ""} role={user?.data?.role || ""} />
            </PageContainer>
        </>
    );
}

export default Users;
