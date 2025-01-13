import * as trpcNext from "@trpc/server/adapters/next";
import { Session } from "next-auth";

import { auth } from "../auth";

// import { Session, auth } from "next-auth";

// import { nextAuthOptions } from "../pages/api/auth/[...nextauth]";

interface CreateContextOptions {
  session: Session | null;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(_opts: CreateContextOptions) {
  return {
    session: _opts.session,
  };
}

export type Context = Awaited<ReturnType<typeof createContextInner>>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(
  opts: trpcNext.CreateNextContextOptions,
): Promise<Context> {
  // for API-response caching see https://trpc.io/docs/caching
  const session = await auth(opts.req, opts.res);

  return await createContextInner({ session });
}
