import PageContainer from "../../../ui/PageContainer";
import { Alert, Input } from "antd";
import useAxios from "axios-hooks";
import React, { useState } from "react";
import Header from "../../../ui/header";
import ChangeRole from "../../../ui/ChangeRole";
import NextImage from "next/image";
import RoleBadge from "../../../ui/RoleBadge";

function Users() {
    const [email, setEmail] = useState("");
    const [user, searchForAUser] = useAxios(
        {
            method: "GET",

            url: `/api/users/q?email=${email}`,
        },
        { manual: true }
    );

    React.useEffect(() => {
        if (email) {
            searchForAUser();
        }
    }, [email]);

    return (
        <>
            <Header isSearch={false} />

            <PageContainer>
                <Input value={email} className="text-center font-bold text-lg" placeholder="email@email.email" onChange={(e) => setEmail(e.target.value)} />

                <div className="flex flex-col justify-evenly w-full gap-2">
                    <div className="flex flex-row items-center justify-end bg-gray-100 p-4 w-full">
                        <div className="rounded-full overflow-hidden mb-4">
                            <NextImage src="/ahmad.jpg" alt="Profile picture" className="h-full block" width={100} height={100} />
                        </div>
                        <div className="w-full h-full px-3 ">
                            <h2 className="text-xl font-bold text-gray-800">أحمد عادل</h2>
                            <RoleBadge role={"owner"} />
                        </div>
                        <ChangeRole currentRole={"owner"} email={user.data?.email} />
                    </div>
                    <div className="flex flex-row items-center justify-end bg-gray-100 p-4 w-full">
                        <div className="rounded-full overflow-hidden mb-4">
                            <NextImage src="/ahmad.jpg" alt="Profile picture" className="h-full block" width={100} height={100} />
                        </div>
                        <div className="w-full h-full px-3 ">
                            <h2 className="text-xl font-bold text-gray-800">أحمد عادل</h2>
                            <RoleBadge role={"owner"} />
                        </div>
                        <ChangeRole currentRole={user.data?.role} email={user.data?.email} />
                    </div>
                </div>
            </PageContainer>
        </>
    );
}

export default Users;

/***
 * ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
 * || IMAGE IMAGE IMAGE <- 150px * 150px                          ------------------ ||
 * || IMAGE IMAGE IMAGE >> Name                                   --  CHANGE ROLE -- ||
 * || IMAGE IMAGE IMAGE >> Role                                   ------------------ ||
 * ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
 */
