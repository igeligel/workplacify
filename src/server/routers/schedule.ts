import { TRPCError } from "@trpc/server";
import { addHours, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { z } from "zod";

import { prisma } from "../../server/prisma";
import { getUserFromSession } from "../queries/getUserFromSession";
import { validateCurrentOfficeSet } from "../queries/validateCurrentOfficeSet";
import { validateUserHasOrganization } from "../queries/validateUserHasOrganization";
import { getFreeDesksPerDay } from "../scheduling/getFreeDesksPerDay";
import { getHasConflictingReservation } from "../scheduling/getHasConflictingReservations";
import { publicProcedure, router } from "../trpc";

export const scheduleRouter = router({
  getFloorsForCurrentOffice: publicProcedure
    .input(z.object({}))
    .query(async (resolverProps) => {
      const { ctx } = resolverProps;
      const user = await getUserFromSession(ctx.session, {
        includeOrganization: true,
      });
      await validateUserHasOrganization(user);
      await validateCurrentOfficeSet(user);

      const floors = await prisma.floor.findMany({
        where: {
          officeId: user.currentOfficeId,
          office: {
            organizationId: user.organizationId,
          },
        },
      });

      return floors;
    }),
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
        include: {
          floor: true,
        },
      });
      const queriedDate = parseISO(resolverProps.input.day);
      const timeZone = usersOffice?.timezone || "UTC";
      // UTC
      const zonedDate = toZonedTime(queriedDate, timeZone);

      const deskSchedules = await prisma.deskSchedule.findMany({
        where: {
          deskId: {
            in: desksInCurrentOffice.map((desk) => desk.id),
          },
        },
        include: {
          desk: {
            include: {
              floor: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
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
  bookDeskForDay: publicProcedure
    .input(
      z.object({
        day: z.string(),
        deskId: z.string(),
      }),
    )
    .mutation(async (resolverProps) => {
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
          organizationId: user.organizationId,
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
        include: {
          floor: true,
        },
      });
      const queriedDate = parseISO(resolverProps.input.day);
      const timeZone = usersOffice?.timezone || "UTC";
      const zonedDate = toZonedTime(queriedDate, timeZone);

      const deskSchedules = await prisma.deskSchedule.findMany({
        where: {
          deskId: {
            in: desksInCurrentOffice.map((desk) => desk.id),
          },
        },
        include: {
          desk: {
            include: {
              floor: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });
      // Check if user has already booked a desk for this day
      const userHasBookedDesk = getHasConflictingReservation(
        zonedDate,
        user.id,
        deskSchedules,
      );
      if (userHasBookedDesk) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "You have already booked a desk for this day",
        });
      }

      const hoursAdded24 = addHours(zonedDate, 24);

      const deskSchdulesMapped = getFreeDesksPerDay({
        deskSchedules: deskSchedules,
        desksInCurrentOffice: desksInCurrentOffice,
        // Because of time zone differences we include start and end here
        startingTime: zonedDate,
        endTime: hoursAdded24,
      });

      const deskToBeScheduled = deskSchdulesMapped[resolverProps.input.deskId];
      if (!deskToBeScheduled) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Desk not found",
        });
      }

      if (!deskToBeScheduled.wholeDayFree) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Desk not free for whole day",
        });
      }

      const deskSchedule = await prisma.deskSchedule.create({
        data: {
          deskId: resolverProps.input.deskId,
          userId: user.id,
          startTime: zonedDate,
          endTime: hoursAdded24,
          date: zonedDate,
          wholeDay: true,
        },
      });

      return deskSchedule;
    }),
  cancelDeskForDay: publicProcedure
    .input(z.object({ deskScheduleId: z.string(), day: z.string() }))
    .mutation(async (resolverProps) => {
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
      const timeZone = usersOffice?.timezone || "UTC";
      const zonedDate = toZonedTime(queriedDate, timeZone);

      const deskSchedules = await prisma.deskSchedule.findMany({
        where: {
          id: resolverProps.input.deskScheduleId,
          deskId: {
            in: desksInCurrentOffice.map((desk) => desk.id),
          },
        },
      });
      // Check if user has already booked a desk for this day
      const userHasBookedDesk = getHasConflictingReservation(
        zonedDate,
        user.id,
        deskSchedules,
      );
      if (!userHasBookedDesk) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "You have not booked a desk for this day",
        });
      }

      await prisma.deskSchedule.delete({
        where: {
          id: resolverProps.input.deskScheduleId,
        },
      });
      return null;
    }),
});
