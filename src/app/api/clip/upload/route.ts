import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";
import { v4 } from "uuid";
import { db } from "~/server/db";
import { authOptions } from "~/server/auth";
import { api } from "~/trpc/server";
import { env } from "~/env";
import { client } from "~/server/supabase";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new NextResponse();
  }

  const formData = await request.formData();

  const file = formData.get("file") as Blob | null;
  const wordId = formData.get("word_id") as string | null;
  if (file === null) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 },
    );
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  console.log(session);

  try {
    const supbase_storage = await client.storage
      .from("clip")
      .upload(`/clips/${wordId}${v4()}.mp3`, buffer);
    if (supbase_storage.error) {
      throw supbase_storage.error;
    }
    const publicUrl = client.storage
      .from("clip")
      .getPublicUrl(supbase_storage.data.path);

    await db.clip.create({
      data: {
        supabase_path: supbase_storage.data.path,
        supabase_public_url: publicUrl.data.publicUrl,
        user_id: session?.user.id || "",
        word_id: wordId || "",
        approved: ["SUPREME_LEADER", "MODRATOR"].includes(session.user.role)
          ? new Date()
          : null,
      },
    });
    await db.word.update({
      data: {
        number_of_clips: {
          increment: 1,
        },
      },
      where: {
        id: wordId || "",
      },
    });

    return NextResponse.json(await api.word.getaWordThatNeedClips.query());
  } catch (error) {
    return NextResponse.json({ error });
  }
}
