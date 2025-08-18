import { Stack, VStack } from "@chakra-ui/react";

import { useWorkplacifyTheme } from "../../../hooks/useWorkplacifyTheme";
import { NavbarAuthenticationElement } from "./NavbarAuthenticationElement";
import { NavbarMobileItem } from "./NavbarMobileItem";
import { NavItemsAsProps } from "./types";

export const NavbarMobile: React.FC<NavItemsAsProps> = (props) => {
  const { theme } = useWorkplacifyTheme();
  const bgColor = theme === "dark" ? "gray.800" : "white";

  return (
    <Stack bg={bgColor} p={4} display={{ md: "none" }}>
      {props.navItems.map((navItem) => (
        <NavbarMobileItem key={navItem.label} {...navItem} />
      ))}
      <VStack alignItems={"flex-start"}>
        <NavbarAuthenticationElement />
      </VStack>
    </Stack>
  );
};
