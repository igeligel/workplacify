import { User } from "@prisma/client";
import { GetServerSidePropsContext, Redirect } from "next";
import { Session } from "next-auth";

import { auth } from "../../../auth";
import { getUserFromSession } from "../queries/getUserFromSession";

type AppAuthRedirectProps = {
  context: GetServerSidePropsContext;
  shouldRedirectToSetup?: boolean;
};

type AppAuthRedirectReturnType = {
  redirect?: Redirect;
  session?: Session;
};

export const appAuthRedirect = async (
  props: AppAuthRedirectProps,
): Promise<AppAuthRedirectReturnType> => {
  const { context, shouldRedirectToSetup = true } = props;
  // @ts-expect-error Types are not matching.
  const session = await auth(context.req, context.res);
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  let user: User | null = null;

  try {
    user = await getUserFromSession(session, {});
  } catch (error) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  if (shouldRedirectToSetup && !user.organizationId) {
    return {
      redirect: {
        destination: "/app/setup",
        permanent: false,
      },
    };
  }
  return {
    session,
  };
};
