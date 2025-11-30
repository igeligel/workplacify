import {
  Box,
  Checkbox,
  Portal,
  Select,
  Stack,
  createListCollection,
} from "@chakra-ui/react";
import {
  add,
  endOfDay,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";

import { trpc } from "../../utils/trpc";
import { useAnalyticsFiltersStore } from "./useAnalyticsFiltersStore";

type DateRange = {
  startDate: Date;
  endDate: Date;
};

export const WorkplacifyFilters = () => {
  const t = useTranslations("Analytics");
  const officeValue = useAnalyticsFiltersStore((s) => s.officeValue);
  const dateRangeValue = useAnalyticsFiltersStore((s) => s.dateRangeValue);
  const includeWeekends = useAnalyticsFiltersStore((s) => s.includeWeekends);
  const setOfficeValue = useAnalyticsFiltersStore((s) => s.setOfficeValue);
  const setDateRangeValue = useAnalyticsFiltersStore(
    (s) => s.setDateRangeValue,
  );
  const setIncludeWeekends = useAnalyticsFiltersStore(
    (s) => s.setIncludeWeekends,
  );

  const getDateRangeOptionsQuery =
    trpc.analytics.getDateRangeOptions.useQuery();
  const getOfficeOptionsQuery = trpc.analytics.getOfficeOptions.useQuery();

  const officeOptions = getOfficeOptionsQuery.data?.map((office) => {
    return {
      label: office.name,
      value: office.id,
    };
  });

  const officeFrameworks = createListCollection({
    items: officeOptions ?? [],
  });

  const dateRangeLabelMap = {
    weektodate: t("dateRangeOptions.weektodate"),
    last7days: t("dateRangeOptions.last7days"),
    monthtodate: t("dateRangeOptions.monthtodate"),
    last28days: t("dateRangeOptions.last28days"),
    last90days: t("dateRangeOptions.last90days"),
    yeartodate: t("dateRangeOptions.yeartodate"),
    last365days: t("dateRangeOptions.last365days"),
  } as Record<string, string>;

  const dateRangeOptions = getDateRangeOptionsQuery.data?.map((dateRange) => {
    return {
      label: dateRangeLabelMap[dateRange.value],
      value: dateRange.value,
    };
  });
  const dateRangeFrameworks = createListCollection({
    items: dateRangeOptions ?? [],
  });

  useEffect(() => {
    if (
      officeValue === null &&
      officeOptions &&
      officeOptions.length > 0 &&
      officeOptions[0]?.value
    ) {
      setOfficeValue([officeOptions[0].value]);
    }
  }, [officeOptions, officeValue, setOfficeValue]);

  useEffect(() => {
    if (
      dateRangeValue === null &&
      dateRangeOptions &&
      dateRangeOptions.length > 0 &&
      dateRangeOptions[0]?.value
    ) {
      setDateRangeValue([dateRangeOptions[0].value]);
    }
  }, [dateRangeOptions, dateRangeValue, setDateRangeValue]);

  return (
    <Stack direction={{ base: "column", md: "row" }} alignItems={"center"}>
      <Stack direction={{ base: "column", md: "row" }} alignItems={"center"}>
        {officeValue && (
          <Select.Root
            collection={officeFrameworks}
            value={officeValue}
            onValueChange={(e) => setOfficeValue(e.value)}
            width={"200px"}
          >
            <Select.HiddenSelect />
            <Select.Label>{t("labelSelectOffice")}</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select framework" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {officeFrameworks.items.map((framework) => (
                    <Select.Item item={framework} key={framework.value}>
                      {framework.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        )}
        {dateRangeValue && (
          <Select.Root
            collection={dateRangeFrameworks}
            value={dateRangeValue}
            onValueChange={(e) => setDateRangeValue(e.value)}
            width={"200px"}
          >
            <Select.HiddenSelect />
            <Select.Label>{t("labelDateRange")}</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select framework" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {dateRangeFrameworks.items.map((framework) => (
                    <Select.Item item={framework} key={framework.value}>
                      {framework.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        )}
        <Box>
          <Checkbox.Root
            checked={includeWeekends}
            onCheckedChange={(e) => {
              setIncludeWeekends(Boolean(e.checked));
            }}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>{t("labelIncludeWeekends")}</Checkbox.Label>
          </Checkbox.Root>
        </Box>
      </Stack>
    </Stack>
  );
};

export function useAnalyticsQueryParams() {
  const officeValue = useAnalyticsFiltersStore((s) => s.officeValue);
  const dateRangeValue = useAnalyticsFiltersStore((s) => s.dateRangeValue);
  const includeWeekends = useAnalyticsFiltersStore((s) => s.includeWeekends);

  const queryParams = useMemo(() => {
    const defaultDateRange: DateRange = {
      startDate: add(new Date(), { days: -7 }),
      endDate: new Date(),
    } as const;
    const dateRangeOptionsMap: Record<string, DateRange> = {
      weektodate: {
        startDate: add(startOfWeek(new Date(), { weekStartsOn: 1 }), {
          seconds: -1,
        }),
        endDate: new Date(),
      },
      last7days: defaultDateRange,
      monthtodate: {
        startDate: startOfMonth(new Date()),
        endDate: new Date(),
      },
      last28days: {
        startDate: add(new Date(), { days: -28 }),
        endDate: new Date(),
      },
      last90days: {
        startDate: add(new Date(), { days: -90 }),
        endDate: new Date(),
      },
      yeartodate: {
        startDate: startOfYear(new Date()),
        endDate: new Date(),
      },
      last365days: {
        startDate: add(new Date(), { days: -365 }),
        endDate: new Date(),
      },
    } as const;
    let computedDateRange = defaultDateRange;
    if (dateRangeValue?.[0]) {
      const mappedDateRange = dateRangeOptionsMap[dateRangeValue?.[0] ?? ""];
      if (mappedDateRange) {
        computedDateRange = mappedDateRange;
      }
    }
    const dateRange = {
      startDate: startOfDay(computedDateRange.startDate),
      endDate: endOfDay(computedDateRange.endDate),
    };

    return {
      officeId: officeValue?.[0] ?? "",
      startDatetime: dateRange.startDate,
      endDatetime: dateRange.endDate,
      includeWeekends: includeWeekends,
    };
  }, [officeValue, includeWeekends, dateRangeValue]);

  return queryParams;
}
