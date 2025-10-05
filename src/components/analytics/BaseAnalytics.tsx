import {
  Box,
  HStack,
  Heading,
  Progress,
  Skeleton,
  Stack,
  Stat,
  Text,
} from "@chakra-ui/react";

import { trpc } from "../../utils/trpc";
import {
  WorkplacifyFilters,
  useAnalyticsQueryParams,
} from "./WorkplacifyFilters";
import { ChartsDeskUtilizationByDayOfWeek } from "./charts-desk-utilization-by-day-of-week";
import { useAnalyticsFiltersStore } from "./useAnalyticsFiltersStore";

export const BaseAnalytics = () => {
  const officeValue = useAnalyticsFiltersStore((s) => s.officeValue);
  const dateRangeValue = useAnalyticsFiltersStore((s) => s.dateRangeValue);

  const queryParams = useAnalyticsQueryParams();

  const getDeskUtilizationQuery = trpc.analytics.getDeskUtilization.useQuery(
    queryParams,
    {
      enabled: Boolean(officeValue?.[0] && dateRangeValue?.[0]),
    },
  );

  const getPeakDayQuery = trpc.analytics.getPeakDay.useQuery(queryParams, {
    enabled: Boolean(officeValue?.[0] && dateRangeValue?.[0]),
  });

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
          <WorkplacifyFilters />
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
