import { NextRequest, NextResponse } from "next/server";
import { createServer } from "../../supabaseServer";

export async function GET(req: NextRequest) {
  const supabase = await createServer();

  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId");

  if (!jobId) {
    return NextResponse.json(
      { error: "jobId is required" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase.rpc("has_applied_to_job", {
    p_job_id: Number(jobId),
  });

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ applied: data });
}
