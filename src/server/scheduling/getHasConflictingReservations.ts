import { DeskSchedule } from "@prisma/client";
import { isEqual } from "date-fns";

export const getHasConflictingReservation = (
  day: Date,
  userId: string,
  deskSchedules: DeskSchedule[],
): boolean => {
  // Filter deskSchedules for the provided day and user
  const schedulesForDay = deskSchedules.filter((schedule) => {
    if (schedule.wholeDay) {
      if (!schedule.date) {
        console.log("No date on schedule");
        return false;
      }
      const wholeDayEqual = isEqual(day, schedule.date);
      const hasMatchingUserId = schedule.userId === userId;
      return wholeDayEqual && hasMatchingUserId;
    }
    if (
      // Check for conflicting start/end times for the user
      !schedule.wholeDay &&
      schedule.startTime &&
      schedule.endTime &&
      schedule.userId === userId &&
      day >= new Date(schedule.startTime) &&
      day <= new Date(schedule.endTime)
    ) {
      return true;
    }
    return false;
  });

  // Return true if there are reservations for the day and user, otherwise false
  return schedulesForDay.length > 0;
};
