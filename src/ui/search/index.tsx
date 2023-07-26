import React, { ChangeEvent, FormEvent, useState } from "react";
import NextLink from "next/link";
import { trpc } from "@utils/trpc";
import "./search.module.scss";
import { Autocomplete, TextField, MenuItem, Menu } from "@mui/material";
import { useRef } from "react";
import Router from "next/router";

interface AutocompleteOption {
    label: string;
    id: string;
    key: string;
}

export default function Search() {
    const word = useState("");
    const [selected, setSelected] = useState("");
    const w = trpc.search.searchWord.useMutation();

    const ref = useRef<HTMLInputElement>();

    return (
        <Autocomplete
            blurOnSelect
            disableClearable
            freeSolo
            loading={w.isLoading}
            onHighlightChange={(_, d) => setSelected(d?.label || "")}
            options={w.data?.map((e) => ({ id: e.id, label: e.ar, key: e.id })) || ([] as AutocompleteOption[])}
            sx={{ maxWidth: 300, width: "100%", backgroundColor: "white", borderRadius: "5px" }}
            filterOptions={(x) => x}
            renderOption={(e, { id, key, label }) => (
                <NextLink href={`/word/${label}`}>
                    <MenuItem {...e} key={key}>
                        {label}
                    </MenuItem>{" "}
                </NextLink>
            )}
            renderInput={(params) => (
                <TextField
                    inputRef={ref}
                    onChange={(e) => {
                        if (e.target.value) {
                            w.mutate(e.target.value);
                        }

                        word[1](e.target.value);
                    }}
                    value={word[0]}
                    {...params}
                    size="small"
                />
            )}
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    Router.push(`/word/${selected}`);
                }
            }}
        />
    );
}
