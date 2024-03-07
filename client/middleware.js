import { NextResponse } from 'next/server'
 
//
//  This is the middleware code, it can be run when requests are made
//  Responsibilities:
//  - Verify permissions of user before allowing access to a page
//

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about/:path*',
}