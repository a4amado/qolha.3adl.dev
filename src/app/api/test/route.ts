import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
NextResponse;
export const GET = async () => {
  const supabaseStorage = createClient(
    "https://kvhthnqaurewrkesyryy.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2aHRobnFhdXJld3JrZXN5cnl5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzQyMDkwMiwiZXhwIjoyMDIyOTk2OTAyfQ.OODYy7FaiH88wv-mxgaR4oQsnHsXrsjhh7DTFNO7lmA",
  );

  await supabaseStorage
    .from("word")
    .update({
      text: "FROM BACKEND",
    })
    .eq("id", "2ec98ad0-b47b-41d3-8f75-3ba9e6ab0cad");
  console.log("WWWWWWWWWWW");
  return NextResponse.json({ ss: 2 });
};
