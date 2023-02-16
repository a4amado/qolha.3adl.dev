import { Button } from "antd";
import React from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

export default function GoToUp() {
  function gotToUp() {
    window.scrollTo({ top: 0, left: 0 });
  }

  return (
    <Button onClick={gotToUp} className="fixed right-2 bottom-2 bg-white ">
      <AiOutlineArrowUp />
    </Button>
  );
}
