import { List, Text, VStack } from "@chakra-ui/react";
import { LuCircleCheck, LuCircleX } from "react-icons/lu";

import { useComparisonTileTheme } from "./useComparisonTileTheme";

type ComparisonTileListItemProps = {
  checked?: boolean;
  title: React.ReactNode;
  description: React.ReactNode;
};

export const ComparisonTileListItem = (props: ComparisonTileListItemProps) => {
  const { theme } = useComparisonTileTheme();
  const { checked, title, description } = props;

  const checkedColor = theme === "dark" ? "green.500" : "green.500";
  const uncheckedColor = theme === "dark" ? "gray.700" : "gray.400";

  return (
    <List.Item alignItems={"flex-start"}>
      <List.Indicator asChild color={checked ? checkedColor : uncheckedColor}>
        {checked ? <LuCircleCheck /> : <LuCircleX />}
      </List.Indicator>
      <VStack
        alignItems={"flex-start"}
        gap={0}
        fontSize={{ base: "xs", sm: "md" }}
      >
        <Text fontWeight={"bold"}>{title}</Text>
        <Text>{description}</Text>
      </VStack>
    </List.Item>
  );
};
