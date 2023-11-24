import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "../../server/prisma";
import { getUserFromSession } from "../queries/getUserFromSession";
import { publicProcedure, router } from "../trpc";

export const officeRouter = router({
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async (resolverProps) => {
      const { ctx, input } = resolverProps;
      const user = await getUserFromSession(ctx.session, {
        includeOrganization: true,
      });
      if (user.userRole !== "ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to access this resource",
        });
      }
      const office = await prisma.office.findFirst({
        where: {
          id: input.id,
          organizationId: user.organizationId,
        },
        include: {
          floors: true,
        },
      });
      return office;
    }),
  list: publicProcedure.query(async (resolverProps) => {
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
    const offices = await prisma.office.findMany({
      where: {
        organizationId: user.organizationId,
      },
    });
    return offices;
  }),
  add: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
      }),
    )
    .mutation(async (resolverProps) => {
      const { ctx, input } = resolverProps;
      const user = await getUserFromSession(ctx.session, {
        includeOrganization: true,
      });
      if (user.userRole !== "ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to access this resource",
        });
      }
      const office = await prisma.office.create({
        data: {
          name: input.name,
          description: input.description,
          organizationId: user.organizationId,
        },
      });
      return office;
    }),
});
