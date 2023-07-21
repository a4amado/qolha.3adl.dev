import NextImage from "next/image";
import ChangeRole from "@ui/ChangeRole";
import BanUser from "./BanUser";
import { Callout } from "@blueprintjs/core";
import Prisma from "@prisma/client";

export default function UserItem(user: { image: string; name: string; role: Prisma.Role; email: string; id: string; country: string }) {
    return (
        <div className="flex flex-row items-center justify-end bg-gray-100 p-4 w-full">
            <div className="rounded-full overflow-hidden mb-4">
                <NextImage src="/ahmad.jpg" alt="Profile picture" className="h-full block" width={100} height={100} />
            </div>
            <div className="w-full h-full px-3 ">
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                <Callout title={`${user.role} from ${user.country}`} />
            </div>
            <BanUser userId={user.id} />
            <ChangeRole />
        </div>
    );
}
