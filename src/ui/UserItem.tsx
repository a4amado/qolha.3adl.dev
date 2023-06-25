import NextImage from "next/image";
import RoleBadge from "@ui/RoleBadge";
import ChangeRole from "@ui/ChangeRole";
import { roles } from "./ChangeRole";
import BanUser from "./BanUser";

export default function UserItem(user: {
    image: string;
    name: string;
    role: roles;
    email: string;
    id: string;
}) {
    return (
        <div className="flex flex-row items-center justify-end bg-gray-100 p-4 w-full">
            <div className="rounded-full overflow-hidden mb-4">
                <NextImage src="/ahmad.jpg" alt="Profile picture" className="h-full block" width={100} height={100} />
            </div>
            <div className="w-full h-full px-3 ">
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                <RoleBadge role={user.role} />
            </div>
            <BanUser userId={user.id} callback={console.log} />
            <ChangeRole currentRole={user.role} id={user.id} email={user.email} />
        </div>
    );
}
