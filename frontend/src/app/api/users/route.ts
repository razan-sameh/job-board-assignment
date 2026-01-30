import { NextRequest, NextResponse } from "next/server";
import { createServer } from "@/app/api/supabaseServer";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);

    // Read query params
    const page = Number(url.searchParams.get("page") || 1);
    const pageSize = Number(url.searchParams.get("pageSize") || 10);

    const supabase = await createServer();

    // Call the RPC function
    const { data, error } = await supabase.rpc("get_all_users_paginated", {
      p_page: page,
      p_page_size: pageSize,
    });

    if (error) {
      console.error("Supabase RPC error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Return JSON response
    return NextResponse.json({ data });
  } catch (err) {
    console.error("GET /applications error:", err);
    return NextResponse.json({ error: err || "Unknown error" }, { status: 500 });
  }
}