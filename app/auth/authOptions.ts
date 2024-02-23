import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "../validationSchema";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "john.doe@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials || Object.keys(credentials).length === 0) {
          console.error("All fields are required");
          return null;
        }

        const validation = loginSchema.safeParse(credentials);
        if (!validation.success) {
          console.error("Validation failed", validation.error.format());
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          console.error("No user found");
          return null;
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isPasswordCorrect) {
          console.error("Password is incorrect");
          return null;
        }

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export default authOptions;
