 
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useState } from "react";
import { Alignment, Button, Navbar } from "@blueprintjs/core";
import NextLink from "next/link";
import ContributeClip from "./contribute";

export default function Header({ isSearch }: { isSearch: boolean }) {
    const session = useSession();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    return (
             <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>Qolha</Navbar.Heading>
                    <Navbar.Divider />
                    <NextLink href="/">
                        <Button className="bp5-minimal" icon="home" text="Home" />
                    </NextLink>

                    <NextLink href="/word/add">
                        <Button className="bp5-minimal" icon="add-column-right" text="add word" />
                    </NextLink>
                    <ContributeClip />
                </Navbar.Group>
            </Navbar>
     );
}
