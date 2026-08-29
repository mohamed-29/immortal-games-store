import { NextRequest, NextResponse } from "next/server"

const supportedLocales = ["en", "ar"]

export function middleware(request: NextRequest) {
  const firstSegment = request.nextUrl.pathname.split("/")[1]?.toLowerCase()

  if (!supportedLocales.includes(firstSegment)) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = `/en${
      request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname
    }`
    return NextResponse.redirect(redirectUrl, 307)
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-immortal-locale", firstSegment)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  response.cookies.set("immortal_locale", firstSegment, {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  })

  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp|ico).*)",
  ],
}
