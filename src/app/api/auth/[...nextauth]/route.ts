import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

// Whitelist of allowed GitHub usernames
// Add client GitHub usernames here
const ALLOWED_USERS = [
  "mk-162",
  "clawbot162-droid",
  // Add more client usernames as needed
];

const handler = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "read:user repo",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if user is in whitelist
      const githubUsername = (profile as { login?: string })?.login;
      
      if (!githubUsername) {
        return false;
      }
      
      // Allow if in whitelist or if whitelist is empty (dev mode)
      if (ALLOWED_USERS.length === 0 || ALLOWED_USERS.includes(githubUsername)) {
        return true;
      }
      
      console.log(`Access denied for: ${githubUsername}`);
      return false;
    },
    async jwt({ token, account, profile }) {
      // Save GitHub access token and username
      if (account) {
        token.accessToken = account.access_token;
        token.githubUsername = (profile as { login?: string })?.login;
      }
      return token;
    },
    async session({ session, token }) {
      // Make access token and username available in session
      return {
        ...session,
        accessToken: token.accessToken,
        user: {
          ...session.user,
          githubUsername: token.githubUsername,
        },
      };
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
});

export { handler as GET, handler as POST };
