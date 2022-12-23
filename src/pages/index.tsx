import { Row } from "antd"
import Header from "../components/header"




export default function Page() {
    return <>
    
    <Row className="flex flex-col">

    <Header />
    {Array.from({ length: 100 }).map(() => <div>ss</div>)}
    </Row>
    </>
}