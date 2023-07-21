import { DeleteOutlined } from "@ant-design/icons";
import { trpc } from "@utils/trpc";
import { Button } from "@blueprintjs/core";
import axios from "axios";
import { useToggle } from "react-use";

export default function BanUser({ userId }: { userId: string }) {
    const ban = trpc.user.banUser.useMutation();

    return <Button onClick={() => ban.mutate({ userId })} loading={ban.isLoading} text="DELETE USER" icon="trash" />;
}
