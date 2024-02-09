"use client";

import { useState } from "react";
import useKey from "@reecelucas/react-use-hotkeys";
import { Button } from "antd";
import { api } from "~/trpc/react";
import { notification } from "antd";
import { client } from "~/supabase/client";
import { useSession } from "~/helpers/hooks/supabase/auth/useSession";
import { Database } from "types/supabase";
export default function MyCombobox() {
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(false)
  const session = useSession()


  function submit() {
    setLoading(true)

    client.from("word").insert({ text: word, id: 22 } as Database["public"]["Tables"]["word"]["Insert"])
      .then((value) => {
        if (!value.error) {
          setWord("")
        }
        setLoading(false)

      })

  }
  useKey("Enter", () => {
    submit();
  });

  return (
    <div className="w-full h-screen flex flex-col">
      {JSON.stringify(session?.user?.email)}
      <div className="h-1/3 flex flex-end items-end m-5 flex-grow-0">
        <input
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submit()
            }
            return true;
          }}
          disabled={loading}
          className="h-28 text-center font-bold text-4xl w-full border align-bottom max-w-4xl block mx-auto"
          value={word}
        />
      </div>
      <div className="h-2/3 flex-grow-0">
        <Button
          loading={loading}
          onClick={() => submit()}
          shape="round"
          size="large"
          className=" font-rubik max-w-80 w-9/12 !h-28 !block mx-auto bg-slate-500 !text-4xl rounded"
        >
          ادخل
        </Button>
        {"wordApi.error?.message"}
      </div>
    </div>
  );
}
