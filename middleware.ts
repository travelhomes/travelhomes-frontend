import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the path of the request
  const path = request.nextUrl.pathname

  // Define protected routes (any path starting with /vendor)
  const isProtectedRoute = path.startsWith('/vendor')

  // Get the token from cookies
  const token = request.cookies.get('token')?.value

  // If trying to access a protected route and not authenticated
  if (isProtectedRoute && !token) {
    // Create the URL for the login page with a redirect parameter
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', path)
    
    // Redirect to login
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// Configure which routes the middleware should run on
export const config = {
  matcher: '/vendor/:path*'
} 