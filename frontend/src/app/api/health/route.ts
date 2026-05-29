// app/api/health/route.ts
import { createServer } from "@/app/api/supabaseServer";

export async function GET() {
  const supabase = await createServer();

  // lightweight query (very important)
  await supabase.from("jobs").select("id").limit(1);

  return Response.json({ ok: true });
}