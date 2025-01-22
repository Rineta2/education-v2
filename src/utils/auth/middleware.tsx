import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

import { Role } from '@/utils/auth/schema/auth';

// Paths that don't require authentication
const publicPaths = ['/auth'];

// Role-based path mapping
const rolePathMap = {
  [Role.SUPER_ADMIN]: ['/super-admins'],
  [Role.ADMIN]: ['/admin'],
  [Role.GURU]: ['/guru'],
  [Role.SISWA]: ['/siswa']
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for authentication token
  const token = request.cookies.get('auth-token');
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Get user role from session/token
  const userRole = request.cookies.get('user-role')?.value;

  if (!userRole) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Check role-based access
  const allowedPaths = rolePathMap[userRole as unknown as Role] || [];
  const hasAccess = allowedPaths.some(path => pathname.startsWith(path));

  if (!hasAccess) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};