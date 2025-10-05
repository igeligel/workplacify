import { create } from "zustand";

export type AnalyticsFiltersState = {
  officeValue: string[] | null;
  dateRangeValue: string[] | null;
  includeWeekends: boolean;
  setOfficeValue: (value: string[] | null) => void;
  setDateRangeValue: (value: string[] | null) => void;
  setIncludeWeekends: (value: boolean) => void;
};

export const useAnalyticsFiltersStore = create<AnalyticsFiltersState>(
  (set) => ({
    officeValue: null,
    dateRangeValue: null,
    includeWeekends: false,
    setOfficeValue: (value: string[] | null) => set({ officeValue: value }),
    setDateRangeValue: (value: string[] | null) =>
      set({ dateRangeValue: value }),
    setIncludeWeekends: (value: boolean) => set({ includeWeekends: value }),
  }),
);
