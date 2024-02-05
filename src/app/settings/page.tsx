
import { Select, SelectProps, AutoComplete, AutoCompleteProps, Typography, Flex, Form, Button, Col } from "antd";
import { ContriesarabicNames, Contriescodes } from "../../../test";

import { SendOutlined } from "@ant-design/icons"


export default function Page() {
  return <Flex className="flex-col items-center justify-center, mx-7">
    {" إختر بلد المنشأ؟ (لا يمكنك تغيرها فيما بعد)"}

    <Flex className="flex-row max-w-4xl h-24 flex-grow w-full mx-auto gap-2">
      <Col className="w-full h-full">
        <AutoComplete
          placeholder="إختر بلدك"
          options={ContriesarabicNames.map((_, i) => ({ value: ContriesarabicNames[i], label: ContriesarabicNames[i] }))}
          className="!h-full !text-center  w-full border align-bottom max-w-4xl block mx-auto">
        </AutoComplete>
      </Col>
      <Col className="!h-full flex flex-grow aspect-square">
        <Button className=" w-full !h-full">
          <SendOutlined className="rotate-[180deg]" />
        </Button></Col>
    </Flex>
  </Flex>
}

