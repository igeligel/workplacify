import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
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

const adapter = PrismaAdapter(prisma);

export const nextAuthOptions: AuthOptions = {
  adapter,
  providers: [...(isGoogleAuthProviderConfigured ? [googleProvider] : [])],
  callbacks: {
    session: (props) => {
      return {
        ...props.session,
        user: {
          id: props.user.id,
          ...props.session.user,
        },
      };
    },
  },
};
export default NextAuth(nextAuthOptions);
