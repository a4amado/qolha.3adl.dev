import { Row } from "antd";
import Header from "../components/header";
import PageContainer from "../components/PageContainer";
import TargetWord from "../components/TargetWord/TargetWord";

export default function Page() {
  return (
    <>
      <Row className="flex flex-col">
        <Header />
        <PageContainer>
          <TargetWord />
        </PageContainer>
      </Row>
    </>
  );
}
