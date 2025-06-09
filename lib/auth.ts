import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { verifyPassword } from "./utils";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("Missing credentials");

        await connectDB();

        const existingUser = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!existingUser) throw new Error("Wrong Email");

        const isValid = await verifyPassword(
          credentials.password,
          existingUser.passwordHash,
        );

        if (!isValid) throw new Error("Wrong Password");
        return existingUser;
      },
    }),
  ],
};
