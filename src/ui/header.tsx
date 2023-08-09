import { Button, Flex, IconButton, Spacer, Text, Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Header() {
    return (
        <Box as="nav" backgroundColor={"white"} width={"full"} p="1">
            <Flex maxW={"1100px"} m="0 auto">
                <NextLink href="/">
                    <Text as="h1" fontSize="xl" fontWeight="bold" color="black">
                        Qolha
                    </Text>
                </NextLink>
                <Spacer />
                <NavigationMenu />
            </Flex>
        </Box>
    );
}

import { HamburgerIcon } from "@chakra-ui/icons";

function NavigationMenu() {
    return (
        <Menu>
            <MenuButton as={IconButton} icon={<HamburgerIcon />} />
            <MenuList as={Flex} flexDirection={"column"} gap={1} padding={1}>
                <NextLink href={"/dashboard/clips"}>
                    <Button size={"xs"} as={MenuItem}>Review Clips</Button>
                </NextLink>
                <NextLink href={"/api/auth/signin"}>
                    <Button size={"xs"} as={MenuItem}>Login</Button>
                </NextLink>
                <NextLink href={"/word/add"}>
                    <Button size={"xs"} as={MenuItem}>Add Word</Button>
                </NextLink>
            </MenuList>
        </Menu>
    );
}
