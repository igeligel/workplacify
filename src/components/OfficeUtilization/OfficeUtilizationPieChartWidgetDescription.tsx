import { Text } from "@chakra-ui/react";

type OfficeUtilizationPieChartWidgetDescriptionProps = {
  children: React.ReactNode;
};

export const OfficeUtilizationPieChartWidgetDescription = (
  props: OfficeUtilizationPieChartWidgetDescriptionProps,
) => {
  const { children } = props;
  return (
    <Text color={"gray.600"} fontSize={"xs"} textAlign={"center"}>
      {children}
    </Text>
  );
};
