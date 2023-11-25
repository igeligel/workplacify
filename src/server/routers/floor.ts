import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "../prisma";
import { getUserFromSession } from "../queries/getUserFromSession";
import { publicProcedure, router } from "../trpc";

export const floorRouter = router({
  createFloor: publicProcedure
    .input(
      z.object({
        officeId: z.string(),
        name: z.string(),
        description: z.string(),
        desks: z.array(
          z.object({
            name: z.string().optional(),
            publicDeskId: z.string(),
            description: z.string().optional(),
            x: z.number(),
            y: z.number(),
          }),
        ),
        imageUrl: z.string().optional(),
      }),
    )
    .mutation(async (resolverProps) => {
      const { ctx } = resolverProps;
      const { officeId, name, description, desks } = resolverProps.input;

      const user = await getUserFromSession(ctx.session, {
        includeOrganization: true,
      });
      if (!user.organization) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong, the administrator has been notified.",
        });
      }

      const floor = await prisma.floor.create({
        data: {
          name: name,
          description: description,
          office: {
            connect: {
              id: officeId,
            },
          },
        },
      });
      const mappedDesks = desks.map((desk) => {
        return {
          name: desk.name,
          publicDeskId: desk.publicDeskId,
          description: desk.description,
          x: desk.x,
          y: desk.y,
          floorId: floor.id,
        };
      });
      await prisma.desk.createMany({
        data: mappedDesks,
      });
      const createdFloor = await prisma.floor.findFirst({
        where: {
          id: floor.id,
        },
        include: {
          desks: true,
        },
      });
      return createdFloor;
    }),
  getFloor: publicProcedure.query(async (resolverProps) => {
    const { ctx } = resolverProps;

    await getUserFromSession(ctx.session, {
      includeOrganization: true,
    });

    return null;
  }),
});
