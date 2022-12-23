import { Row } from "antd";

export default function PageContainer(props: React.PropsWithChildren) {
  return (
    <Row className="block mx-auto w-full max-w-4xl px-4">{props.children}</Row>
  );
}
