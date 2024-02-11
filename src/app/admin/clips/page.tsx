"use client";

import { api } from "~/trpc/react";
import ClipAdminComponent from "../_components/AdminClip";
import { Button, Flex } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Page() {
  // @ts-ignore
  const clips = api?.clip?.get15WordThatNeedsRevision?.useQuery(null, {
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const isLoading = clips?.isLoading || clips.isFetching || clips.isRefetching;
  const isNoData = !isLoading && clips.data.length === 0;
  const isError = clips.isError;
  const isData = !isLoading && !isNoData;

  return (
    <>
      <Button onClick={() => clips.refetch()}>s</Button>
      {isLoading && (
        <Flex className="h-screen w-full items-start justify-center">
          <LoadingOutlined className="text-6xl" />
        </Flex>
      )}
      {isNoData && (
        <Flex className="h-screen w-full justify-center">
          <p className="text-6xl">لا يوجد اصوات للمرجعه</p>
        </Flex>
      )}
      {isData &&
        clips?.data?.map((clip) => {
          return (
            <ClipAdminComponent
              clipId={clip.id}
              text={clip?.word?.text || ""}
              publicUrl={clip.supabase_public_url}
              wordId={clip.word?.id || ""}
            />
          );
        })}
    </>
  );
}
