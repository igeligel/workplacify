/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from "../trpc";
import { cloudinaryRouter } from "./cloudinary";
import { discordRouter } from "./discord";
import { floorRouter } from "./floor";
import { floorDeskRouter } from "./floorDesk";
import { officeRouter } from "./office";
import { officeSettingRouter } from "./officeSetting";
import { onboardingSelectionRouter } from "./onboardingSelection";
import { organizationRouter } from "./organization";
import { scheduleRouter } from "./schedule";
import { userRouter } from "./user";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "yay!"),
  office: officeRouter,
  onboardingSelection: onboardingSelectionRouter,
  cloudinary: cloudinaryRouter,
  floor: floorRouter,
  organization: organizationRouter,
  user: userRouter,
  schedule: scheduleRouter,
  discord: discordRouter,
  floorDesk: floorDeskRouter,
  officeSetting: officeSettingRouter,
});

export type AppRouter = typeof appRouter;
