import { Badge, BadgeProps, Alert, AlertProps } from "antd";
import { roles } from "./ChangeRole";

export default function RoleBadge({ role }: { role: roles }) {
    let badgeStatusAccordingToTheRole: AlertProps["type"] = "info";

    switch (role) {
        case "admin":
            badgeStatusAccordingToTheRole = "success";
            break;
        case "owner":
            badgeStatusAccordingToTheRole = "error";
            break;
    }

    let badgeNumberAccordingToTheRole = 10;

    switch (role) {
        case "admin":
            badgeNumberAccordingToTheRole = 1;
            break;
        case "owner":
            badgeNumberAccordingToTheRole = 0;
            break;
    }

    return <Alert className="w-max" message={role} banner={false} closable={false} type={badgeStatusAccordingToTheRole} />;
}
