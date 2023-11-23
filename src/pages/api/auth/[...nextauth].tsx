import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "../../../server/prisma";

const isGoogleAuthProviderConfigured = Boolean(
  typeof process.env.GOOGLE_CLIENT_ID === "string" &&
    typeof process.env.GOOGLE_CLIENT_SECRET === "string",
);

const googleProvider = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
});

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [...(isGoogleAuthProviderConfigured ? [googleProvider] : [])],
};
export default NextAuth(authOptions);
