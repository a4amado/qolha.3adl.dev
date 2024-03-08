"use client";

import AddWord from "./_components/add-word";
import AddClip from "./_components/add-clip";
import { AutoComplete, Flex, Input, Typography } from "antd";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { api } from "~/trpc/react";
import Image from "next/image";

export default function Home(ctx: any) {
  const [word, setWord] = useState("");
  const q = api.word.search.useMutation();
  const [tigger, setTigger] = useState("");
  const ss = useRef<any>(null)

  useEffect(() => {
    
    clearTimeout(ss.current);

    ss.current = setTimeout(() => {
      if (!word) return;
      q.mutateAsync(word)

    }, 700);
    () => clearTimeout(ss.current);
  }, [ss.current])

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
        <Flex className="w-full flex-col text-center">
          {q.status == "loading" && <Loading />}
          {q.status == "success" && q.data.length === 0 && word && <Flex className="mx-auto">Sorry we found nothing for: {word}</Flex>}
          {q.status == "error" && <Flex className="mx-auto">Something went wrong.</Flex>}

          {(q.data || [])?.map((v) => {
            return (
              <Link
                href={{
                  pathname: "/word/search",
                  query: {
                    word: v.text,
                  },
                }}
                className="block text-3xl underline"
              >
                {v.text} {v.id}
              </Link>
            );
          })}
        </Flex>
      </Flex>
    </main>
  );
}


function Loading() {
  return <>
    <Image className="mx-auto" alt="loading" src="/Double Ring-0.8s-203px.svg" width={150} height={150} />

  </>
}