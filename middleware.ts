import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware function to check for token and redirect if missing
export function middleware(request: NextRequest) {
    // Test with a dummy token
    const token = 1;
    
    console.log("Middleware running..."); // Check if this logs when visiting the path

    // Redirect if token is 1 (as a test case)
    if (token === 1) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Allow the request to continue if token is not 1
    return NextResponse.next();
}

// Configure paths where middleware should apply
// export const config = {
//     matcher: ['/profile', '/profile/:path*'], // Match `/profile` and sub-paths
// };
export const config = {
    matcher: ['/profile', '/profile/:path*'],
};
