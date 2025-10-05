import { User } from "@prisma/client";
import { differenceInBusinessDays, differenceInDays } from "date-fns";

import { prisma } from "../prisma";

type GetDeskUtilizationForDateRangeProps = {
  officeId: string;
  startDatetime: Date;
  endDatetime: Date;
  user: User;
  includeWeekends: boolean;
};

export const getDeskUtilizationForDateRange = async (
  props: GetDeskUtilizationForDateRangeProps,
) => {
  const { officeId, startDatetime, endDatetime, user, includeWeekends } = props;
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
  let totalDesksSchedulesUsed = 0;
  let totalDesksSchedulesPossible = 0;
  officeWithDeskSchedules.forEach((office) => {
    office.floors.forEach((floor) => {
      floor.desks.forEach((desk) => {
        desk.deskSchedule.forEach(() => {
          totalDesksSchedulesUsed++;
        });
      });
    });
  });

  const amountOfDaysBetweenStartAndEndDatetime = Math.abs(
    includeWeekends
      ? differenceInDays(startDatetime, endDatetime)
      : differenceInBusinessDays(startDatetime, endDatetime),
  );

  officeWithDeskSchedules.forEach((office) => {
    office.floors.forEach((floor) => {
      floor.desks.forEach(() => {
        totalDesksSchedulesPossible++;
      });
    });
  });
  totalDesksSchedulesPossible =
    totalDesksSchedulesPossible * amountOfDaysBetweenStartAndEndDatetime;
  return {
    totalDesksSchedulesPossible,
    totalDesksSchedulesUsed,
    occupancyRate: totalDesksSchedulesUsed / totalDesksSchedulesPossible,
  };
};
