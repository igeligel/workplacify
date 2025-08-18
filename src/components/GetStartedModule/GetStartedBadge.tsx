import { Badge } from "@chakra-ui/react";

type GetStartedBadgeProps = {
  colorPalette?: string;
  children: React.ReactNode;
};

export const GetStartedBadge = (props: GetStartedBadgeProps) => {
  const { colorPalette = "orange", children } = props;

  return (
    <Badge fontSize={{ base: "2xs", lg: "xs" }} colorPalette={colorPalette}>
      {children}
    </Badge>
  );
};
