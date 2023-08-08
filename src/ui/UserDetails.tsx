import { Flex, Text, Link } from "@chakra-ui/react";
import { EG } from "country-flag-icons/react/3x2";
import JoinedSince from "@ui/JoinedSince";
import React, { ReactNode } from "react";
import { AiFillFacebook, AiFillTwitterSquare, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import NextLink from "next/link";

export const AllowedSocialMedia = ["FB", "TW", "IN", "LK"] as const;

type UserDetailsProps = {
    name: string;
    country: string;
    joinedIn: string;
    socialMedia: { name: (typeof AllowedSocialMedia)[number]; username: string }[];
};

const mediaIconsList = {
    IN: <AiFillInstagram style={{ width: 30, height: 30 }} />,
    FB: <AiFillFacebook style={{ width: 30, height: 30 }} />,
    LK: <AiFillLinkedin style={{ width: 30, height: 30 }} />,
    TW: <AiFillTwitterSquare style={{ width: 30, height: 30 }} />,
};

function SocialMediaLink({ link }: { link: UserDetailsProps["socialMedia"][number] }) {
    return (
        <NextLink href={`${link.name}/${link.username}`} passHref>
            <Link className="inline-block" fontSize="xl" marginX="2">
                {mediaIconsList[link.name]}
            </Link>
        </NextLink>
    );
}

function SocialMediaList({ list }: { list: UserDetailsProps["socialMedia"] }) {
    return (
        <Flex>
            {list.map((media, i) => (
                <SocialMediaLink key={i} link={media} />
            ))}
        </Flex>
    );
}

export default function UserDetails(userDetails: UserDetailsProps) {
    return (
        <Flex direction="column">
            <Text fontSize="4xl">{userDetails.name}</Text>
            <Flex alignItems="center">
                <Text marginRight="2">
                    {userDetails.country} <EG title="Country" width={30} height={20} />
                </Text>
                <JoinedSince date={userDetails.joinedIn} />
            </Flex>
            <SocialMediaList
                list={[
                    { name: "IN", username: "ssssssssssss" },
                    { name: "TW", username: "sssssssadasd" },
                ]}
            />
        </Flex>
    );
}
