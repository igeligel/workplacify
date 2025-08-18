import { Box, Icon, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { IconType } from "react-icons";

import { MenuItemWrapper } from "./MenuItemWrapper";

export type MenuItemProps = {
  title: string;
  icon: IconType;
  isIconSelected?: boolean;
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
        <Icon
          as={props.icon}
          color={props.isIconSelected ? "green.500" : undefined}
          strokeWidth={"3px"}
        />
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
      asChild
      width={"100%"}
      textDecoration={"none"}
      _hover={{
        textDecoration: "none",
      }}
    >
      <NextLink href={props.href}>
        <MenuItemContent {...props} />
      </NextLink>
    </Link>
  ) : (
    <MenuItemContent {...props} />
  );
};
