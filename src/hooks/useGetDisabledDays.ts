import { Prisma } from "@prisma/client";
import {
  add,
  isFriday,
  isMonday,
  isSaturday,
  isSunday,
  isThursday,
  isTuesday,
  isWednesday,
} from "date-fns";

type UseGetDisabledDaysProps = {
  getOfficeSettingQueryData: unknown;
  isLoading: boolean;
};

export const useGetDisabledDays = (props: UseGetDisabledDaysProps) => {
  const { getOfficeSettingQueryData, isLoading } = props;

  const currentDate = new Date();
  const yesterday = add(currentDate, { days: -1 });

  const defaultDisabledDays = (date: Date) => {
    return date < yesterday;
  };

  const derivativeDisabledDays = (date: Date) => {
    const data = getOfficeSettingQueryData as Prisma.OfficeSettingGetPayload<{
      include: { officeSettingWeekdaysAllowed: true };
    }>;

    if (!data) {
      return defaultDisabledDays(date);
    }

    let isDateAllowed = true;

    if (!data.allowSchedulingInThePast && date < yesterday) {
      isDateAllowed = false;
    }

    if (data.durationSchedulingFuture) {
      const isDateWithinRange =
        date <= add(currentDate, { days: data.durationSchedulingFuture });

      if (!isDateWithinRange) {
        isDateAllowed = false;
      }
    }

    if (data.officeSettingWeekdaysAllowed) {
      if (isMonday(date) && !data.officeSettingWeekdaysAllowed.allowMonday) {
        isDateAllowed = false;
      }
      if (isTuesday(date) && !data.officeSettingWeekdaysAllowed.allowTuesday) {
        isDateAllowed = false;
      }
      if (
        isWednesday(date) &&
        !data.officeSettingWeekdaysAllowed.allowWednesday
      ) {
        isDateAllowed = false;
      }
      if (
        isThursday(date) &&
        !data.officeSettingWeekdaysAllowed.allowThursday
      ) {
        isDateAllowed = false;
      }
      if (isFriday(date) && !data.officeSettingWeekdaysAllowed.allowFriday) {
        isDateAllowed = false;
      }
      if (
        isSaturday(date) &&
        !data.officeSettingWeekdaysAllowed.allowSaturday
      ) {
        isDateAllowed = false;
      }
      if (isSunday(date) && !data.officeSettingWeekdaysAllowed.allowSunday) {
        isDateAllowed = false;
      }
    }

    return !isDateAllowed;
  };

  const loadingDisabledDaysFn = () => false;
  const disabledDays = isLoading
    ? loadingDisabledDaysFn
    : derivativeDisabledDays;

  return { disabledDays };
};
