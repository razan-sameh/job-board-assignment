import { NextRequest, NextResponse } from "next/server";
import { createServer } from "../supabaseServer";
export async function POST(req: NextRequest) {
  const supabase = await createServer();
  const { title, description, company, salary, jobStatus, locationId } =
    await req.json();
  const { data, error } = await supabase.rpc("create_job", {
    p_title: title,
    p_description: description,
    p_company: company,
    p_salary: salary,
    p_status: jobStatus,
    p_location_id: locationId,
  });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
