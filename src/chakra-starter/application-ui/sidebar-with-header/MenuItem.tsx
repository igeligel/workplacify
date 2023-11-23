import { Link } from "@chakra-ui/next-js";
import { Box, Icon, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { IconType } from "react-icons";

import { MenuItemWrapper } from "./MenuItemWrapper";

export type MenuItemProps = {
  title: string;
  icon: IconType;
  onClick?: () => void;
  href?: string;
  isActive?: boolean;
};

const MenuItemContent: React.FC<MenuItemProps> = (props) => {
  return (
    <MenuItemWrapper
      isActive={props.isActive}
      onClick={props.onClick}
      color={"gray.500"}
    >
      <Box display={"flex"} alignItems={"center"}>
        <Icon as={props.icon} strokeWidth={"3px"} />
        <Text fontSize="sm" marginLeft={"2"} fontWeight={"semibold"}>
          {props.title}
        </Text>
      </Box>
    </MenuItemWrapper>
  );
};

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  return props.href ? (
    <Link
      as={NextLink}
      href={props.href}
      width={"100%"}
      textDecoration={"none"}
      _hover={{
        textDecoration: "none",
      }}
    >
      <MenuItemContent {...props} />
    </Link>
  ) : (
    <MenuItemContent {...props} />
  );
};
