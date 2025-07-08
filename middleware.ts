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
  const protectedRoutes = ["/dashboard", "/perfil", "/notificacoes"]
  const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Redirect to dashboard if accessing auth pages with session
  const authRoutes = ["/login", "/cadastro"]
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname)

  if (isAuthRoute && session) {
    // Get user profile to determine redirect
    const { data: profile } = await supabase.from("users").select("user_type").eq("id", session.user.id).single()

    const redirectPath = profile?.user_type === "prestador" ? "/dashboard/prestador" : "/dashboard/cliente"

    return NextResponse.redirect(new URL(redirectPath, req.url))
  }

  return res
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
