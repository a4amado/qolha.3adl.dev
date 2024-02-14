"use client";

import AddWord from "./_components/AddWord";
import AddClip from "./_components/AddClip";
import RenderClip from "./_components/RenderClip";
import { AutoComplete, Flex, Input, Typography } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

export default function Home(ctx: any) {
  const [word, setWord] = useState("");
  const q = api.word.search.useQuery(word)
  useEffect(() => {
    
  }, [word])

  function handleWord(v: string) {
    setWord(v);
  }

  return (
    <main className="mx-auto block h-screen w-full max-w-4xl">
      <Flex className=" flex-end m-5 flex flex-grow-0 items-end">
        <Input
          onChange={(e) => handleWord(e.target.value)}
          value={word}
          placeholder="إبحث ........."
          className="mx-auto block h-28 w-full max-w-4xl border text-center align-bottom !text-4xl font-bold"
        />
      </Flex>
      <Flex className="m-5  h-3/4  flex-grow-0 flex-col items-end">
        <Flex className="w-full text-center flex-col">
          {
            (q.data || [])?.map((v) => {
              return  <Link
              href={{
                pathname: "/word/search",
                query: {
                  word: v.text,
                },
              }}
              className="block text-3xl underline"
            >
              {v.text}
            </Link>
            })
          }
         
        </Flex>
      </Flex>
    </main>
  );
}
