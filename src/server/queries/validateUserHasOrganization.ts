import { TRPCError } from "@trpc/server";

import { prisma } from "../prisma";
import { getUserFromSession } from "./getUserFromSession";

export const validateUserHasOrganization = async (
  user: Awaited<ReturnType<typeof getUserFromSession>>,
) => {
  if (!user.organizationId) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "You are not part of an organization",
    });
  }

  await prisma.organization.findFirst({
    where: {
      id: user.organizationId,
    },
  });
};
