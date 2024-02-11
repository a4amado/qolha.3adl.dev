"use client";

import { useState } from "react";
import useKey from "@reecelucas/react-use-hotkeys";
import { Button } from "antd";
import { api } from "~/trpc/react";
import { notification } from "antd";

export default function MyCombobox() {
  const [word, setWord] = useState("");

  const wordApi = api.word.createWord.useMutation({
    onSuccess: () => {
      notification.success({
        message: "تم اضافه الكلمه بنجاح",
        placement: "topRight",
        duration: 2000,
      });
      setWord("");
    },
  });

  function submit() {
    if (wordApi.isLoading) return;
    wordApi.mutate({ text: word });
  }
  useKey("Enter", () => {
    submit();
  });

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex-end m-5 flex h-1/3 flex-grow-0 items-end">
        <input
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              wordApi.mutate({ text: word });
            }
            return true;
          }}
          className="mx-auto block h-28 w-full max-w-4xl border text-center align-bottom text-4xl font-bold"
          value={word}
        />
      </div>
      <div className="h-2/3 flex-grow-0">
        <Button
          loading={wordApi.isLoading}
          onClick={() => submit()}
          shape="round"
          size="large"
          className=" font-rubik mx-auto !block !h-28 w-9/12 max-w-80 rounded bg-slate-500 !text-4xl"
        >
          ادخل
        </Button>
        {wordApi.error?.message}
      </div>
    </div>
  );
}
