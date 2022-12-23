import { AutoComplete, Input, Row, Typography, Spin } from "antd";
import React, { UIEvent } from "react";
import axios from "axios";
import { DocumentContext } from "next/document";

export interface AutoComeleteOption {
    label: any;
    value: string;
};
const SearchOption: Array<AutoComeleteOption> = [{ label: <Spin />, value: "Searching" }];
const NotingFoundOption: Array<AutoComeleteOption> = [{ label: <Typography>لم نجد شيئاََ</Typography>, value: "Searching" }];

export interface AlogoliaHit {
    ar: string,
    en: string,
    id: string
};

export default function Search() {
    const q = React.useState("");
    const hits = React.useState<Array<AutoComeleteOption>>();

    const containerRef = React.useRef() as React.MutableRefObject<HTMLDivElement>
    const targetRef = React.useRef() as React.MutableRefObject<HTMLDivElement>

    const search = React.useCallback(async (e: string) => {
        /**
         * The AutoComplete component extracts the values from the object and returns it out-of-the-box
         */
        try {

            q[1](e)
            if (!e) return hits[1]([]);
            hits[1](SearchOption);

            const { data } = await axios({
                method: "GET",
                url: `/api/q/${e}`
            });
            hits[1](data.map((e: AlogoliaHit) => ({
                label: e.ar,
                value: e.ar,
                key: e.id
            })))

        } catch (error) {

        }


    }, [q[0]]);

    React.useEffect(() => {
        function tooglePosition() {
            if (window.scrollY > containerRef.current.offsetTop) {
                targetRef.current.classList.add("fixed");
                targetRef.current.style.top = "0px";
                

            } else {
                targetRef.current.classList.remove("fixed")
            }
        }
        document.addEventListener("scroll", tooglePosition)
        return () => document.removeEventListener("scroll", tooglePosition);
    })

    return <>
        <Row ref={containerRef} className="w-full">
            <Row ref={targetRef} className="w-full h-full max-w-4xl px-4 py-4">
                <AutoComplete

                    options={hits[0] || []}
                    onSelect={console.log}
                    className="w-full"
                    onChange={search}
                    value={q[0]}



                >
                    <Input.Search className="w-full" size="large" placeholder="ورميت سهم الحب اقصد قلبها فأصاب سهمي عينها فاعورت"
                         />

                </AutoComplete>

            </Row>
        </Row>
    </>
}
