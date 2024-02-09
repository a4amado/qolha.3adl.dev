"use client";

import { Button, Flex, Input } from "antd";
import Link from "next/link";
import { useState } from "react";
import { client } from "~/supabase/client";
import { Database } from "types/supabase";


export default function Home(ctx: any) {

  const [word, setWord] = useState("")

  function handleWord(v: string) {
    setWord(v)
  }

  return (
    <main className="w-full h-screen max-w-4xl block mx-auto">
      <Button onClick={async () => {
        const s = await client.from("word").insert({ text: "asdasdasd" } as Database["public"]["Tables"]["word"]["Insert"])
        console.log(s);

      }}>ss</Button>
      <Flex className=" flex flex-end items-end m-5 flex-grow-0">
        <Input
          onChange={(e) => handleWord(e.target.value)}
          value={word}
          placeholder="إبحث ........." className="h-28 text-center font-bold !text-4xl w-full border align-bottom max-w-4xl block mx-auto" />
      </Flex>
      <Flex className="h-3/4  flex-col  items-end m-5 flex-grow-0">
        <Flex className="text-center w-full">
          <Link href={{
            pathname: "/word/search",
            query: {
              word: "word"
            }
          }} className="block underline text-3xl"  >قال</Link>
        </Flex>
      </Flex>
    </main>

  );
}
// BO7j2YebgNHJ7VCV