import { Chart, useChart } from "@chakra-ui/charts";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Cell, Pie, PieChart } from "recharts";

// type ChartDataEntry = {
//   name: string;
//   value: number;
//   color: string;
// };

type OfficeUtilizationPieChartWidgetProps = {
  percentage: number;
  heading: React.ReactNode;
  description: React.ReactNode;
  // chart: React.ComponentProps<typeof Chart.Root<ChartDataEntry>>["chart"];
};

export const OfficeUtilizationPieChartWidget = (
  props: OfficeUtilizationPieChartWidgetProps,
) => {
  const { percentage, heading, description } = props;
  const chart = useChart({
    data: [
      { name: "windows", value: percentage * 100.0, color: "orange.solid" },
      { name: "mac", value: 100 - percentage * 100.0, color: "gray.200" },
    ],
  });

  const formatter = new Intl.NumberFormat(undefined, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const formatted = formatter.format(percentage);

  return (
    <>
      <Box>
        {heading}
        <Box position={"relative"}>
          <Chart.Root
            chart={chart}
            marginBottom={"-40px"}
            aspectRatio={1.5}
            minW={"10px"}
            minHeight={"10px"}
          >
            <PieChart>
              <Pie
                innerRadius={30}
                outerRadius={50}
                isAnimationActive={false}
                data={chart.data}
                dataKey={chart.key("value")}
                nameKey="name"
                startAngle={180}
                endAngle={0}
              >
                {chart.data.map((item) => (
                  <Cell key={item.name} fill={chart.color(item.color)} />
                ))}
              </Pie>
            </PieChart>
          </Chart.Root>
          <Box
            position={"absolute"}
            top={"30%"}
            left={"50%"}
            transform={"translate(-50%, -0%)"}
          >
            <Text color={"orange.900"} fontSize={"sm"} fontWeight={700}>
              {formatted}
            </Text>
          </Box>
        </Box>
        {description && <Box marginTop={1}>{description}</Box>}
      </Box>
    </>
  );
};
