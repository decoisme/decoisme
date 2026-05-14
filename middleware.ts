import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin dashboard routes
  if (pathname.startsWith('/admin/dashboard')) {
    const adminAuth = request.cookies.get('admin_authenticated');
    
    // If not authenticated, redirect to login
    if (!adminAuth || adminAuth.value !== 'true') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
