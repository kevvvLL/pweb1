import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from './lib/auth';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect /blog/admin routes
    if (pathname.startsWith('/blog/admin')) {
        const token = request.cookies.get('session')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/blog/login', request.url));
        }

        const session = await verifySession(token);

        if (!session || !session.isAuthenticated) {
            return NextResponse.redirect(new URL('/blog/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/blog/admin/:path*'],
};
