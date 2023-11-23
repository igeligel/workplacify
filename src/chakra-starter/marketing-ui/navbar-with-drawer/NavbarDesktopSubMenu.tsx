import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Flex,
  HStack,
  Icon,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";

import { NavItem } from "./types";

export const NavbarDesktopSubMenu: React.FC<NavItem> = (props) => {
  const { label, href, subLabel } = props;

  return (
    <Link
      href={href ?? "#"}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("orange.50", "orange.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <HStack spacing={2}>
            {props.tags?.map((tag) => {
              return (
                <Tag key={tag.label} colorScheme={tag.colorScheme} size={"sm"}>
                  {tag.label}
                </Tag>
              );
            })}
            <Text
              transition={"all .3s ease"}
              _groupHover={{ color: "orange.400" }}
              fontWeight={500}
            >
              {label}
            </Text>
          </HStack>

          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"orange.400"} w={5} h={5} as={FiChevronRight} />
        </Flex>
      </Stack>
    </Link>
  );
};
