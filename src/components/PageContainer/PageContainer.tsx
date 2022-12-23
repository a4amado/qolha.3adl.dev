import { Row } from "antd";

export default function PageContainer(props: React.PropsWithChildren) {
    return <Row className="block mx-auto w-full max-w-5xl">
        {props.children}
    </Row>
}