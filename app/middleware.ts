import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token, redirect to sign-in page
  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // If user is not subscribed, redirect to the subscription page
  if (token.subscriptionStatus !== 'active') {
    return NextResponse.redirect(new URL('/subscribe', req.url));
  }

  // Allow the request to continue if user is subscribed
  return NextResponse.next();
}

export const config = {
  matcher: ['/protected/:path*'], // Apply middleware to specific protected routes
};
