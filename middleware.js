import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";
  const hostname = host.split(":")[0];
  const subdomain = hostname.split(".")[0];

  if (hostname === "localhost" || ["www", "mostasoft"].includes(subdomain)) {
    return NextResponse.next();
  }

  if (subdomain && subdomain !== "localhost") {
    url.pathname = `/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
