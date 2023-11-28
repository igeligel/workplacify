import { Badge } from "@chakra-ui/react";

type GetStartedBadgeProps = {
  colorScheme?: string;
  children: React.ReactNode;
};

export const GetStartedBadge = (props: GetStartedBadgeProps) => {
  const { colorScheme = "orange", children } = props;

  return (
    <Badge fontSize={{ base: "2xs", lg: "xs" }} colorScheme={colorScheme}>
      {children}
    </Badge>
  );
};
