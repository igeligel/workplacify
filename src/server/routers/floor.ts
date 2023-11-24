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
      }),
    )
    .mutation(async (resolverProps) => {
      const { ctx } = resolverProps;
      const { officeId } = resolverProps.input;

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
          name: "Floor 1",
          description: "First Floor",
          office: {
            connect: {
              id: officeId,
            },
          },
        },
      });
      await prisma.desk.createMany({
        data: [
          {
            name: "Desk 1",
            publicDeskId: "desk-1",
            description: "First Desk",
            x: 0.0,
            y: 0.0,
            floorId: floor.id,
          },
        ],
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
