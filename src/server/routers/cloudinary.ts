import { TRPCError } from "@trpc/server";

import { cloudinary } from "../cloudinary";
import { getUserFromSession } from "../queries/getUserFromSession";
import { publicProcedure, router } from "../trpc";

export const cloudinaryRouter = router({
  getSignature: publicProcedure.query(async (resolverProps) => {
    const { ctx } = resolverProps;

    await getUserFromSession(ctx.session, {
      includeOrganization: true,
    });

    const unparsedCloudinaryApiKey = process.env.CLOUDINARY_API_SECRET;

    if (typeof unparsedCloudinaryApiKey !== "string") {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong, the administrator has been notified.",
      });
    }
    const timestamp = Math.round(new Date().getTime() / 1000);
    const params = {
      timestamp: timestamp,
      source: "uw",
      folder: "signed_upload_floor_plans_uw",
    };
    const signature = cloudinary.utils.api_sign_request(
      params,
      unparsedCloudinaryApiKey,
    );
    return {
      timestamp,
      signature,
    };
  }),
});
