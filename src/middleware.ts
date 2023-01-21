import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Shopify from "~/lib/shopify";

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  const host = headers.get("host");
  Shopify.config.hostName = Shopify.config.hostName || host || ""; // Define hostName if it has not already been configured
  return NextResponse.next();
}

export const config = {
  matcher: "/api/auth/shopify/:path*",
};
