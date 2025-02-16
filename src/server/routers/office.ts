import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "../../server/prisma";
import { getUserFromSession } from "../queries/getUserFromSession";
import { publicProcedure, router } from "../trpc";

export const officeRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async (resolverProps) => {
      const { ctx, input } = resolverProps;
      const user = await getUserFromSession(ctx.session, {
        includeOrganization: true,
      });
      const office = await prisma.office.findFirst({
        where: {
          id: input.id,
          organizationId: user.organizationId,
        },
      });
      return office;
    }),
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
          floors: {
            include: {
              desks: true,
            },
          },
        },
      });
      return office;
    }),
  list: publicProcedure.query(async (resolverProps) => {
    const { ctx } = resolverProps;
    const user = await getUserFromSession(ctx.session, {
      includeOrganization: true,
    });

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
        timezone: z.string(),
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
          timezone: input.timezone,
        },
      });
      return office;
    }),
  remove: publicProcedure
    .input(z.object({ id: z.string() }))
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
      const office = await prisma.office.findFirst({
        where: {
          id: input.id,
          organizationId: user.organizationId,
        },
      });

      if (!office) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Office not found",
        });
      }

      // Remove all schedules
      await prisma.deskSchedule.deleteMany({
        where: {
          desk: {
            floor: {
              officeId: office.id,
            },
          },
        },
      });

      // Remove all floors
      await prisma.floor.deleteMany({
        where: {
          officeId: office.id,
        },
      });

      // Remove office
      await prisma.office.delete({
        where: {
          id: office.id,
        },
      });
    }),
});
