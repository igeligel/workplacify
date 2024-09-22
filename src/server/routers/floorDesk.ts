import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "../prisma";
import { getUserFromSession } from "../queries/getUserFromSession";
import { publicProcedure, router } from "../trpc";

export const floorDeskRouter = router({
  updateFloorDesk: publicProcedure
    .input(
      z.object({
        officeId: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        floorId: z.string(),
        deskId: z.string(),
      }),
    )
    .mutation(async (resolverProps) => {
      const { ctx } = resolverProps;
      const { deskId, floorId } = resolverProps.input;
      let organizationId: string | null = null;
      try {
        const user = await getUserFromSession(ctx.session, {
          includeOrganization: true,
        });
        if (!user.organizationId) {
          throw new Error("User has no organizationId");
        }
        organizationId = user.organizationId;
      } catch (error) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform this action",
        });
      }

      await prisma.desk.update({
        data: {
          name: resolverProps.input.name,
          description: resolverProps.input.description,
        },
        where: {
          id: deskId,
          floorId,
          floor: {
            office: {
              organizationId,
            },
          },
        },
      });
      const desk = await prisma.desk.findFirst({
        where: {
          id: deskId,
        },
      });
      return desk;
    }),
});
