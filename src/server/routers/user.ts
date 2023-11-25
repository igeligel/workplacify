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
});
