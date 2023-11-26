import { Desk, DeskSchedule } from "@prisma/client";

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

const calculateFreePeriods = (
  deskSchedules: DeskSchedule[],
  startingTime: Date,
  endTime: Date,
): { start: Date; end: Date }[] => {
  const freePeriods = [{ start: startingTime, end: endTime }];

  deskSchedules.forEach((schedule) => {
    if (schedule.wholeDay) {
      // If the wholeDay field is true, the desk is booked for the entire day
      freePeriods.length = 0; // Clear free periods since desk is booked whole day
    } else if (schedule.startTime && schedule.endTime) {
      const scheduleStart = schedule.startTime;
      const scheduleEnd = schedule.endTime;

      const updatedFreePeriods: Period[] = [];
      freePeriods.forEach((freePeriod) => {
        if (scheduleStart < freePeriod.end && scheduleEnd > freePeriod.start) {
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

      freePeriods.length = 0;
      freePeriods.push(...updatedFreePeriods);
    }
  });

  return freePeriods;
};

const calculateUsedPeriods = (
  deskSchedules: DeskSchedule[],
  startingTime: Date,
  endTime: Date,
): { start: Date; end: Date }[] => {
  const usedPeriods: Period[] = [];

  deskSchedules.forEach((schedule) => {
    if (schedule.wholeDay) {
      // If the wholeDay field is true, the desk is booked for the entire day
      usedPeriods.push({ start: startingTime, end: endTime });
    } else if (schedule.startTime && schedule.endTime) {
      usedPeriods.push({
        start: schedule.startTime,
        end: schedule.endTime,
      });
    }
  });

  return usedPeriods;
};

type FreeDesksWithTime = Record<
  // deskId
  string,
  {
    desk: Desk;
    freePeriods: Period[];
    usedPeriods: Period[];
    wholeDayFree: boolean;
  }
>;

type GetFreeDesksPerDay = {
  deskSchedules: DeskSchedule[];
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
      deskSchedules,
      startingTime,
      endTime,
    );
    const usedPeriods = calculateUsedPeriods(
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
