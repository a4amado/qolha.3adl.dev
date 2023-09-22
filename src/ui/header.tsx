import { Button, Space, Typography, Dropdown, Menu } from "antd";
import { HomeOutlined, LoginOutlined, PlusOutlined, MenuOutlined } from "@ant-design/icons";
import NextLink from "next/link";
import SearchComponent from "./search";
import classNames from "classnames";
import { useSession } from "next-auth/react";

const { Text } = Typography;

export default function Header() {
    return (
        <div className={classNames("bg-white", "w-full", "p-1")}>
            <div className={classNames("max-w-7xl", "mx-auto", "flex", "items-center", "justify-between")}>
                <NextLink href="/">
                    <Text className={classNames("text-xl", "font-bold", "text-black", "cursor-pointer")}>Qolha</Text>
                </NextLink>
                <Space size="large">
                    <SearchComponent />
                    <NavigationMenu />
                </Space>
            </div>
        </div>
    );
}

function NavigationMenu() {
    const session = useSession();
    const menu = (
        <Menu>
            <Menu.Item>
                <NextLink href="/dashboard/clips">
                    <Button size="small" type="link">
                        Review Clips
                    </Button>
                </NextLink>
            </Menu.Item>

            {
                session.status === "unauthenticated" && (<Menu.Item>
                    <NextLink href="/api/auth/signin">
                        <Button size="small" type="link">
                            Login
                        </Button>
                    </NextLink>
                </Menu.Item>)
            }
            {
                session.status === "authenticated" && (<Menu.Item>
                    <NextLink href={`/user/${session.data.user.id}`}>
                        <Button size="small" type="link">
                            {session.data.user.name} - {session.data.user.role}
                        </Button>
                    </NextLink>
                </Menu.Item>)
            }

            <Menu.Item>
                <NextLink href="/word/add">
                    <Button size="small" type="link">
                        Add Word
                    </Button>
                </NextLink>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={["click"]}>
            <Button size="small" icon={<MenuOutlined />} />
        </Dropdown>
    );
}
