import { Button, Modal, Select, SelectProps, Typography } from "antd";
import React, { useState } from "react";
import { useToggle } from "react-use";
import axios from "axios"
import RoleBadge from "./RoleBadge";
export type roles = "owner" | "admin" | "user" | "CHOOSE";
const roles: roles[] = ["owner", "admin", "user"];


function isDisabled(role: roles) {
    return role === "owner";
}

export default function ChangeRole(props: { currentRole: roles; email: string, id: string }) {
    const [open, toggle] = useToggle(false);
    const options: SelectProps["options"] = roles
        .map((role) => ({
            label: role,
            value: role,
            disabled: ["owner"].includes(role)
        }));
    const [role, setRole] = useState<roles>(props.currentRole);

    const isDisabledBcItsOwner = isDisabled(props.currentRole);

    async function updateRole() {
        console.log(role);

        await axios({
            method: "POST",
            url: `/api/user/${props.id}/role/update`,
            data: {
                role
            }
        })
    }
    return (
        <>
            <Button disabled={isDisabledBcItsOwner} onClick={() => toggle(true)}>
                تعديل الدور
            </Button>
            <Modal open={open} width={500} onOk={() => toggle(false)} onCancel={() => toggle(false)}>
                <div className="flex flex-col gap-2">
                    <Typography>أختر</Typography>
                    <RoleBadge role={role} />
                    <Select defaultValue={props.currentRole} className="w-full" title="ssaaaaaaaaaaa" options={options} onChange={(e) => setRole(e)} />
                    <Button onClick={async () => {
                        if (role === props.currentRole) return;
                        await updateRole()
                    }}>Submit</Button>
                </div>

            </Modal>
        </>
    );
}
