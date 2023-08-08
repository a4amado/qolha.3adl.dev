import { Avatar, Flex, Heading, Box } from "@chakra-ui/react";
import NextImage from "next/image";
import Prisma from "@prisma/client";

export default function UserItem(user: { image: string; name: string; role: Prisma.Role; email: string; id: string; country: string }) {
    return (
        <Flex alignItems="center" justifyContent="flex-end" bg="gray.100" p="4" width="full">
            <Avatar size="lg" src="/ahmad.jpg" marginRight="4" />
            <Box flex="1">
                <Heading as="h2" size="xl" fontWeight="bold" color="gray.800">
                    {user.name}
                </Heading>
            </Box>
        </Flex>
    );
}
