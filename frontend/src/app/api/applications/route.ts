// app/api/cart/items/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServer } from "../supabaseServer";

export async function POST(req: NextRequest) {
  const supabase = await createServer();
  const { jobId, resumeLink, coverLetter } = await req.json();
  const { data, error } = await supabase.rpc("create_application", {
    p_job_id: jobId,
    p_resume_link: resumeLink,
    p_cover_letter: coverLetter,
  });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
