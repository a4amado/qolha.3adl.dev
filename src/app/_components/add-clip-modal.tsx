"use client";
import { Button, Modal } from "antd";
import AddClip from "./add-clip";
import { useToggle } from "react-use";
import React from "react";

export default function AddClipModal(props: {
  wordId: string;
  wordText: string;
}) {
  
  const [open, toogle] = useToggle(false);
  return (
    <>
      <Button onClick={toogle}>Contribute</Button>
      <Modal
        onCancel={toogle}
        onOk={toogle}
        className="relative"
        open={open}
        destroyOnClose
      >
        <div onClick={(e) => e.stopPropagation()}>
          <AddClip close={toogle} type="specefic" text={props.wordText} id={props.wordId} />{" "}
        </div>
      </Modal>
    </>
  );
}
