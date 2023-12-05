import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

import { NavbarDesktopSubMenu } from "./NavbarDesktopSubMenu";
import { NavItems } from "./types";

type NavbarDesktopProps = {
  navItems: NavItems;
};

export const NavbarDesktop: React.FC<NavbarDesktopProps> = (props) => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const hoverColor = useColorModeValue("gray.800", "white");
  const popoverColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {props.navItems.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box>
                <Link
                  href={navItem.href || "#"}
                  p={2}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: hoverColor,
                  }}
                >
                  {navItem.label}
                </Link>
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
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
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};
