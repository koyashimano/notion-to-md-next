import { prisma } from "@/db";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: "/login",
    newUser: "/sign_up",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("認証に失敗しました。");
        }

        const { email, password } = credentials;
        const user = await prisma.user.findUnique({ where: { email } });
        if (user) {
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return user;
          }
        }

        throw new Error("認証に失敗しました。");
      },
    }),
  ],
});

export { handler as GET, handler as POST };
