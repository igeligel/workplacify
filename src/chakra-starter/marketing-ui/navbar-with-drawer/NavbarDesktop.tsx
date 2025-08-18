import { Box, HoverCard, Link, Portal, Stack } from "@chakra-ui/react";
import NextLink from "next/link";

import { useWorkplacifyTheme } from "../../../hooks/useWorkplacifyTheme";
import { NavbarDesktopSubMenu } from "./NavbarDesktopSubMenu";
import { NavItems } from "./types";

type NavbarDesktopProps = {
  navItems: NavItems;
};

export const NavbarDesktop: React.FC<NavbarDesktopProps> = (props) => {
  const { theme } = useWorkplacifyTheme();
  const linkColor = theme === "dark" ? "gray.200" : "gray.600";
  const hoverColor = theme === "dark" ? "white" : "gray.800";
  const popoverColor = theme === "dark" ? "gray.800" : "white";

  return (
    <Stack direction={"row"} gap={4}>
      {props.navItems.map((navItem) => (
        <HoverCard.Root
          positioning={{
            placement: "bottom-start",
            overlap: true,
          }}
          openDelay={50}
          closeDelay={50}
          key={navItem.label}
        >
          <Box>
            <HoverCard.Trigger>
              <Box>
                <Link
                  asChild
                  p={2}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: hoverColor,
                  }}
                >
                  <NextLink href={navItem.href || "#"}>
                    {navItem.label}
                  </NextLink>
                </Link>
              </Box>
            </HoverCard.Trigger>

            {navItem.children && (
              <Portal>
                <HoverCard.Positioner>
                  <HoverCard.Content
                    border={0}
                    boxShadow={"xl"}
                    bg={popoverColor}
                    p={4}
                    rounded={"xl"}
                    minW={"sm"}
                  >
                    <Stack>
                      {navItem.children.map((child) => (
                        <NavbarDesktopSubMenu key={child.label} {...child} />
                      ))}
                    </Stack>
                  </HoverCard.Content>
                </HoverCard.Positioner>
              </Portal>
            )}
          </Box>
        </HoverCard.Root>
      ))}
    </Stack>
  );
};
