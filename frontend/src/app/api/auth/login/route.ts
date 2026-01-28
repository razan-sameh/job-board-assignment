/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServer } from "../../supabaseServer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { identifier, password } = await req.json();
    const supabase = await createServer();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: identifier,
      password: password,
    });

    if (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true, user: data.user });
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to login" },
      { status: 400 },
    );
  }
}
