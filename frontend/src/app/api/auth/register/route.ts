/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServer } from "../../supabaseServer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();
    const supabase = await createServer();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: username,
          role: "jobseeker",
        },
      },
    });

    if (error) {
      return new NextResponse(
        JSON.stringify({ success: false, error: error.message }),
        { status: 400 },
      );
    }

    // Return the same session object
    return new NextResponse(
      JSON.stringify({
        success: true,
        user: data.user,
        session: data.session,
      }),
      { status: 200 },
    );
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 },
    );
  }
}
