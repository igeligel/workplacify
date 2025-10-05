"use client";

import { Chart, useChart } from "@chakra-ui/charts";
import { Box } from "@chakra-ui/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { trpc } from "../../utils/trpc";
import { useAnalyticsQueryParams } from "./WorkplacifyFilters";

// type CustomTooltipProps = {
//   active: boolean;
//   payload: {
//     name: string;
//     color: string;
//     value: number;
//     payload: {
//       absoluteNumber: number;
//       month:
//         | "Monday"
//         | "Tuesday"
//         | "Wednesday"
//         | "Thursday"
//         | "Friday"
//         | "Saturday"
//         | "Sunday";
//     };
//   }[];
//   label: string;
// };

// const CustomTooltip = (props: CustomTooltipProps) => {
//   const { active, payload, label } = props;
//   if (!active || !payload || payload.length === 0) return null;
//   console.log({ payload });

//   return (
//     <Box w="40" rounded="sm" bg="teal.subtle" p="3">
//       <HStack>
//         <span>{label} Customers</span>
//       </HStack>
//       <Stack>
//         {payload.map((item) => {
//           const valueRepresentation = Intl.NumberFormat("en-US", {
//             style: "percent",
//             minimumFractionDigits: 2,
//           }).format(item.value / 100.0);

//           return (
//             <HStack key={item.name}>
//               <Box boxSize="2" bg={item.color} />
//               <Text textStyle="xl">
//                 {valueRepresentation} - Absolute: {item.payload.absoluteNumber}
//               </Text>
//             </HStack>
//           );
//         })}
//       </Stack>
//     </Box>
//   );
// };

type ChartDataPoint = {
  month: string;

  [key: string]: string | number;
};

type ChartsDeskUtilizationByDayOfWeekProps = {
  queryParams: ReturnType<typeof useAnalyticsQueryParams>;
};

export const ChartsDeskUtilizationByDayOfWeek = (
  props: ChartsDeskUtilizationByDayOfWeekProps,
) => {
  const { queryParams } = props;
  const getDeskUtilizationByDayOfWeekQuery =
    trpc.analytics.getDeskUtilizationByDayOfWeek.useQuery(queryParams);

  const groupedByDay = getDeskUtilizationByDayOfWeekQuery?.data?.reduce<
    Record<string, ChartDataPoint>
  >((acc, item) => {
    const day = item.dayOfTheWeek;
    const floorName = item.floor.name;
    if (!acc[day]) {
      acc[day] = { month: day };
    }
    acc[day][floorName] = item.utilizationPercentage * 100.0;
    // In case we want add more info to the tooltip.
    // acc[day].moreInfo = { testData: 123 };
    return acc;
  }, {});

  // Return ordered by week day
  const weekDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const data = weekDays
    .filter((day) => groupedByDay?.[day])
    .map((day) => groupedByDay?.[day])
    .filter((day) => day !== undefined);

  const colorPalette = [
    "teal.solid",
    "purple.solid",
    "blue.solid",
    "orange.solid",
    "red.solid",
    "green.solid",
    "yellow.solid",
    "cyan.solid",
    "pink.solid",
  ];
  const series: { name: string; color: string; stackId: string }[] = [];
  getDeskUtilizationByDayOfWeekQuery?.data?.reduce((acc, item) => {
    if (!acc.find((seriesItem) => seriesItem.name === item.floor.name)) {
      acc.push({
        name: item.floor.name,
        color: colorPalette.pop() || "pink.solid",
        stackId: "a",
      });
    }
    return acc;
  }, series);

  const chart = useChart({
    data: data,
    series: series,
  });

  return (
    <Box>
      <Chart.Root maxH="md" chart={chart}>
        <BarChart layout="vertical" data={chart.data}>
          <CartesianGrid
            stroke={chart.color("border.muted")}
            vertical={false}
          />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
          />
          <YAxis
            type="category"
            dataKey={chart.key("month")}
            orientation="left"
            stroke={chart.color("border")}
            tickFormatter={(value) =>
              typeof value === "string" ? value.slice(0, 3) : value
            }
          />
          <Tooltip
            animationDuration={100}
            cursor={{ fill: chart.color("bg.muted") }}
            content={<Chart.Tooltip />}
            // content={<CustomTooltip active={false} payload={[]} label={""} />}
          />
          <Legend content={<Chart.Legend />} />
          <ReferenceLine
            x={100}
            stroke={chart.color("red.fg")}
            strokeDasharray="3 3"
          />
          <ReferenceLine
            x={80}
            stroke={chart.color("red.fg")}
            strokeDasharray="3 3"
          />
          {chart.series.map((item) => (
            <Bar
              barSize={30}
              isAnimationActive={false}
              key={item.name}
              dataKey={chart.key(item.name)}
              fill={chart.color(item.color)}
              stroke={chart.color(item.color)}
              stackId={item.stackId}
            />
          ))}
        </BarChart>
      </Chart.Root>
    </Box>
  );
};
