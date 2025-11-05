import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.clone();
  const host = req.headers.get('host') || '';

  // remove ports for production
  const hostname = host.split(':')[0];
  const subdomain = hostname.split('.')[0];

  // Skip if main domain
  if (['www', 'mostasoft'].includes(subdomain)) {
    return NextResponse.next();
  }

  // Redirect dynamic subdomain
  if (subdomain && subdomain !== 'localhost') {
    url.pathname = `/${subdomain}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
