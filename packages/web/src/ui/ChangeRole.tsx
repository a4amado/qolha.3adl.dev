import { Button, Modal, Select, SelectProps, } from "antd";
import React from "react";
import { useToggle } from "react-use";
import { rolesType, roles, rolesKeys } from "../../global/roles";


type RoleProps = {
    currentRole: rolesType;
    email: string;
};

export default function ChangeRole(props: RoleProps) {
    const [open, toggle] = useToggle(false);
    const options: SelectProps["options"] = rolesKeys.map((e, i) => ({
        label: e,
        value: e,
        /* @ts-ignore */
    }));

    return (
        <>
            <Button disabled={props.currentRole === "owner"} onClick={() => toggle(true)}>تعديل الدور</Button>
            <Modal open={open} onOk={() => toggle(false)} onCancel={() => toggle(false)}>
                <div className="flex flex-row">
                    <div className=" align-middle">أختر</div>
                    {/* @ts-ignore */}
                    <Select defaultValue="title" className="w-full" disabled={props.currentRole == "owner"} options={[{ label: "اختر الدور", value: "title", disabled: true }].concat(options)} >
                        s
                    </Select>
                </div>
            </Modal>
        </>
    );
}
