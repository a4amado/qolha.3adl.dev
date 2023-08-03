import React, { ChangeEvent, FormEvent, useState } from "react";
import NextLink from "next/link";
import { trpc } from "@utils/trpc";
import "./search.module.scss";

import { useRef } from "react";
import Router from "next/router";
import { Button } from "@fluentui/react-components";

export default function Search() {
    const word = useState("");
    const [selected, setSelected] = useState("");
    const w = trpc.search.searchWord.useMutation();

    const ref = useRef<HTMLInputElement>();

    return <p>sss</p>;
}
