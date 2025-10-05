import {
  Box,
  Checkbox,
  HStack,
  Heading,
  Portal,
  Progress,
  Select,
  Skeleton,
  Stack,
  Stat,
  Text,
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
import { useEffect, useMemo, useState } from "react";

import { trpc } from "../../utils/trpc";
import { ChartsDeskUtilizationByDayOfWeek } from "./charts-desk-utilization-by-day-of-week";

type DateRange = {
  startDate: Date;
  endDate: Date;
};

export const BaseAnalytics = () => {
  const [officeValue, setOfficeValue] = useState<string[] | null>(null);
  const [dateRangeValue, setDateRangeValue] = useState<string[] | null>(null);
  const [includeWeekends, setIncludeWeekends] = useState<boolean>(false);

  const getDateRangeOptionsQuery =
    trpc.analytics.getDateRangeOptions.useQuery();
  const getOfficeOptionsQuery = trpc.analytics.getOfficeOptions.useQuery();

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

  const getDeskUtilizationQuery = trpc.analytics.getDeskUtilization.useQuery(
    queryParams,
    {
      enabled: Boolean(officeValue?.[0] && dateRangeValue?.[0]),
    },
  );

  const getPeakDayQuery = trpc.analytics.getPeakDay.useQuery(queryParams, {
    enabled: Boolean(officeValue?.[0] && dateRangeValue?.[0]),
  });

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
    weektodate: "Week to date",
    last7days: "Last 7 days",
    monthtodate: "Month to date",
    last28days: "Last 28 days",
    last90days: "Last 90 days",
    yeartodate: "Year to date",
    last365days: "Last 365 days",
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
  }, [officeOptions, officeValue]);

  useEffect(() => {
    if (
      dateRangeValue === null &&
      dateRangeOptions &&
      dateRangeOptions.length > 0 &&
      dateRangeOptions[0]?.value
    ) {
      setDateRangeValue([dateRangeOptions[0].value]);
    }
  }, [dateRangeOptions, dateRangeValue]);

  let currentPeriodOccupancyRate = 0;
  if (getDeskUtilizationQuery.data?.currentPeriod.occupancyRate) {
    currentPeriodOccupancyRate =
      getDeskUtilizationQuery.data.currentPeriod.occupancyRate;
  }

  const currentPeriodOccupancyRateFormatted = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  }).format(currentPeriodOccupancyRate);

  let differenceOccupancyRate = 0;
  if (getDeskUtilizationQuery.data?.difference) {
    differenceOccupancyRate = getDeskUtilizationQuery.data.difference;
  }
  const differenceOccupancyRateFormatted = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  }).format(differenceOccupancyRate);

  let differenceSign = "";
  if (differenceOccupancyRate > 0.0) {
    differenceSign = "+";
  }

  const formattedPeakDayMap = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  } as Record<string, string>;
  let formattedPeakDay = "";
  if (getPeakDayQuery.data?.peakDay.day) {
    formattedPeakDay =
      formattedPeakDayMap[getPeakDayQuery.data.peakDay.day] || "";
  }

  let formattedPeakDayUtilization = "";
  if (getPeakDayQuery.data?.peakDay.utilization) {
    formattedPeakDayUtilization = new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 2,
    }).format(getPeakDayQuery.data.peakDay.utilization);
  }

  return (
    <Box>
      <Stack
        direction={{ base: "column", md: "row" }}
        justifyContent={"space-between"}
      >
        <Box>
          <Heading as={"h1"}>Workplacify Analytics 🏢</Heading>
          <Text>Analyze your office utilization and peak days.</Text>
        </Box>
        <Stack direction={{ base: "column", md: "row" }} alignItems={"center"}>
          <Stack
            direction={{ base: "column", md: "row" }}
            alignItems={"center"}
          >
            {officeValue && (
              <Select.Root
                collection={officeFrameworks}
                value={officeValue}
                onValueChange={(e) => setOfficeValue(e.value)}
                width={"200px"}
              >
                <Select.HiddenSelect />
                <Select.Label>Select office</Select.Label>
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
                <Select.Label>Date range</Select.Label>
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
                <Checkbox.Label>Include weekends?</Checkbox.Label>
              </Checkbox.Root>
            </Box>
          </Stack>
          {/* <Button variant={"outline"}>
            <Icon as={FiRefreshCcw} />
            Refresh
          </Button> */}
        </Stack>
      </Stack>
      {/* <Box marginTop={4} maxW={{ base: "100%", md: "50%" }}>
        <Alert.Root status="warning">
          <Alert.Indicator>
            <FaLightbulb />
          </Alert.Indicator>
          <Alert.Title>Insight of the week</Alert.Title>
          <Alert.Description>
            Wednesday is overbooked. Consider making it a priority day for
            specific teams.
          </Alert.Description>
        </Alert.Root>
      </Box> */}
      <Box marginTop={4}>
        <HStack alignItems={"flex-start"} gap={12}>
          <Box>
            <Stat.Root maxW="240px">
              <Stat.Label>Overall Desk Utilization</Stat.Label>
              <Skeleton asChild loading={getDeskUtilizationQuery.isLoading}>
                <Stat.ValueText>
                  {currentPeriodOccupancyRateFormatted}
                </Stat.ValueText>
              </Skeleton>

              <Stat.HelpText mb="2">
                {differenceSign}
                {differenceOccupancyRateFormatted} from previous period
              </Stat.HelpText>
              <Progress.Root value={currentPeriodOccupancyRate * 100}>
                <Progress.Track>
                  <Progress.Range />
                </Progress.Track>
              </Progress.Root>
            </Stat.Root>
          </Box>
          <Box>
            <Stat.Root>
              <Stat.Label>Peak Day</Stat.Label>
              <Stat.ValueText>
                {formattedPeakDay} ({formattedPeakDayUtilization} Utilization)
              </Stat.ValueText>
            </Stat.Root>
          </Box>
          {/* <Box>
            <Stat.Root>
              <Stat.Label>Top User</Stat.Label>
              <Stat.ValueText>Alice Johnson (18 bookings)</Stat.ValueText>
            </Stat.Root>
          </Box> */}
        </HStack>
      </Box>
      <Box marginTop={4}>
        <Box maxW={{ base: "100%", md: "50%" }}>
          <ChartsDeskUtilizationByDayOfWeek queryParams={queryParams} />
        </Box>
      </Box>
    </Box>
  );
};
