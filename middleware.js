import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";

  // extract hostname (no port)
  const hostname = host.split(":")[0]; // e.g., "drjohn.mostasoft.com" or "drjohn.localhost"
  const subdomain = hostname.split(".")[0]; // "drjohn"

  // allow main domain and localhost without rewrite
  if (
    hostname === "localhost" ||
    hostname === "mostasoft.com" ||
    subdomain === "www"
  ) {
    return NextResponse.next();
  }

  // ✅ handle subdomains for both local and production
  if (subdomain && subdomain !== "localhost") {
    // e.g. rewrite "/dashboard" → "/drjohn/dashboard"
    url.pathname = `/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// ✅ Matcher: handle everything except static assets & API routes
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
