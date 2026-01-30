// app/api/applications/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServer } from "../../supabaseServer";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params; // ✅ await params
  const supabase = await createServer();

  if (!id) {
    return NextResponse.json(
      { error: "applicationId is required" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase.rpc("get_application_by_id", {
    p_application_id: Number(id),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ applied: data });
}
