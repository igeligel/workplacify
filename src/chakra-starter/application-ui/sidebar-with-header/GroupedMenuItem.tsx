import { Box, ColorProps, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FiMoreHorizontal } from "react-icons/fi";

import { MenuItemWrapper } from "./MenuItemWrapper";

type DictionaryMenuItemProps = {
  isActive?: boolean;
  title: string;
  icon: IconType;
  iconColor: ColorProps["color"];
  showMenu?: boolean;
};

export const GroupedMenuItem: React.FC<DictionaryMenuItemProps> = (props) => {
  return (
    <MenuItemWrapper
      isActive={props.isActive}
      color={props.isActive ? "gray.700" : "gray.500"}
    >
      <Box display={"flex"} alignItems={"center"}>
        <Icon color={props.iconColor} as={props.icon} strokeWidth={"3px"} />
        <Text
          marginLeft={"2"}
          fontSize={"sm"}
          fontWeight={props.isActive ? "bold" : "semibold"}
        >
          {props.title}
          {props.isActive}
        </Text>
      </Box>
      {props.showMenu && (
        <Box display={"flex"} alignItems={"center"}>
          <Icon as={FiMoreHorizontal} />
        </Box>
      )}
    </MenuItemWrapper>
  );
};
