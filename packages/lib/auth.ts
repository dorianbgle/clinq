import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
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
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/auth/signin",
      error: "/auth/error",  // Redirect to custom error page
    },
    callbacks: {
      async redirect({ url, baseUrl }: any) {
        // Redirect user to the callback URL or error page
        if (url.startsWith(baseUrl)) return url;
        return baseUrl;
      },
    },
    debug: true,
  };
  