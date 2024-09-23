import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Configure NextAuth
const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
  callbacks: {
    async session({ session, token }: any) {
      // Fetch the user subscription status from Supabase
      const { data } = await supabase
        .from("users")
        .select("subscription_status")
        .eq("email", session.user?.email)
        .single();

      // Attach subscription status to session
      session.user.subscriptionStatus = data?.subscription_status;

      return session;
    },
  },
});

// Export GET and POST methods for handling requests
export { handler as GET, handler as POST };
