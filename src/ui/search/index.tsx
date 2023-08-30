import React, { useState, KeyboardEvent } from "react";
import { trpc } from "@utils/trpc";
import { Input, Space, Typography } from "antd"; // Import Ant Design components
import Router from "next/router";
import { Circular, Node } from "doublie";
import { RouterOutput } from "../../server/routers/_app";
import NextLink from "next/link";
import LoadingComponent from "@ui/ComponentLoading";

const { Link } = Typography; // Destructure Link component from Ant Design Typography
const { Search } = Input; // Destructure Search component from Ant Design Input
const { Text } = Typography; // Destructure Text component from Ant Design Typography

export default function SearchComponent() {
    const [input, setInput] = useState("");

    const [items, setItems] = useState<Circular<RouterOutput["search"]["searchWord"]["words"][number]> | null>(
        new Circular()
    );
    const data = items?.toArray() || [];
    const [activeItem, setActiveItem] = useState<Node<RouterOutput["search"]["searchWord"]["words"][number]> | null>(
        new Node()
    );

    const w = trpc.search.searchWord.useMutation({
        onSuccess(data) {
            const circular = new Circular();

            for (const e of data.words) {
                circular.append(e);
            }

            setItems(circular);
            setActiveItem(circular.head);
        },
    });

    function handleBtnDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            // @ts-ignore
            setActiveItem(activeItem?.next);
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            // @ts-ignore
            setActiveItem(activeItem?.prev);
        }

        if (e.key === "Enter") {
            e.preventDefault();
            Router.push(`/word/${activeItem?.value.ar}`);
            setItems(new Circular());
        }

        return true;
    }

    React.useEffect(() => {
        w.mutate(input);
    }, [input]);

    return (
        <div className="flex flex-col w-full max-w-md">
            <div className="relative bg-white rounded-md">
                <Search
                    onKeyDown={handleBtnDown}
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                    className="border rounded-t-md"
                />

                <div
                    className={`p-2 border border-black bg-white ${data?.length > 0 ? "block" : "hidden"
                        } absolute top-full left-0 w-full z-[999999999999]`}
                >
                    {w.isSuccess &&
                        data.map((e) => (
                            <Link
                                key={e.id}
                                className={`block px-1 py-2 ${activeItem?.value.id === e.id ? "bg-yellow-200" : ""
                                    }`}
                                href={`/word/${e.ar}`}
                            >
                                {e.ar}
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );
}
