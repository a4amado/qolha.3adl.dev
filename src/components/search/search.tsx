import { AutoComplete, Col, Row, Typography } from "antd";

export default function Search() {
    return  <Row className="block h-14 bg-slate-700 p-2 w-full">

    <Row className="flex flex-row w-full gap-1">
        <Col className="flex-grow block">
            
            <AutoComplete
                options={[{ label: <p>Loading</p>, value: "aa" }]}
                onSelect={console.log}
                className="bg-slate-300  h-full w-1/2 rounded-xl"
                
                placeholder="ورميت سهم الحب اقصد قلبها فأصاب سهمي عينها فاعورت"
                

            />
            </Col>
        <Col className="flex-grow-0 bg-yellow-50 py-1 px-2 rounded-md">
            <Typography>قُلها</Typography>
        </Col>
    </Row>

</Row>
}