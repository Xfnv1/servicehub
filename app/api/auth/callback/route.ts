import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      return NextResponse.redirect(`${requestUrl.origin}/login?error=auth_error`)
    }

    // Get user profile to determine redirect
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      const { data: userProfile } = await supabase.from("users").select("user_type").eq("id", session.user.id).single()

      if (userProfile?.user_type === "prestador") {
        return NextResponse.redirect(`${requestUrl.origin}/dashboard/prestador`)
      } else {
        return NextResponse.redirect(`${requestUrl.origin}/dashboard/cliente`)
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${requestUrl.origin}/dashboard/cliente`)
}
