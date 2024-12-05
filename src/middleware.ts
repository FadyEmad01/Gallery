import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the auth_token from cookies
  const token = request.cookies.get('auth_token')?.value

  // Log for debugging (these logs appear in the server console)
  console.log('Middleware running for path:', request.nextUrl.pathname)
  console.log('Token found:', !!token)

  // If there's no token, redirect to the login page
  if (!token) {
    // Make sure to use the full URL for the redirect
    const loginUrl = new URL('/auth/login', request.url)
    
    // Add the current path as a "next" parameter so we can redirect back after login
    loginUrl.searchParams.set('next', request.nextUrl.pathname)
    
    return NextResponse.redirect(loginUrl)
  }

  // Allow the request to continue if there's a token
  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Match all paths under /profile
    '/profile/:path*',
    '/user/:path*',
    '/post/:path*',
    // Add other protected routes here
    // '/dashboard/:path*',
    // Exclude authentication-related paths and API routes
    // '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ]
}

