"use client";

import { Avatar, Button, Col, Dropdown, Flex } from "antd";
import { SettingFilled } from "@ant-design/icons";
import Link from "next/link";
import CgProfile from "@react-icons/all-files/cg/CgProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import Image from "next/image";
import useSessionState from "~/next-auth/useSession";
export default function Header() {
  const session = useSessionState();

  return (
    <Flex className="h-20 w-full">
      <Flex className="mx-auto w-full max-w-4xl items-center gap-3 py-3">
        <Col className="h-full">
          {session.status === "authenticated" ? (
            <Avatar alt="profile pic" src={session?.data?.image || ""} />
          ) : (
            <CgProfile.CgProfile className="flex items-center justify-center rounded-full border text-4xl hover:bg-slate-200" />
          )}
        </Col>

        <Col className="flex w-full justify-center">
          <Link
            href={{
              pathname: "/",
            }}
            className="flex aspect-square !h-full items-center justify-center"
          >
            Quolha
          </Link>
        </Col>

        <Col className="h-full">
          <Dropdown
            menu={{
              items: [
                {
                  key: "0",
                  label: (
                    <Link
                      href={{
                        pathname: "/clip/add",
                      }}
                    >
                      إنطق كلمه بصوتك
                    </Link>
                  ),
                },
                {
                  key: "1",
                  label: (
                    <Link
                      href={{
                        pathname: "/word/add",
                      }}
                    >
                      أضف كلمه
                    </Link>
                  ),
                },
              ],
            }}
          >
            <Button className="flex aspect-square !h-full items-center justify-center">
              <SettingFilled className="flex items-center justify-center rounded-full border p-4 hover:bg-slate-200" />
            </Button>
          </Dropdown>
        </Col>
      </Flex>
    </Flex>
  );
}
