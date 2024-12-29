import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { prisma } from "./src/server/prisma";

const isGoogleAuthProviderConfigured = Boolean(
  typeof process.env.GOOGLE_CLIENT_ID === "string" &&
    typeof process.env.GOOGLE_CLIENT_SECRET === "string",
);

const googleProvider = Google({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
});

const adapter = PrismaAdapter(prisma);

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter,
  providers: [...(isGoogleAuthProviderConfigured ? [googleProvider] : [])],
  callbacks: {
    session: (props) => {
      return {
        ...props.session,
        user: {
          ...props.session.user,
          id: props.user.id,
        },
      };
    },
  },
});
