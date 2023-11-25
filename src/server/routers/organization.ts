import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "../../server/prisma";
import { getUserFromSession } from "../queries/getUserFromSession";
import { publicProcedure, router } from "../trpc";

export const organizationRouter = router({
  get: publicProcedure.query(async (resolverProps) => {
    const { ctx } = resolverProps;
    const user = await getUserFromSession(ctx.session, {
      includeOrganization: true,
    });
    if (user.userRole !== "ADMIN") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You are not allowed to access this resource",
      });
    }
    if (!user.organizationId) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "You are not part of an organization",
      });
    }
    const organization = await prisma.organization.findFirst({
      where: {
        id: user.organizationId,
      },
    });
    return organization;
  }),
});
