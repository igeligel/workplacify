import {
  Box,
  HStack,
  Heading,
  Portal,
  Progress,
  Select,
  Skeleton,
  Stack,
  Stat,
  createListCollection,
} from "@chakra-ui/react";
import { add } from "date-fns";
import { useEffect, useMemo, useState } from "react";

import { trpc } from "../../utils/trpc";
import { ChartsDeskUtilizationByDayOfWeek } from "./charts-desk-utilization-by-day-of-week";

export const BaseAnalytics = () => {
  const [officeValue, setOfficeValue] = useState<string[] | null>(null);
  const [dateRangeValue, setDateRangeValue] = useState<string[] | null>(null);

  const getDateRangeOptionsQuery =
    trpc.analytics.getDateRangeOptions.useQuery();
  const getOfficeOptionsQuery = trpc.analytics.getOfficeOptions.useQuery();

  // const startTime =

  const queryParams = useMemo(() => {
    const dateRange = {
      startDate: add(new Date(), { days: -7 }),
      endDate: new Date(),
    };

    return {
      officeId: officeValue?.[0] ?? "",
      startDatetime: dateRange.startDate,
      endDatetime: dateRange.endDate,
    };
  }, [officeValue]);

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
    last30days: "Last 30 days",
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

  let differenceSign = "+/-";
  if (differenceOccupancyRate > 0.0) {
    differenceSign = "+";
  } else if (differenceOccupancyRate < 0.0) {
    differenceSign = "-";
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
        </Box>
        <Stack direction={{ base: "column", md: "row" }} alignItems={"center"}>
          <Stack direction={{ base: "column", md: "row" }}>
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
            <Box>Include weekends?</Box>
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

              {/* <FormatNumber
            value={1340}
            style="currency"
            currency="USD"
            maximumFractionDigits={0}
          /> */}

              <Stat.HelpText mb="2">
                {differenceSign}
                {differenceOccupancyRateFormatted} from last week
              </Stat.HelpText>
              <Progress.Root value={differenceOccupancyRate * 100}>
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
                {formattedPeakDay} ({formattedPeakDayUtilization} Util)
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
