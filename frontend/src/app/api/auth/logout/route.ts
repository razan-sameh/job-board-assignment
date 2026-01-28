// app/api/auth/logout/route.ts
import { createServer } from "../../supabaseServer";

export async function POST() {
  const supabase = await createServer();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400 },
    );
  }

  return Response.json({ success: true });
}
