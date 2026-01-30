import { NextRequest, NextResponse } from "next/server";
import { createServer } from "@/app/api/supabaseServer";

export async function GET(req: NextRequest) {
  const supabase = await createServer();
  const { page, pageSize, isRecentJobs } = await req.json();

  const { data, error } = await supabase.rpc("get_my_applications", {
    p_page: page,
    p_page_size: pageSize,
    p_recent: isRecentJobs,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data });
}
