import {
  Collapsible,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FiChevronDown } from "react-icons/fi";

import { useWorkplacifyTheme } from "../../../hooks/useWorkplacifyTheme";
import { NavItem } from "./types";

export const NavbarMobileItem = (props: NavItem) => {
  const { theme } = useWorkplacifyTheme();
  const { label, children, href } = props;

  const { open, onToggle } = useDisclosure();

  const linkColor = theme === "dark" ? "gray.200" : "gray.600";
  const borderColor = theme === "dark" ? "gray.200" : "gray.700";

  return (
    <Collapsible.Root open={open}>
      <Stack gap={4} onClick={children && onToggle}>
        <Link asChild>
          <NextLink href={!children && href ? href : "#"}>
            <Flex
              py={2}
              justify={"space-between"}
              align={"center"}
              _hover={{
                textDecoration: "none",
              }}
            >
              <Text fontWeight={600} color={linkColor}>
                {label}
              </Text>
              {children && (
                <Icon
                  as={FiChevronDown}
                  transition={"all .25s ease-in-out"}
                  transform={open ? "rotate(180deg)" : ""}
                  w={6}
                  h={6}
                />
              )}
            </Flex>
          </NextLink>
        </Link>

        <Collapsible.Content
          // animateOpacity
          style={{ marginTop: "0!important" }}
        >
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={"solid"}
            borderColor={borderColor}
            align={"start"}
          >
            {children?.map((child) => (
              <Link asChild key={child.label}>
                <NextLink href={child.href || "#"}>
                  <Text py={2} key={child.label}>
                    {child.label}
                  </Text>
                </NextLink>
              </Link>
            ))}
          </Stack>
        </Collapsible.Content>
      </Stack>
    </Collapsible.Root>
  );
};
