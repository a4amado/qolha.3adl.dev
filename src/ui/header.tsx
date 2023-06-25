import { Row, Col, Typography, Button, Skeleton, Badge } from "antd";
import Search from "./search";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NextLink from "next/link";

export default function Header({ isSearch }: { isSearch: boolean }) {
    const session = useSession();
    const router = useRouter();
    return (
        <Row className="w-full flex flex-col ">
            <Row className="w-full  bg-slate-600 px-5">
                <Row className="w-full max-w-7xl flex flex-col mx-auto my-2 h-9">
                    <Row className="flex flex-row items-center h-full gap-2">
                        <Col className="flex flex-col ">
                            {router.pathname === "/" && <h1>قلها</h1>}
                            {router.pathname != "/" && (
                                <NextLink href="/">
                                    <h1>قلها</h1>
                                </NextLink>
                            )}
                        </Col>

                        {session.status === "unauthenticated" && <NextLink href="api/auth/signin">SignIn</NextLink>}
                        {session.status === "authenticated" && <Typography.Text>Hello, {session.data.user?.name}</Typography.Text>}
                    </Row>
                </Row>
            </Row>

            {isSearch && <Search />}
        </Row>
    );
}
