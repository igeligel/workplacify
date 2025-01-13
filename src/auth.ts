import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import { providers } from "./providers";
import { prisma } from "./server/prisma";

const adapter = PrismaAdapter(prisma);

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter,
  redirectProxyUrl: process.env.AUTH_URL,
  providers,
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
  debug: true,
  // Theme {
  //   colorScheme?: "auto" | "dark" | "light"
  //   logo?: string
  //   brandColor?: string
  //   buttonText?: string
  // }
  // skipCSRFCheck
  // AUTH_REDIRECT_PROXY_URL environment variable
});
