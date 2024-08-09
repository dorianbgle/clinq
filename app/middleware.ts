// Middleware for Clerk JS. 

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) auth().protect();
});

const isPublicRoute = createRouteMatcher(['/signin(.*)', '/signup(.*)']);

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)'
])

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
