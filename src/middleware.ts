import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const authPage = createRouteMatcher(["/auth(.*)"]);
const protectedRoute = createRouteMatcher([
  "/home(.*)",
  "/profile(.*)",
  "/wish(.*)",
  "/feature(.*)",
  "/profile(.*)",
  "/reserved(.*)",
]);

export default convexAuthNextjsMiddleware(
  async (request, { convexAuth }) => {
    if (authPage(request) && (await convexAuth.isAuthenticated())) {
      return nextjsMiddlewareRedirect(request, "/home");
    }
    if (protectedRoute(request) && !(await convexAuth.isAuthenticated())) {
      return nextjsMiddlewareRedirect(request, "/auth");
    }
  },
  {
    cookieConfig: { maxAge: 60 * 60 * 24 * 30 },
  },
);

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
