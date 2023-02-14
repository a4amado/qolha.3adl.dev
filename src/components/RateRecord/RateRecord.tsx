import { Button, Modal } from "antd";
import axios from "axios";
import { useCallback } from "react";
import { useToggle } from "react-use";

export default function RateRecord({ id }: { id: string }) {
  const [open, toogle] = useToggle(false);

  const close = useCallback(() => toogle(false), [open]);
  return (
    <>
      <Button onClick={() => toogle(!open)}>قيّم</Button>
      <Modal title="قيم هذا الصوت" open={open} onCancel={close} onOk={close} okType="default" cancelText="الغاء">
        <Rate clipID={id} type="BAD" text="سئ" toogle={toogle} />
        <Rate clipID={id} type="GOOD" text="لا غٌبار علية" toogle={toogle} />
        <Rate clipID={id} type="OK" text="مقبول" toogle={toogle} />
      </Modal>
    </>
  );
}

function Rate({ type, toogle, text, clipID }: { type: "GOOD" | "BAD" | "OK"; toogle: any; text: string; clipID: string }) {
  const [isLoading, ToogleLoading] = useToggle(false);
  async function doRate() {
    try {
      await axios({
        method: "POST",
        url: `/api/rate/${clipID}/append`,
        data: {
          rate: type === "BAD" ? "0" : type === "GOOD" ? "100" : "50",
        },
      });
      ToogleLoading(false);
      toogle(false);
    } catch (error) {}
  }

  return (
    <Button loading={isLoading} onClick={doRate}>
      {type}
    </Button>
  );
}
