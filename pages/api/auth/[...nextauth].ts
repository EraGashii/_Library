import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongo } from "lib/mongodb";
import User from "models/user";
import bcrypt from "bcryptjs";
import { DefaultUser } from "next-auth";

interface ExtendedUser extends DefaultUser {
  role?: string;
}
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectMongo();
        const user = await User.findOne({ email: credentials?.email });
        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user",
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google" || account?.provider === "facebook") {
          await connectMongo();
          let existingUser = await User.findOne({ email: user.email });
    
          if (!existingUser) {
            existingUser = await User.create({
              name: user.name,
              email: user.email,
              role: "user", // default role
              provider: account.provider,
            });
          }
    
          // 👇 this is the key: make sure it's attached to the user object
      (user as ExtendedUser).role = existingUser.role || "user";

        }
    
        return true;
      } catch (error) {
        console.error("SignIn Error:", error);
        return false;
      }
    },
    
    
    async jwt({ token, user }) {
      await connectMongo();
    
      if (user) {
        const existingUser = await User.findOne({ email: user.email });
        token.role = existingUser?.role || "user";
      } else {
        const existingUser = await User.findOne({ email: token.email });
        token.role = existingUser?.role || "user";
      }
    
      return token;
    }
,    
    
async session({ session, token }) {
  session.user = {
    ...session.user,
    role: token.role || "user",
  };
  return session;
},

    

    // No token here — keep it simple
    // async redirect({ baseUrl }) {
    //   return baseUrl;
    // }
    
    
  }
};

export default NextAuth(authOptions);
