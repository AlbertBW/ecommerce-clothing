import { auth } from "@/auth";

const allowedRoutes = ["/", "/test", "/error", "/login", "/logout", "/result"];

export default auth((req) => {
  if (!req.auth && !allowedRoutes.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/api/auth/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
