import { Desk, DeskSchedule, Prisma, User } from "@prisma/client";

// DeskSchedule
// {
//   id: string;
//   deskId: string;
//   date: Date | null;
//   timezone: string;
//   wholeDay: boolean;
//   startTime: Date | null;
//   endTime: Date | null;
//   createdAt: Date;
//   updatedAt: Date;
//   userId: string | null;
// }

// Desk
// {
//   id: string;
//   publicDeskId: string;
//   name: string | null;
//   description: string | null;
//   createdAt: Date;
//   updatedAt: Date;
//   floorId: string;
//   x: number;
//   y: number;
// }

type Period = {
  start: Date;
  end: Date;
};
type MappedDeskSchedule = Prisma.DeskScheduleGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        name: true;
        image: true;
      };
    };
  };
}>;

const calculateFreePeriods = (
  deskId: string,
  deskSchedules: MappedDeskSchedule[],
  startingTime: Date,
  endTime: Date,
): { start: Date; end: Date }[] => {
  const schedulesForDesk = deskSchedules.filter(
    (schedule) =>
      schedule.deskId === deskId &&
      ((schedule.date &&
        schedule.date > startingTime &&
        schedule.date < endTime) ||
        (schedule.startTime &&
          schedule.endTime &&
          schedule.endTime > startingTime &&
          schedule.startTime < endTime)),
  );

  let freePeriods = [{ start: startingTime, end: endTime }];

  if (schedulesForDesk.length > 0) {
    schedulesForDesk.forEach((schedule) => {
      if (schedule.wholeDay) {
        freePeriods.length = 0; // Clear free periods since desk is booked whole day
      } else if (schedule.startTime && schedule.endTime) {
        const scheduleStart = schedule.startTime;
        const scheduleEnd = schedule.endTime;

        const updatedFreePeriods: Period[] = [];
        freePeriods.forEach((freePeriod) => {
          if (
            scheduleStart < freePeriod.end &&
            scheduleEnd > freePeriod.start
          ) {
            if (scheduleStart > freePeriod.start) {
              updatedFreePeriods.push({
                start: freePeriod.start,
                end: scheduleStart,
              });
            }
            if (scheduleEnd < freePeriod.end) {
              updatedFreePeriods.push({
                start: scheduleEnd,
                end: freePeriod.end,
              });
            }
          } else {
            updatedFreePeriods.push(freePeriod);
          }
        });

        freePeriods = updatedFreePeriods;
      }
    });
  }

  return freePeriods;
};

type PeriodWithUserInfo = Period & {
  id: string;
  wholeDay: boolean;
  deskScheduleId: string;
  name: string | null;
  image: string | null;
};

const calculateUsedPeriods = (
  deskId: string,
  deskSchedules: MappedDeskSchedule[],
  startingTime: Date,
  endTime: Date,
): PeriodWithUserInfo[] => {
  const schedulesForDesk = deskSchedules.filter(
    (schedule) =>
      schedule.deskId === deskId &&
      ((schedule.date &&
        schedule.date > startingTime &&
        schedule.date < endTime) ||
        (schedule.startTime &&
          schedule.endTime &&
          schedule.endTime > startingTime &&
          schedule.startTime < endTime)),
  );

  const usedPeriods: PeriodWithUserInfo[] = [];

  if (schedulesForDesk.length > 0) {
    schedulesForDesk.forEach((schedule) => {
      if (!schedule.user) return;
      if (schedule.wholeDay) {
        usedPeriods.push({
          start: startingTime,
          end: endTime,
          id: schedule.user.id,
          deskScheduleId: schedule.id,
          wholeDay: schedule.wholeDay,
          name: schedule.user.name,
          image: schedule.user.image,
        });
      } else if (schedule.startTime && schedule.endTime) {
        usedPeriods.push({
          start: schedule.startTime,
          end: schedule.endTime,
          id: schedule.user.id,
          deskScheduleId: schedule.id,
          wholeDay: schedule.wholeDay,
          name: schedule.user.name,
          image: schedule.user.image,
        });
      }
    });
  }

  return usedPeriods;
};

type FreeDesksWithTime = Record<
  // deskId
  string,
  {
    desk: Desk;
    freePeriods: Period[];
    usedPeriods: PeriodWithUserInfo[];
    wholeDayFree: boolean;
  }
>;

type GetFreeDesksPerDay = {
  deskSchedules: MappedDeskSchedule[];
  desksInCurrentOffice: Desk[];
  // Because of time zone differences we include start and end here
  startingTime: Date;
  endTime: Date;
};

export const getFreeDesksPerDay = (
  props: GetFreeDesksPerDay,
): FreeDesksWithTime => {
  const { deskSchedules, desksInCurrentOffice, startingTime, endTime } = props;
  const freeDesks: FreeDesksWithTime = {};

  // Iterate through each desk
  desksInCurrentOffice.forEach((desk) => {
    const deskId = desk.id;

    const freePeriods = calculateFreePeriods(
      deskId,
      deskSchedules,
      startingTime,
      endTime,
    );
    const usedPeriods = calculateUsedPeriods(
      deskId,
      deskSchedules,
      startingTime,
      endTime,
    );

    // Populate the FreeDesksWithTime structure for the desk
    freeDesks[deskId] = {
      desk: desk,
      freePeriods: freePeriods,
      usedPeriods: usedPeriods,
      wholeDayFree: freePeriods.length > 0, // Assuming whole day is considered free if any free period exists
    };
  });

  return freeDesks;
};
