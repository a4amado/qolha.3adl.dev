import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useState } from "react";
import { Alignment, Button, ButtonGroup, Navbar } from "@blueprintjs/core";
import NextLink from "next/link";
import ContributeClip from "./contribute";

export default function Header({ isSearch }: { isSearch: boolean }) {
    const session = useSession();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const logedIn = session.status === "authenticated";
    const NotlogedIn = session.status === "unauthenticated";
    return (
        <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>Qolha</Navbar.Heading>
                <Navbar.Divider />
                <ButtonGroup>
                    <NextLink href="/">
                        <Button className="bp5-minimal" icon="home" text="Home" />
                    </NextLink>

                    <NextLink href="/word/add">
                        <Button className="bp5-minimal" icon="add-column-right" text="add word" />
                    </NextLink>

                    <NextLink hidden={!NotlogedIn} href="/api/auth/signin">
                        <Button intent="primary" className="bp5-minimal" icon="log-in" text="SignIn" />
                    </NextLink>

                    <NextLink hidden={!logedIn} href="/api/auth/signout">
                        <Button intent="danger" className="bp5-minimal" icon="log-out" text="SignOut" />
                    </NextLink>

                    <NextLink href="/dashboard/clips">
                        <Button intent="warning" className="bp5-minimal" icon="record" text="Review Clips" />
                    </NextLink>

                    <ContributeClip />
                </ButtonGroup>
            </Navbar.Group>
        </Navbar>
    );
}
