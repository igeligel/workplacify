import { ListIcon, ListItem, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaCheckCircle } from "react-icons/fa";
import { FiAlertTriangle, FiZap } from "react-icons/fi";

type Mode = "feature" | "coming-soon" | "disabled";

type PricingFeatureListItemProps = {
  comingSoon?: boolean;
  mode?: Mode;
  children: React.ReactNode;
};

export const PricingFeatureListItem = (props: PricingFeatureListItemProps) => {
  const { children, mode = "feature" } = props;

  const iconMap: Record<Mode, IconType> = {
    feature: FaCheckCircle,
    "coming-soon": FiZap,
    disabled: FiAlertTriangle,
  };

  const colorMap: Record<Mode, string> = {
    feature: "green.500",
    "coming-soon": "orange.300",
    disabled: "gray.500",
  };

  return (
    <ListItem role="listitem" display={"flex"} alignItems={"center"}>
      <ListIcon strokeWidth={"3px"} as={iconMap[mode]} color={colorMap[mode]} />
      <Text>{children}</Text>
    </ListItem>
  );
};
