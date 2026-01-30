import { NextResponse } from "next/server";
import { createServer } from "@/app/api/supabaseServer";

export async function GET() {
  const supabase = await createServer();

const { data, error } = await supabase.rpc("get_dashboard_stats");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data });
}
