import { Row, Col, Typography } from "antd";
import Search from "../search";
import NextLink from "next/link";

export default function Header() {
    return <Row className="w-full flex flex-col">
        <Row className="w-full  bg-slate-600 px-5">
            <Row className="w-full max-w-7xl flex flex-col mx-auto my-2 h-9">
                <Row className="flex flex-row align-middle h-full gap-2">
                <Col className="flex flex-col justify-center">
                        <h1>قلها</h1>
                    </Col>
                <Col className="flex flex-col justify-center">
                        <NextLink href="/">HI</NextLink>
                    </Col>
                    <Col className="flex flex-col justify-center">
                        <NextLink href="/">HI</NextLink>
                    </Col>
                    <Col className="flex flex-col justify-center">
                        <NextLink href="/">HI</NextLink>
                    </Col>
                </Row>
            </Row>
        </Row>

        <Search />
    </Row>
}