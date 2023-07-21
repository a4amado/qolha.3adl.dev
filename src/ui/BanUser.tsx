import { trpc } from "@utils/trpc";
import { Button, OverlayToaster } from "@blueprintjs/core";

export default function BanUser({ userId }: { userId: string }) {
    const ban = trpc.user.banUser.useMutation();

    return <Button onClick={() => ban.mutate({ userId })} loading={ban.isLoading} text="DELETE USER" icon="trash" />;
}
