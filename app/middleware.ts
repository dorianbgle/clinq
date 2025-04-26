import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  if (token.subscriptionStatus !== 'active') {
    return NextResponse.redirect(new URL('/subscribe', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/protected/:path*'], 
};
