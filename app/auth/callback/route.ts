import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Use production URL from environment variable
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://najah.w-electro.com";

  // Redirect to home page after sign in
  return NextResponse.redirect(new URL("/", baseUrl));
}
