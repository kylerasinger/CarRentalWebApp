import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./lib/mongodb"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    // ...add more providers here, add google as its the most  popular
  ],
  database: process.env.MONGODB_URI,
}

export default NextAuth({
    ...authOptions, // Spread the authOptions object
    adapter: MongoDBAdapter(clientPromise), // Pass the clientPromise directly to MongoDBAdapter
    callbacks: {
        async session({ session, user }) {
            console.log("session", session, "user", user)
          // Add the user's role to the session object
          session.user.role = user.role ?? "customer";
          return session;
        },
        async createUser(user) {
            console.log("createUser", user)
          // Here, you modify the user object to include the role
          // No need to manually insert the user into the database; NextAuth and the adapter handle it
          user.role = "customer";
          return user;
        }
    },
})
  