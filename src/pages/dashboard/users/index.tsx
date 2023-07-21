import PageContainer from "@ui/PageContainer";

import React, { useRef, useState } from "react";
import Header from "@ui/header";
import { useSession } from "next-auth/react";
import Loading from "@ui/Loading";
import { useRouter } from "next/router";
import UserItem from "@ui/UserItem";
import { trpc } from "@utils/trpc";
import { Button, ButtonGroup, InputGroup, Spinner, OverlayToaster, ToasterPosition } from "@blueprintjs/core";
import Prisma from "@prisma/client";
import { Formik, Form } from "formik";
import { string, object } from "yup";

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
    const [id, _] = useState(userID);
    const ss = useRef<OverlayToaster>(null)
    const user = trpc.user.query$user.useMutation();
    const isNoData = !user?.isLoading && !user.data;

    React.useEffect(() => {
        user.mutateAsync({ _userId: id });
    }, []);
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
            <OverlayToaster  position={ "top-right" as ToasterPosition} ref={ss}/>
            <PageContainer>
                <Formik
                
                    onSubmit={(e) => {
                        user.mutateAsync({
                            _email: e.email,
                        });
                    }}
                    initialValues={{ email: "" }}
                    validationSchema={object().shape({
                        email: string().email().required(),
                    })}
                >
                    {(form) => (
                        <Form>
                            <ButtonGroup className="flex-block max-w-2xl w-full mx-auto my-4">
                                <InputGroup value={form.values.email} className="text-center font-bold text-lg w-full" placeholder="email@email.email" onChange={async (e) => form.handleChange(e)} name="email" onBlur={(e) => form.handleBlur(e)} />
                                <Button onClick={() => form.handleSubmit()} type="submit" icon="search" />
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>

                {isNoData && <p>Nothing</p>}
                {user.isLoading && <Spinner />}

                {user.data && <UserItem country={user.data.country || ""} email={user?.data?.email || ""} id={user?.data?.id || ""} image={user?.data?.image || ""} name={user?.data?.name || ""} role={user?.data?.role || ""} />}
            </PageContainer>
        </>
    );
}

export default Users;
