import { AutoComplete, Input, Row, Typography, Spin, Button } from "antd";
import React, { Reducer, useReducer } from "react";
import axios from "axios";
import Router from "next/router";

export interface AutoComeleteOption {
  label: any;
  value: string;
  key: string;
}

export interface AlogoliaHit {
  ar: string;
  en: string;
  id: string;
}

export interface HitsReducerState {
  hits: Array<{ label: React.ReactElement | string; value: string; key: string }> | Array<never>;
}
interface ReducerAction {
  type: "REPLACE_ITEMS" | "LOADING" | "NOT_FOUND";
  data?: HitsReducerState;
}

const SearchOption: HitsReducerState = {
  hits: [{ label: <Spin />, value: "Searching", key: "asd" }],
};
const NotingFoundOption: HitsReducerState = {
  hits: [
    {
      label: <Typography>لم نجد شيئاََ</Typography>,
      value: "Searching",
      key: "Asdasdasda",
    },
  ],
};

export const handleReducer: Reducer<HitsReducerState, ReducerAction> = (state, action): HitsReducerState => {
  switch (action.type) {
    case "LOADING":
      const IS_LOADING_STATE: HitsReducerState = SearchOption;
      return IS_LOADING_STATE;
    case "NOT_FOUND":
      const NOT_FOUND_STATE = NotingFoundOption;
      return NOT_FOUND_STATE;
    case "REPLACE_ITEMS":
      const NEW_STATE: HitsReducerState = { hits: action.data?.hits || [] };
      return NEW_STATE;
    default:
      const STATE = { hits: [] };
      return STATE;
  }
};
const initialState: HitsReducerState = { hits: [] };

export default function Search() {
  const q = React.useState("");
  const [{ hits }, dispatchHits] = useReducer(handleReducer, initialState);

  const containerRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const targetRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  const search = React.useCallback(
    async (e: string) => {
      try {
        q[1](e);
        if (!e) {
          return dispatchHits({ type: "REPLACE_ITEMS", data: { hits: [] } });
        }
        dispatchHits({
          type: "LOADING",
        });

        const { data } = await axios({
          method: "GET",
          url: `/api/q/${e}`,
        });
        if (data.length === 0) {
          return dispatchHits({
            type: "NOT_FOUND",
          });
        }
        dispatchHits({
          type: "REPLACE_ITEMS",
          data: {
            hits: data.map((e: AlogoliaHit) => ({
              label: `${e.ar}`,
              value: `${e.ar}`,
              key: e.id,
            })),
          },
        });
      } catch (error) {}
    },
    [q[0]]
  );

  React.useEffect(() => {
    function tooglePosition() {
      if (window.scrollY > containerRef.current.offsetTop) {
        targetRef.current.classList.add("fixed");
        targetRef.current.classList.add("top-0");
        targetRef.current.classList.add("left-1/2");
        targetRef.current.classList.add("-translate-x-1/2");
      } else {
        targetRef.current.classList.remove("fixed");
        targetRef.current.classList.remove("top-0");
        targetRef.current.classList.remove("left-1/2");
        targetRef.current.classList.remove("-translate-x-1/2");
      }
    }
    document.addEventListener("scroll", tooglePosition);
    return () => document.removeEventListener("scroll", tooglePosition);
  });

  function handleSelect(_: any, s: AutoComeleteOption) {
    return Router.push({ pathname: "/", query: { q: s.key, word: s.value } });
  }

  return (
    <>
      <Row ref={containerRef} className="w-full">
        <Row ref={targetRef} className="w-full max-w-4xl px-4 py-4 mx-auto">
          <AutoComplete options={hits} defaultActiveFirstOption onSelect={handleSelect} className="w-full" onChange={search} value={q[0]}>
            <Input.Search className="w-full" size="large" placeholder="ورميت سهم الحب اقصد قلبها فأصاب سهمي عينها فاعورت" />
          </AutoComplete>
        </Row>
      </Row>
    </>
  );
}
