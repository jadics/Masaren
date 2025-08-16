import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Skip login page
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next()
    }

    // Check for session cookie
    const sessionCookie = request.cookies.get("masarin-session")

    if (!sessionCookie) {
      // Redirect to login if no session
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    try {
      // Validate session data
      const sessionData = JSON.parse(sessionCookie.value)

      if (!sessionData.userId || !sessionData.email) {
        // Invalid session, redirect to login
        return NextResponse.redirect(new URL("/admin/login", request.url))
      }
    } catch (error) {
      // Invalid session format, redirect to login
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
