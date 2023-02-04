import { Button, Modal } from "antd";
import { useCallback } from "react";
import { useToggle } from "react-use";

export default function RateRecord() {
  const [open, toogle] = useToggle(false);

  const close = useCallback(() => toogle(false), [open]);
  return (
    <>
      <Button onClick={() => toogle(!open)}>قيّم</Button>
      <Modal
        title="قيم هذا الصوت"
        open={open}
        onCancel={close}
        onOk={close}
        okType="default"
        cancelText="الغاء"
      >
        <Rate type="BAD" text="سئ" toogle={toogle} />
        <Rate type="GOOD" text="لا غٌبار علية" toogle={toogle} />
        <Rate type="OK" text="مقبول" toogle={toogle} />
      </Modal>
    </>
  );
}

function Rate({
  type,
  toogle,
  text,
}: {
  type: "GOOD" | "BAD" | "OK";
  toogle: any;
  text: string;
}) {
  const [isLoading, ToogleLoading] = useToggle(false);
  function doRate() {
    ToogleLoading(true);
    setTimeout(() => {
      ToogleLoading(false);
      toogle(false);
    }, 3000);
  }
  return (
    <Button loading={isLoading} onClick={doRate}>
      {type}
    </Button>
  );
}
