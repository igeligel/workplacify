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
  getMembers: publicProcedure.query(async (resolverProps) => {
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
    const members = await prisma.user.findMany({
      where: {
        organizationId: user.organizationId,
      },
    });
    return members;
  }),
  changeUserRole: publicProcedure
    .input(
      z.object({
        type: z.enum(["PROMOTE_TO_ADMIN", "DEMOTE_FROM_ADMIN"]),
        userId: z.string(),
      }),
    )
    .mutation(async (resolverProps) => {
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
      // Check if user exists and is in org
      const { type, userId } = resolverProps.input;
      const targetUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!targetUser || targetUser.organizationId !== user.organizationId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      if (type === "PROMOTE_TO_ADMIN") {
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            userRole: "ADMIN",
          },
        });
        return;
      }

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          userRole: "MEMBER",
        },
      });
    }),
});
