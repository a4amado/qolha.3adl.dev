"use client";

import { api } from "~/trpc/react";
import { AcceptComponent, RejectComponent, PlayComponent } from "../_components/AdminClip";
import { Button, Flex, Table } from "antd";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";

import { RouterOutputs } from "~/trpc/shared"
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { clipsState } from "~/state/reviewClips";

 type ReviewClipItem = RouterOutputs["clip"]["get15WordThatNeedsRevision"][number]


export default function Page() {
  const [data, setClips] = useAtom(clipsState);
  
  // @ts-ignore
  const clips = api?.clip?.get15WordThatNeedsRevision?.useQuery(null, {
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    setClips(clips.data)
  }, [])

  const isLoading = clips?.isLoading || clips.isFetching || clips.isRefetching;
  const isNoData = !isLoading && (data || []).length === 0;
  const isError = clips.isError;
  const isData = !isLoading && !isNoData;
  function fetch() {
    clips.refetch().then(e => {
      // @ts-ignore
      setClips(e.data)
    })
  }
  return (
    <>
      <Button loading={isLoading} disabled={isLoading} onClick={fetch} icon={<ReloadOutlined />} />
      {/* @ts-ignore */}
      <Table  loading={clips.isLoading || clips.isFetching || clips.isRefetching} className="w-full shadow" dataSource={data}>
        <Table.Column title="قبول" dataIndex={""} render={(v: ReviewClipItem) => <AcceptComponent clipId={v.id} />} />
        <Table.Column title="رفض" dataIndex={""} render={(v: ReviewClipItem) => <RejectComponent clipId={v.id} />} />
        <Table.Column title="تشغيل" dataIndex={""} render={(v: ReviewClipItem) => <PlayComponent text={v.word?.text || ""} publicUrl={v.supabase_public_url} />} />
      </Table>
    </>
  );
}
