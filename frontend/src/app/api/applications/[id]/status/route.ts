import { NextRequest, NextResponse } from "next/server";
import { createServer } from "@/app/api/supabaseServer";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createServer();
    const { status } = await req.json();

    const { data, error } = await supabase.rpc(
      "update_application_status",
      {
        p_application_id: Number(params.id),
        p_status: status,
      }
    );

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 403 }
      );
    }

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json(
      { error: "Failed to update application status" },
      { status: 500 }
    );
  }
}
