import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accounts = request.cookies.get(
    process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS!
  )?.value;

  // Public routes that don't need authentication
  const publicRoutes = ["/auth/login", "/auth/register"];
  if (publicRoutes.includes(pathname)) {
    // If user is already logged in, redirect to their dashboard
    if (accounts) {
      const userData = JSON.parse(accounts);
      return NextResponse.redirect(
        new URL(`/${userData.role}/dashboard`, request.url)
      );
    }
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  if (!accounts) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const userData = JSON.parse(accounts);
    const userRole = userData.role;

    // Super Admin routes protection
    if (pathname.startsWith("/super-admin")) {
      if (userRole !== "super_admin") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    // Admin routes protection
    if (pathname.startsWith("/admin")) {
      if (userRole !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    // Guru routes protection
    if (pathname.startsWith("/guru")) {
      if (userRole !== "guru") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    // Siswa routes protection
    if (pathname.startsWith("/siswa")) {
      if (userRole !== "siswa") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    // Redirect users to their respective dashboards if they try to access root dashboard
    if (pathname === "/dashboard") {
      switch (userRole) {
        case "super_admin":
          return NextResponse.redirect(new URL("/super-admin/dashboard", request.url));
        case "admin":
          return NextResponse.redirect(new URL("/admin/dashboard", request.url));
        case "guru":
          return NextResponse.redirect(new URL("/guru/dashboard", request.url));
        case "siswa":
          return NextResponse.redirect(new URL("/siswa/dashboard", request.url));
        default:
          return NextResponse.redirect(new URL("/auth/login", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // If there's any error parsing the cookie or other issues, redirect to login
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    // Auth routes
    "/auth/login",
    "/auth/register",
    // Protected routes
    "/dashboard",
    "/super-admin/:path*",
    "/admin/:path*",
    "/guru/:path*",
    "/siswa/:path*",
    "/profile/:path*",
  ],
};
