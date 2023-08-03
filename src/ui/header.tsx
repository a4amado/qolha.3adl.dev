import { mergeStyles } from "@fluentui/react";

import { Menu, MenuTrigger, MenuPopover, MenuList, Button, MenuItemLink } from "@fluentui/react-components";
import { useSession } from "next-auth/react";
import React, { PropsWithChildren, useRef } from "react";

function saveSpace(styles: string) {
    return mergeStyles(styles, {
        pointerEvents: "none",
        position: "relative",
        zIndex: -1,
    });
}

export default function Header() {
    const session = useSession();

    const logedIn = session.status === "authenticated";
    const NotlogedIn = session.status === "unauthenticated";
    return (
        <div
            className={mergeStyles({
                width: "100%",
                height: "45px",
            })}
        >
            <nav
                className={mergeStyles({
                    maxWidth: "1150px",
                    width: "100%",
                    height: "45px",
                    background: "yellow",
                    display: "flex",

                    margin: "0 auto",
                })}
            >
                <span className={mergeStyles({
                    justifyContent: "center",
                    
                })}>Qolha</span>
                <div
                    className={mergeStyles({
                        width: "100%",

                        display: "flex",
                        flexDirection: " row",
                    })}
                >
                    <Menu>
                        <MenuTrigger>
                            <Button>Open Menu</Button>
                        </MenuTrigger>
                        <MenuPopover>
                            <MenuList
                                className={mergeStyles({
                                    background: "white",
                                })}
                            >
                                <MenuItemLink href="#test">test</MenuItemLink>

                                <MenuItemLink href="/">Home</MenuItemLink>
                                <MenuItemLink hidden={!NotlogedIn} href="/api/auth/signin">
                                    SignIn
                                </MenuItemLink>

                                <MenuItemLink hidden={!logedIn} href="/api/auth/signout">
                                    SignOut
                                </MenuItemLink>

                                <MenuItemLink href="/addWord">add Word</MenuItemLink>

                                <MenuItemLink href="/dashboard/clips">Review Clips</MenuItemLink>
                            </MenuList>
                        </MenuPopover>
                    </Menu>
                </div>
            </nav>
        </div>
    );
}
