import { Button, Flex, IconButton, Spacer, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useSession } from "next-auth/react";

export default function Header() {
    const session = useSession();

    const logedIn = session.status === "authenticated";
    const NotlogedIn = session.status === "unauthenticated";
    return (
        <Box as="nav" backgroundColor={"white"} width={"full"} p="1">
            <Flex maxW={"1100px"} m="0 auto">
                <Text fontSize="xl" fontWeight="bold" color="black">
                    Qolha
                </Text>
                <Spacer />
                <NavigationMenu />
            </Flex>
        </Box>
    );
}

import { Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

function NavigationMenu() {
    const session = useSession();

    return (
        <Menu>
            <MenuButton>
                <IconButton icon={<HamburgerIcon />} aria-label={"menu"} />
            </MenuButton>
            
            <MenuList as={Flex} flexDirection={"column"} gap={1} padding={1}>
                <NextLink href={"/dashboard/clips"}>
                    <Button as={MenuItem}>Review Clips</Button>
                </NextLink>
                <NextLink href={"/api/auth/signIn"}>
                    <Button as={MenuItem}>Login</Button>
                </NextLink>
                <NextLink href={"/word/add"}>
                    <Button as={MenuItem}>Add Word</Button>
                </NextLink>
            </MenuList>
        </Menu>
    );
}
