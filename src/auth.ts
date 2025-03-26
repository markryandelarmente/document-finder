import { AuthOptions, getServerSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
import { compare } from "bcrypt";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
    // Configure one or more authentication providers
  providers: [
      Credentials({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const {email, password}: any = credentials

          const user = await prisma.user.findFirst({
            where: {
              email: email
            }
          })

          console.log(user, "user");

          if(!user) {
            return null
          }

          const validatePassword = await compare(password || "", user.password)

          if (user && validatePassword) {
            return user
          } else {
            return null
          }
        }
      })
  ],
  session: {
    strategy: "jwt",
  },
}

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }