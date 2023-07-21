import React from "react";
import { useToggle } from "react-use";
import { Button, Dialog, DialogBody } from "@blueprintjs/core";

export default function ReportWord({ wordID }: { wordID: string }) {
    const [open, toggle] = useToggle(false);
    return (
        <>
            <Button onClick={() => toggle(true)} text="Report" icon="warning-sign" />
            <Dialog isOpen={open} title="ابلغ عن الكلمة">
                <DialogBody>
                    <span>ما سبب الابلاغ ؟</span>
                    {/* <Select className="mx-2" defaultValue="اختر سبب الابلاغ" style={{ width: 250 }} options={["كاني", "ماني"].map((e) => ({ value: e, lable: e.toUpperCase() }))}></Select> */}

                    <Button className="mx-2">إبلاغ</Button>
                </DialogBody>
            </Dialog>
        </>
    );
}
