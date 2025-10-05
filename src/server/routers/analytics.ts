import { UserRole } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  differenceInCalendarDays,
  differenceInDays,
  eachDayOfInterval,
  getDay,
  subDays,
} from "date-fns";
import { z } from "zod";

import { getDeskUtilizationForDateRange } from "../analytics/getDeskUtilization";
import { prisma } from "../prisma";
import { getUserFromSession } from "../queries/getUserFromSession";
import { publicProcedure, router } from "../trpc";

const commonInput = z.object({
  officeId: z.string(),
  startDatetime: z.date(),
  endDatetime: z.date(),
  includeWeekends: z.boolean(),
});

const weekDayMap: Record<number, string> = {
  0: "monday",
  1: "tuesday",
  2: "wednesday",
  3: "thursday",
  4: "friday",
  5: "saturday",
  6: "sunday",
};

export const analyticsRouter = router({
  getDateRangeOptions: publicProcedure.query(async (resolverProps) => {
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
    if (user.userRole !== UserRole.ADMIN) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You are not allowed to access this resource",
      });
    }
    return [
      { value: "weektodate" },
      { value: "last7days" },
      // { value: "monthtodate" },
      { value: "last28days" },
      { value: "last90days" },
      { value: "yeartodate" },
      { value: "last365days" },
    ];
  }),
  getOfficeOptions: publicProcedure.query(async (resolverProps) => {
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
    if (user.userRole !== UserRole.ADMIN) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You are not allowed to access this resource",
      });
    }
    const offices = await prisma.office.findMany({
      where: { organizationId: user.organizationId },
    });
    return offices;
  }),
  // getInsight: publicProcedure.query(async (resolverProps) => {}),
  getDeskUtilization: publicProcedure
    .input(commonInput)
    .query(async (resolverProps) => {
      const { ctx, input } = resolverProps;
      const user = await getUserFromSession(ctx.session, {
        includeOrganization: true,
      });
      if (!user.organizationId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "You are not part of an organization",
        });
      }
      if (user.userRole !== UserRole.ADMIN) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to access this resource",
        });
      }
      const { officeId, startDatetime, endDatetime, includeWeekends } = input;

      const differenceInDaysBetweenDates = Math.abs(
        differenceInDays(startDatetime, endDatetime),
      );
      const startDateTimePreviousPeriod = subDays(
        startDatetime,
        differenceInDaysBetweenDates,
      );
      const endDateTimePreviousPeriod = subDays(
        endDatetime,
        differenceInDaysBetweenDates,
      );

      const currentPeriod = await getDeskUtilizationForDateRange({
        officeId,
        startDatetime,
        endDatetime,
        user,
        includeWeekends,
      });

      const previousPeriod = await getDeskUtilizationForDateRange({
        officeId,
        startDatetime: startDateTimePreviousPeriod,
        endDatetime: endDateTimePreviousPeriod,
        user,
        includeWeekends,
      });

      const difference =
        currentPeriod.occupancyRate - previousPeriod.occupancyRate;

      return {
        currentPeriod,
        previousPeriod,
        difference: difference,
      };
    }),
  getPeakDay: publicProcedure
    .input(commonInput)
    .query(async (resolverProps) => {
      const { ctx, input } = resolverProps;
      const user = await getUserFromSession(ctx.session, {
        includeOrganization: true,
      });
      if (!user.organizationId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "You are not part of an organization",
        });
      }
      if (user.userRole !== UserRole.ADMIN) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to access this resource",
        });
      }
      const { officeId, startDatetime, endDatetime, includeWeekends } = input;
      const officeWithDeskSchedules = await prisma.office.findMany({
        where: {
          id: officeId,
          organizationId: user.organizationId,
        },
        include: {
          floors: {
            include: {
              desks: {
                include: {
                  deskSchedule: {
                    where: {
                      startTime: {
                        gte: startDatetime,
                      },
                      endTime: {
                        lte: endDatetime,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      const startTimes: { startTime: Date }[] = [];
      officeWithDeskSchedules.forEach((office) => {
        return office.floors.forEach((floor) => {
          return floor.desks.forEach((desk) => {
            return desk.deskSchedule.forEach((deskSchedule) => {
              if (!deskSchedule.startTime) return;
              startTimes.push({ startTime: deskSchedule.startTime });
            });
          });
        });
      });

      const initialValue: Record<string, number> = {
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
      };
      const statisticsPerDay = startTimes.reduce((acc, curr) => {
        const weekDay = getDay(curr.startTime);
        const weekDayName = weekDayMap[weekDay];
        if (!weekDayName) return acc;
        if (typeof acc[weekDayName] === "undefined") return acc;

        return {
          ...acc,
          [weekDayName]: acc[weekDayName] + 1,
        };
      }, initialValue);

      type InitialValuePeakDay = {
        day: string;
        value: number;
        utilization: number;
      };
      const initialValuePeakDay: InitialValuePeakDay = {
        day: "",
        value: 0.0,
        utilization: 0.0,
      };

      // To calculate the utilization we need to get a map and how often the day occurs within within the time range.
      const initialUtilizationWeekMap: Record<string, number> = {
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
      };
      // Create array of day from start to end
      const days = eachDayOfInterval({
        start: startDatetime,
        end: endDatetime,
        includeWeekends,
      });
      let amountOfDesks = 0;
      officeWithDeskSchedules.forEach((office) => {
        return office.floors.forEach((floor) => {
          return floor.desks.forEach(() => {
            amountOfDesks += 1;
          });
        });
      });

      days.forEach((day) => {
        const weekDay = getDay(day);
        const weekDayName = weekDayMap[weekDay];
        if (!weekDayName) return;
        if (typeof initialUtilizationWeekMap[weekDayName] === "undefined")
          return;
        initialUtilizationWeekMap[weekDayName]++;
      });

      const finalStatisticsPerDay = Object.entries(
        initialUtilizationWeekMap,
      ).map(([key, value]) => {
        return {
          day: key,
          amountOfDesks: value * amountOfDesks,
          utilizedRawNumber: statisticsPerDay[key] || 0,
          rawPercentage: (statisticsPerDay[key] || 0.0) / amountOfDesks,
        };
      });

      const peakDay = Object.entries(statisticsPerDay).reduce((acc, curr) => {
        if (curr[1] > acc.value)
          return {
            day: curr[0],
            value: curr[1],
            utilization:
              finalStatisticsPerDay.find((item) => item.day === curr[0])
                ?.rawPercentage || 0.0,
          };
        return acc;
      }, initialValuePeakDay);

      const result = {
        statisticsPerDay: finalStatisticsPerDay,
        peakDay: peakDay,
      };

      const differenceInDays = Math.abs(
        differenceInCalendarDays(startDatetime, endDatetime),
      );
      const adjustmentIdentifier = differenceInDays / 7;
      console.log({ differenceInDays, adjustmentIdentifier });

      const adjustedResult = {
        ...result,
        peakDay: {
          ...result.peakDay,
          utilization: result.peakDay.utilization / adjustmentIdentifier,
        },
      };

      return adjustedResult;
    }),
  getPeopleAnalytics: publicProcedure
    .input(commonInput)
    .query(async (resolverProps) => {
      const { ctx, input } = resolverProps;
      const user = await getUserFromSession(ctx.session, {
        includeOrganization: true,
      });
      if (!user.organizationId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "You are not part of an organization",
        });
      }
      if (user.userRole !== UserRole.ADMIN) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to access this resource",
        });
      }
      const { officeId, startDatetime, endDatetime } = input;

      // Get all users in the organization who have desk bookings in the specified office and date range
      const usersWithBookings = await prisma.user.findMany({
        where: {
          organizationId: user.organizationId,
          deskSchedule: {
            some: {
              desk: {
                floor: {
                  officeId: officeId,
                },
              },
              startTime: {
                gte: startDatetime,
              },
              endTime: {
                lte: endDatetime,
              },
            },
          },
        },
        include: {
          deskSchedule: {
            where: {
              desk: {
                floor: {
                  officeId: officeId,
                },
              },
              startTime: {
                gte: startDatetime,
              },
              endTime: {
                lte: endDatetime,
              },
            },
            orderBy: {
              startTime: "asc",
            },
          },
        },
      });

      // Calculate analytics for each user
      const peopleAnalytics = usersWithBookings.map((user) => {
        const totalBookings = user.deskSchedule.length;

        // Calculate average weekly visits
        const daysInRange = differenceInCalendarDays(
          endDatetime,
          startDatetime,
        );
        const weeksInRange = Math.max(1, daysInRange / 7);
        const avgWeeklyVisits = totalBookings / weeksInRange;

        // Find favorite day (most common day of week for bookings)
        const dayCounts: Record<number, number> = {};
        user.deskSchedule.forEach((booking) => {
          if (booking.startTime) {
            const dayOfWeek = getDay(booking.startTime);
            dayCounts[dayOfWeek] = (dayCounts[dayOfWeek] || 0) + 1;
          }
        });

        const favoriteDayNumber = Object.entries(dayCounts).reduce(
          (maxDay, [day, count]) => {
            const maxCount = dayCounts[maxDay] || 0;
            return count > maxCount ? parseInt(day) : maxDay;
          },
          0,
        );

        const favoriteDayName = weekDayMap[favoriteDayNumber] || "monday";
        const formattedFavoriteDay =
          favoriteDayName.charAt(0).toUpperCase() + favoriteDayName.slice(1);

        return {
          userId: user.id,
          userName: user.name || user.email || "Unknown User",
          totalBookings,
          avgWeeklyVisits: Math.round(avgWeeklyVisits * 10) / 10, // Round to 1 decimal place
          favoriteDay: formattedFavoriteDay,
        };
      });

      // Sort by total bookings (descending)
      peopleAnalytics.sort((a, b) => b.totalBookings - a.totalBookings);

      return peopleAnalytics;
    }),
  getDeskUtilizationByDayOfWeek: publicProcedure
    .input(commonInput)
    .query(async (resolverProps) => {
      const { ctx, input } = resolverProps;
      const user = await getUserFromSession(ctx.session, {
        includeOrganization: true,
      });
      if (!user.organizationId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "You are not part of an organization",
        });
      }
      if (user.userRole !== UserRole.ADMIN) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to access this resource",
        });
      }
      const { officeId, startDatetime, endDatetime, includeWeekends } = input;

      // officeWithDeskSchedules
      const officeWithDeskSchedules = await prisma.office.findMany({
        where: {
          id: officeId,
          organizationId: user.organizationId,
        },
        include: {
          floors: {
            include: {
              desks: {
                include: {
                  deskSchedule: {
                    where: {
                      startTime: {
                        gte: startDatetime,
                      },
                      endTime: {
                        lte: endDatetime,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      const filteredOfficeWithDeskSchedules = officeWithDeskSchedules;

      type ResultEntry = {
        dayOfTheWeek:
          | "monday"
          | "tuesday"
          | "wednesday"
          | "thursday"
          | "friday"
          | "saturday"
          | "sunday";
        floor: {
          id: string;
          name: string;
        };
        utilizedDesksNumber: number;
        desksAvailableNumber: number;
        utilizationPercentage: number;
        utilizationPercentageOnSpecificDay: number;
      };

      type Result = ResultEntry[];

      const eachDayOfWeek = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        ...(includeWeekends ? ["saturday", "sunday"] : []),
      ] as const;

      const initialResult: Result = [];
      filteredOfficeWithDeskSchedules.forEach((office) => {
        return office.floors.forEach((floor) => {
          eachDayOfWeek.forEach((day) => {
            const resultEntry: ResultEntry = {
              dayOfTheWeek: day as ResultEntry["dayOfTheWeek"],
              floor: {
                id: floor.id,
                name: floor.name,
              },
              utilizationPercentage: 0,
              utilizedDesksNumber: 0,
              desksAvailableNumber: 0,
              utilizationPercentageOnSpecificDay: 0,
            };
            initialResult.push(resultEntry);
          });
        });
      });

      type FloorId = string;
      const floorDeskAmount: Record<FloorId, number> = {};
      filteredOfficeWithDeskSchedules.forEach((office) => {
        return office.floors.forEach((floor) => {
          floor.desks.forEach(() => {
            if (typeof floorDeskAmount[floor.id] === "undefined") {
              floorDeskAmount[floor.id] = 1;
            } else {
              floorDeskAmount[floor.id]!++;
            }
          });
        });
      });

      // Figure out the utilizedDesksNumber for each day of the week + each floor.
      filteredOfficeWithDeskSchedules.forEach((office) => {
        return office.floors.forEach((floor) => {
          floor.desks.forEach((desk) => {
            desk.deskSchedule.forEach((deskSchedule) => {
              if (!deskSchedule.startTime) return;

              const dayOfTheWeek1 = deskSchedule.startTime.getDay();
              const dayOfTheWeekName = weekDayMap[dayOfTheWeek1];
              if (!dayOfTheWeekName) return;
              const resultEntry = initialResult.find(
                (item) =>
                  item.dayOfTheWeek === dayOfTheWeekName &&
                  item.floor.id === floor.id,
              );
              if (!resultEntry) return;

              resultEntry.utilizedDesksNumber++;
            });
          });
        });
      });

      const immediateResult = initialResult.map((item) => {
        const desksAvailableNumber = floorDeskAmount[item.floor.id] || 0;
        // const allDesksAvailablePerDay =
        //   allDesksAvailablePerDayMap[item.dayOfTheWeek] || 0;
        return {
          ...item,
          desksAvailableNumber,
          utilizationPercentageOnSpecificDay:
            item.utilizedDesksNumber / desksAvailableNumber,
          // utilizationPercentage:
          //   item.utilizedDesksNumber / allDesksAvailablePerDay,
        };
      });

      const allDesksAvailablePerDayMap: Record<string, number> = {
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
      };
      // const allDesksAvailablePerDay =
      immediateResult.forEach((item) => {
        if (allDesksAvailablePerDayMap[item.dayOfTheWeek] !== undefined) {
          allDesksAvailablePerDayMap[item.dayOfTheWeek]! +=
            item.desksAvailableNumber;
        }
      });

      const finalResult = immediateResult.map((item) => {
        const allDesksAvailablePerDay =
          allDesksAvailablePerDayMap[item.dayOfTheWeek] || Infinity;
        return {
          ...item,
          utilizationPercentage:
            item.utilizedDesksNumber / allDesksAvailablePerDay,
        };
      });

      const differenceInDays = Math.abs(
        differenceInCalendarDays(startDatetime, endDatetime),
      );
      const adjustmentIdentifier = differenceInDays / 7;

      const adjustmentsBasedOnWeeks = finalResult.map((item) => {
        return {
          ...item,
          utilizationPercentage:
            item.utilizationPercentage / adjustmentIdentifier,
          utilizationPercentageOnSpecificDay:
            item.utilizationPercentageOnSpecificDay / adjustmentIdentifier,
        };
      });

      return adjustmentsBasedOnWeeks;
    }),
});
