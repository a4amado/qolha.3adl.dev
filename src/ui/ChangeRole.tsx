import { Button, Modal, Select, SelectProps } from "antd";

import React from "react";
import { useToggle } from "react-use";

export type roles = "owner" | "admin" | "user" | "CHOOSE";

const roles: roles[] = ["owner", "admin", "user"];
function isDisabled(role: roles) {
    return role === "owner";
}

export default function ChangeRole(props: { currentRole: roles; email: string }) {
    const [open, toggle] = useToggle(false);
    const options: SelectProps["options"] = roles
        .map((role) => ({
            label: role,
            value: role,
        })) // @ts-ignore

        .concat([{ label: "CHOOSE", value: "CHOOSE", disabled: true }]);

    const isDisabledBcItsOwner = isDisabled(props.currentRole);
    return (
        <>
            <Button disabled={isDisabledBcItsOwner} onClick={() => toggle(true)}>
                تعديل الدور
            </Button>
            <Modal open={open} onOk={() => toggle(false)} onCancel={() => toggle(false)}>
                <div className="flex flex-row">
                    <div className=" align-middle">أختر</div>
                    <Select defaultValue="title" className="w-full" disabled={isDisabledBcItsOwner} options={options}>
                        s
                    </Select>
                </div>
            </Modal>
        </>
    );
}
