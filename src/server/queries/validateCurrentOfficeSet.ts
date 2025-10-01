import { TRPCError } from "@trpc/server";

import { getUserFromSession } from "./getUserFromSession";

export const validateCurrentOfficeSet = async (
  user: Awaited<ReturnType<typeof getUserFromSession>>,
) => {
  if (!user.currentOfficeId) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "You are not part of an office. Select an office first.",
    });
  }
};
