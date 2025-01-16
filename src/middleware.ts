import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isAuth = request.cookies.has("user.sid"); // => true

  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  // Exclude requests to `_next` static files, API routes, and public files
  if (
    pathname.startsWith("/_next") || // Static files
    pathname.startsWith("/api") || // API routes
    pathname.startsWith("/favicon.ico") || // Favicon
    pathname.startsWith("/public") // Public folder
  ) {
    return response;
  }

  const isDev = process.env.NEXT_PUBLIC_ENV === "development";

  // if unauthenticated user opens any page except login or register, navigate them to login
  if (
    !isDev &&
    !isAuth &&
    !["/login", "/register"].includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // if an authenticated user opens a register or login page, navigate to home
  else if (
    isAuth &&
    ["/login", "/register"].includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return response;
}
