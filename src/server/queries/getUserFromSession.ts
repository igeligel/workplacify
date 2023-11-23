import { Session } from "next-auth";

import { prisma } from "../prisma";
import { ErrorUserNotExisting } from "./ErrorUserNotExisting";

type GetUserFromSessionOptions = {
  includeOrganization?: boolean;
};

export const getUserFromSession = async (
  session: Session | null,
  options: GetUserFromSessionOptions,
) => {
  const user = session?.user;
  if (!user?.id) {
    throw new ErrorUserNotExisting();
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      organization: Boolean(options.includeOrganization),
    },
  });

  if (!dbUser) {
    throw new ErrorUserNotExisting();
  }

  return dbUser;
};
