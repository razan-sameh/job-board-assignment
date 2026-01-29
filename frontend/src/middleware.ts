import { createServer } from "@/app/api/supabaseServer";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const supabase = await createServer();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  const role = user?.user_metadata.role;
  const pathname = req.nextUrl.pathname;

  // صفحات protected
  const protectedRoutes = ["/applications"];
  const applyRouteRegex = /^\/jobs\/\d+\/apply$/;

  // صفحات admin
  const adminRoutes = ["/dashboard"];

  // ✅ حماية protectedRoutes
  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) ||
    applyRouteRegex.test(pathname)
  ) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // ✅ حماية adminRoutes
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/403", req.url));
    }
  }

  return NextResponse.next();
}
