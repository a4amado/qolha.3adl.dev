import { InputGroup, Text } from "@blueprintjs/core";
import { Ref, useRef, useState } from "react";
import NextLink from "next/link"
import { trpc } from "@utils/trpc";

export default function Search() {
    const w = trpc.search.searchWord.useQuery();
    const word = useState("");
    console.log(w.data);
    
    return (
        <div className="w-full h-screen">
            <span className="block w-full h-1/5" >
                <h1 className="text-5xl text-center justify-middle">Qolha</h1>
            </span>
            <InputGroup intent="primary" className="text-middle" onChange={(e) => word[1](e.target.value)} value={word[0]} />
            <p>Found {w.data?.length} words</p>
            <>
                {(w.data || []).map(e => (
                    <NextLink key={e.id} className="block" href={`/word/${e.id}`}>{e.ar}</NextLink>
                ))}
            </>
        </div>

    )
}