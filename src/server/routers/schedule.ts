import { TRPCError } from "@trpc/server";
import { addDays, addHours, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { z } from "zod";

import { prisma } from "../../server/prisma";
import { getUserFromSession } from "../queries/getUserFromSession";
import { getFreeDesksPerDay } from "../scheduling/getFreeDesksPerDay";
import { publicProcedure, router } from "../trpc";

export const scheduleRouter = router({
  getDeskSchedulesForDay: publicProcedure
    .input(z.object({ day: z.string() }))
    .query(async (resolverProps) => {
      const { ctx } = resolverProps;
      const user = await getUserFromSession(ctx.session, {
        includeOrganization: true,
      });

      if (!user.organizationId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "You are not part of an organization",
        });
      }

      await prisma.organization.findFirst({
        where: {
          id: user.organizationId,
        },
      });

      if (!user.currentOfficeId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "You are not part of an office. Select an office first.",
        });
      }

      const usersOffice = await prisma.office.findFirst({
        where: {
          id: user.currentOfficeId,
        },
      });

      const floors = await prisma.floor.findMany({
        where: {
          officeId: user.currentOfficeId,
        },
      });

      const desksInCurrentOffice = await prisma.desk.findMany({
        where: {
          floorId: {
            in: floors.map((floor) => floor.id),
          },
        },
      });
      const queriedDate = parseISO(resolverProps.input.day);
      // UTC
      const zonedDate = utcToZonedTime(
        queriedDate,
        usersOffice?.timezone || "UTC",
      );
      console.log({ timezone: usersOffice?.timezone, zonedDate });

      const deskSchedules = await prisma.deskSchedule.findMany({
        where: {
          deskId: {
            in: desksInCurrentOffice.map((desk) => desk.id),
          },
        },
      });

      const hoursAdded24 = addHours(zonedDate, 24);

      const deskSchdulesMapped = getFreeDesksPerDay({
        deskSchedules: deskSchedules,
        desksInCurrentOffice: desksInCurrentOffice,
        // Because of time zone differences we include start and end here
        startingTime: zonedDate,
        endTime: hoursAdded24,
      });

      return {
        deskSchedules: deskSchedules,
        desksInCurrentOffice: desksInCurrentOffice,
        deskSchdulesMapped,
      };
    }),
});
