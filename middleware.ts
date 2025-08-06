import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define the secret used for signing tokens, should match the one used in NextAuth configuration
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret });

    const { pathname } = req.nextUrl;

    // Redirect to the sign-in page if the user is not authenticated and trying to access '/inicio' or other protected routes
    if (!token && (pathname === '/inicio' || pathname.startsWith('/inicio/'))) {
        return NextResponse.redirect(new URL('/ingreso', req.url));
    }

    return NextResponse.next();
}

// Define which paths this middleware should be applied to
export const config = {
    matcher: [
      '/inicio',
      '/inicio/:path*',
    ], 
};