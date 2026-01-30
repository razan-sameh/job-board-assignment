import { NextRequest, NextResponse } from "next/server";
import { createServer } from "../../supabaseServer";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { salary, status, title, description, company, locationId } =
      await req.json();

    const supabase = await createServer(); // must be authenticated

    if (!id) {
      return NextResponse.json({ error: "jobId is required" }, { status: 400 });
    }

    const { data, error } = await supabase.rpc("update_job", {
      p_job_id: Number(id),
      p_title: title ?? null,
      p_description: description ?? null,
      p_company: company ?? null,
      p_salary: salary ?? null,
      p_status: status ?? null,
      p_location_id: locationId ?? null,
    });

    if (error) {
      console.error("RPC error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("PUT /api/jobs/:id error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const supabase = await createServer(); // must be authenticated

    if (!id) {
      return NextResponse.json({ error: "jobId is required" }, { status: 400 });
    }

    const { data, error } = await supabase.rpc("delete_job", {
      p_job_id: Number(id),
    });

    if (error) {
      console.error("RPC error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("DELETE /api/jobs/:id error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
