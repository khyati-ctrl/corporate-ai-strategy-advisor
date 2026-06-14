import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Mock Enterprise Login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "executive@company.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Mock authorization
        if (credentials?.email && credentials.password) {
          return {
            id: "1",
            name: "Enterprise User",
            email: credentials.email,
          };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        // In a real app we would assign the database User ID here
        // session.user.id = token.sub;
      }
      return session;
    }
  },
  pages: {
    // Optionally we could define custom pages here
    // signIn: '/login'
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
