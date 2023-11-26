import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "../prisma";
import { getUserFromSession } from "../queries/getUserFromSession";
import { publicProcedure, router } from "../trpc";

export const userRouter = router({
  get: publicProcedure.query(async (resolverProps) => {
    const { ctx } = resolverProps;
    const user = await getUserFromSession(ctx.session, {
      includeOrganization: false,
    });

    return user;
  }),
  selectCurrentOffice: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async (resolverProps) => {
      const { ctx, input } = resolverProps;
      const user = await getUserFromSession(ctx.session, {
        includeOrganization: false,
      });
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
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          currentOfficeId: office.id,
        },
      });
      return office;
    }),
});
