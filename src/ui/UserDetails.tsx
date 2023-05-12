import { Typography, Col } from "antd";

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
        <NextLink className="inline" href={`${link.name}/${link.username}`}>
            {mediaIconsList[link.name]}
        </NextLink>
    );
}

function SocialMediaList({ list }: { list: UserDetailsProps["socialMedia"] }) {
    return (
        <Col className="flex">
            {list.map((media) => (
                <SocialMediaLink link={media} />
            ))}
        </Col>
    );
}

export default function UserDetails(UserDetails: UserDetailsProps) {
    return (
        <>
            <Typography className="text-4xl">{UserDetails.name}</Typography>
            <Typography>
                {UserDetails.country} <EG title="sss" width={30} height={20} />
            </Typography>
            <JoinedSince date="2001-01-01" />

            <SocialMediaList
                list={[
                    { name: "IN", username: "ssssssssssss" },
                    { name: "TW", username: "sssssssadasd" },
                ]}
            />
        </>
    );
}
