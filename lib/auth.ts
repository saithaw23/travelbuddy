import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // TODO: Replace with actual database lookup
        // This is a mock implementation
        if (credentials.email === "demo@travelbuddy.com" && credentials.password === "demo123") {
          return {
            id: "1",
            name: "Demo User",
            email: "demo@travelbuddy.com",
            image: null,
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
  },
})
