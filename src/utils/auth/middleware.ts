import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    try {
        const { pathname } = request.nextUrl;
        const authToken = request.cookies.get("authToken")?.value;
        const userRole = request.cookies.get("userRole")?.value;

        // Add more detailed logging for production debugging
        console.log({
            pathname,
            authToken: authToken ? 'exists' : 'missing',
            userRole,
            currentUrl: request.url
        });

        // Debug logs (hapus di produksi jika tidak diperlukan)
        console.log("Current Pathname:", pathname);
        console.log("authToken:", authToken);
        console.log("userRole:", userRole);
        console.log("Environment Variables:", {
            superAdmin: process.env.NEXT_PUBLIC_ROLE_SUPER_ADMIN,
            admin: process.env.NEXT_PUBLIC_ROLE_ADMIN,
            guru: process.env.NEXT_PUBLIC_ROLE_GURU,
            siswa: process.env.NEXT_PUBLIC_ROLE_SISWA,
        });

        // Public routes that don't need authentication
        const publicRoutes = ["/auth/login", "/auth/register", "/"];
        if (publicRoutes.includes(pathname)) {
            // Clean query parameters for public routes (if any exist)
            const params = request.nextUrl.searchParams;
            if (params.has("email") || params.has("password")) {
                const cleanUrl = new URL(request.url);
                cleanUrl.searchParams.delete("email");
                cleanUrl.searchParams.delete("password");
                return NextResponse.redirect(cleanUrl);
            }

            // If user is already logged in, redirect to their dashboard
            if (authToken) {
                return NextResponse.redirect(
                    new URL(`/${userRole}/dashboard`, request.url)
                );
            }
            return NextResponse.next();
        }

        // Redirect to login if not authenticated
        if (!authToken || !userRole) {
            const loginUrl = new URL("/auth/login", request.url);
            if (!pathname.startsWith("/auth")) {
                // Add the attempted URL as a callback parameter to redirect back after login
                loginUrl.searchParams.set("callbackUrl", pathname);
            }
            return NextResponse.redirect(loginUrl);
        }

        try {
            // Role-based route protection
            if (pathname.startsWith("/super-admins")) {
                if (userRole !== process.env.NEXT_PUBLIC_ROLE_SUPER_ADMIN) {
                    console.log(
                        `Unauthorized access: ${userRole} trying to access super-admins`
                    );
                    return NextResponse.redirect(new URL("/unauthorized", request.url));
                }
            }

            if (pathname.startsWith("/admins")) {
                if (userRole !== process.env.NEXT_PUBLIC_ROLE_ADMIN) {
                    console.log(`Unauthorized access: ${userRole} trying to access admins`);
                    return NextResponse.redirect(new URL("/unauthorized", request.url));
                }
            }

            if (pathname.startsWith("/guru")) {
                if (userRole !== process.env.NEXT_PUBLIC_ROLE_GURU) {
                    console.log(`Unauthorized access: ${userRole} trying to access guru`);
                    return NextResponse.redirect(new URL("/unauthorized", request.url));
                }
            }

            if (pathname.startsWith("/siswa")) {
                if (userRole !== process.env.NEXT_PUBLIC_ROLE_SISWA) {
                    console.log(`Unauthorized access: ${userRole} trying to access siswa`);
                    return NextResponse.redirect(new URL("/unauthorized", request.url));
                }
            }

            // Handle root dashboard redirect
            if (pathname === "/dashboard") {
                const dashboardUrls = {
                    [process.env.NEXT_PUBLIC_ROLE_SUPER_ADMIN as string]:
                        "/super-admin/dashboard",
                    [process.env.NEXT_PUBLIC_ROLE_ADMIN as string]: "/admins/dashboard",
                    [process.env.NEXT_PUBLIC_ROLE_GURU as string]: "/guru/dashboard",
                    [process.env.NEXT_PUBLIC_ROLE_SISWA as string]: "/siswa/dashboard",
                };

                const redirectUrl = dashboardUrls[userRole as keyof typeof dashboardUrls];
                if (redirectUrl) {
                    return NextResponse.redirect(new URL(redirectUrl, request.url));
                }
                return NextResponse.redirect(new URL("/auth/login", request.url));
            }

            return NextResponse.next();
        } catch (error) {
            console.error("Middleware error:", error);
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    } catch (error) {
        console.error('Middleware error:', error);
        // In production, log to your logging service
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
        "/",
    ],
};
