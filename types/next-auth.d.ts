import { DefaultSession } from "next-auth";

interface ExtendedUser {
  id?: string | null;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user: ExtendedUser & DefaultSession["user"];
  }
}
