import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/analysis/:path*", "/history/:path*", "/reports/:path*", "/recommendations/:path*", "/analytics/:path*"],
};
