import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - /auth/* (authentication pages)
     * - /api/auth/* (auth API routes)
     * - /_next/* (Next.js internals)
     * - /favicon.ico, /robots.txt (static files)
     */
    "/((?!auth|api/auth|_next|favicon.ico|robots.txt).*)",
  ],
};
