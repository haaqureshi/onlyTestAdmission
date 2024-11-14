import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};

export async function middleware(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: { session }, error } = await supabase.auth.getSession();

  // Paths that don't require authentication
  const publicPaths = ['/login', '/auth/callback'];
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path));

  // If user is not authenticated and trying to access protected route
  if (!session && !isPublicPath) {
    const redirectUrl = new URL('/login', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // If user is authenticated but doesn't have the correct domain
  if (session?.user?.email && !session.user.email.endsWith('@bsolpk.org') && !isPublicPath) {
    await supabase.auth.signOut();
    const redirectUrl = new URL('/login?error=domain', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // If user is authenticated and trying to access login page
  if (session && request.nextUrl.pathname === '/login') {
    const redirectUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}