import {
  Box,
  Flex,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";

import { useWorkplacifyTheme } from "../../../hooks/useWorkplacifyTheme";
import { NavItem } from "./types";

export const NavbarDesktopSubMenu: React.FC<NavItem> = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useWorkplacifyTheme();
  const { label, href, subLabel } = props;

  const linkHoverBackgroundColor =
    theme === "dark" ? "orange.900" : "orange.50";

  return (
    <LinkBox
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: linkHoverBackgroundColor }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <HStack gap={2}>
            {props.tags?.map((tag) => {
              return (
                <Tag.Root
                  key={tag.label}
                  colorPalette={tag.colorPalette}
                  size={"sm"}
                >
                  <Tag.Label>{tag.label}</Tag.Label>
                </Tag.Root>
              );
            })}
            <LinkOverlay asChild>
              <NextLink href={href || "#"}>
                <Text
                  color={theme === "dark" ? "white" : "gray.800"}
                  transition={"all .3s ease"}
                  _groupHover={{ color: "orange.400" }}
                  fontWeight={500}
                >
                  {label}
                </Text>
              </NextLink>
            </LinkOverlay>
          </HStack>

          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={isHovered ? "translateX(0)" : "translateX(-10px)"}
          opacity={isHovered ? "100%" : "0"}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"orange.400"} w={5} h={5}>
            <FiChevronRight />
          </Icon>
        </Flex>
      </Stack>
    </LinkBox>
  );
};
