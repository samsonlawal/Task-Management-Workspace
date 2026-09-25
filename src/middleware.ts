import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

const { pathname } = request.nextUrl

const token = request.cookies.get("token")?.value;

const isAuthRoute = pathname.startsWith("/auth");
const isProtectedRoute = pathname.startsWith("/workspaces") || (!isAuthRoute && pathname !== "/" && pathname.split("/").length > 1);


if (isProtectedRoute && !token && !isAuthRoute) {
    const signInUrl = new URL("/auth/sign-in", request.url);
    signInUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(signInUrl);
}

if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/workspaces", request.url));
}

return NextResponse.next();
}
export const config = {
    matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    ],

};
