"use client";

import { Avatar, Button, Col, Flex, Popover } from "antd";
import { SettingFilled } from "@ant-design/icons";
import Link from "next/link";
import CgProfile from "@react-icons/all-files/cg/CgProfile";
import { useSession } from "~/helpers/hooks/supabase/auth/useSession";


export default function Header() {
  const session = useSession();

  return (
    <Flex className="w-full h-20">
      <Flex className="max-w-4xl w-full mx-auto items-center gap-3 py-3">
        <Col className="h-full">
          <Link
            href={{
              pathname: session ? "/settings" : "/auth",
            }}
            className="aspect-square !h-full flex justify-center items-center"
          >
            {false ? (
              <Avatar alt="profile pic" src={""} />
            ) : (
              <CgProfile.CgProfile className="text-4xl flex justify-center items-center border rounded-full hover:bg-slate-200" />
            )}
          </Link>
        </Col>

        <Col className="w-full flex justify-center">
          <Link
            href={{
              pathname: "/",
            }}
            className="aspect-square !h-full flex justify-center items-center"
          >
            Quolha
          </Link>
        </Col>

        <Col className="h-full">
          <Link
            href={{
              pathname: "/settings",
            }}
            className="aspect-square !h-full flex justify-center items-center"
          >
            <SettingFilled className="flex justify-center items-center border p-4 rounded-full hover:bg-slate-200" />
          </Link>
        </Col>
      </Flex>
    </Flex>
  );
}
