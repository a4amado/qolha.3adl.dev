import { Row, Col, Typography, Button } from "antd";
import Search from "./search";
import NextLink from "next/link";

export default function Header({ isSearch }: { isSearch: boolean }) {
    return (
        <Row className="w-full flex flex-col">
            <Row className="w-full  bg-slate-600 px-5">
                <Row className="w-full max-w-7xl flex flex-col mx-auto my-2 h-9">
                    <Row className="flex flex-row items-center h-full gap-2">
                        <Col className="flex flex-col ">
                            <h1>قلها</h1>
                        </Col>

                        <NextLink className="text-cyan-100 flex flex-row" href="/auth">
                            تسجيل
                        </NextLink>
                    </Row>
                </Row>
            </Row>

            {isSearch && <Search />}
        </Row>
    );
}
