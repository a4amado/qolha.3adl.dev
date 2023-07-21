import { InputGroup, MenuItem, Popover } from "@blueprintjs/core";
import React, { useState } from "react";
import NextLink from "next/link";
import { trpc } from "@utils/trpc";
import { Select } from "@blueprintjs/select";
import "./search.module.scss";

export default function Search() {
    const w = trpc.search.searchWord.useQuery();
    const word = useState("");
    React.useEffect(() => {
        w.refetch();
    }, [word]);

    return (
        <div className="w-full h-screen">
            <span className="block w-full h-1/5">
                <h1 className="text-5xl text-center justify-middle">Qolha</h1>
            </span>
            <Select
            onItemSelect={console.log}
                popoverTargetProps={{}}
                className="w-full"
                filterable={false}
                items={w.data || []}
                itemRenderer={(e, i) => {
                    return (
                        <MenuItem
                            className={`${i.index % 2 === 0 ? "bg-slate-200" : ""}`}
                            text={
                                <NextLink key={e.id} className="block" href={`/word/${e.id}`}>
                                    {e.ar}
                                </NextLink>
                            }
                        />
                    );
                }}
            >
                <InputGroup intent="primary" className="text-middle" onChange={(e) => word[1](e.target.value)} value={word[0]} />
            </Select>
            <p>Found {w.data?.length} words</p>
        </div>
    );
}
