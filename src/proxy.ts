import { auth0 } from "./lib/auth0";
import { NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  console.log("PROXY INTERCEPTED:", request.nextUrl.pathname);
  const response = await auth0.middleware(request);
  console.log("RESPONSE FROM AUTH0:", response.status, response.headers.get("Location"));
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
