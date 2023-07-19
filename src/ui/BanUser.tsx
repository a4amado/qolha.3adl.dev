import { DeleteOutlined } from "@ant-design/icons";
import { trpc } from "@utils/trpc";
import { Button } from "antd";
import axios from "axios";
import { useToggle } from "react-use";

export default function BanUser({ userId, callback }: { userId: string; callback: Function }) {
    const ban = trpc.user.banUser.useMutation();

    return (
        <Button danger onClick={() => ban.mutate({ userId })} loading={ban.isLoading}>
            DELETE USER <DeleteOutlined />
        </Button>
    );
}
