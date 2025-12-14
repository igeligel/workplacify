import { Heading } from "@chakra-ui/react";

type OfficeUtilizationPieChartWidgetHeadingProps = {
  children: React.ReactNode;
};
export const OfficeUtilizationPieChartWidgetHeading = (
  props: OfficeUtilizationPieChartWidgetHeadingProps,
) => {
  const { children } = props;
  return (
    <Heading fontSize={"sm"} fontWeight={700} textAlign={"center"}>
      {children}
    </Heading>
  );
};
