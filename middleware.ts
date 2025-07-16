import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes
  const protectedRoutes = ["/dashboard", "/perfil", "/notificacoes", "/chat"]
  const authRoutes = ["/login", "/cadastro"]

  const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Redirect to dashboard if accessing auth routes with session
  if (isAuthRoute && session) {
    // Get user profile to determine redirect
    const { data: userProfile } = await supabase.from("users").select("user_type").eq("id", session.user.id).single()

    if (userProfile?.user_type === "prestador") {
      return NextResponse.redirect(new URL("/dashboard/prestador", req.url))
    } else {
      return NextResponse.redirect(new URL("/dashboard/cliente", req.url))
    }
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/perfil/:path*", "/notificacoes/:path*", "/chat/:path*", "/login", "/cadastro"],
}
