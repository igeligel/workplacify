import { Stack, VStack, useColorModeValue } from "@chakra-ui/react";

import { NavbarAuthenticationElement } from "./NavbarAuthenticationElement";
import { NavbarMobileItem } from "./NavbarMobileItem";
import { NavItemsAsProps } from "./types";

export const NavbarMobile: React.FC<NavItemsAsProps> = (props) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {props.navItems.map((navItem) => (
        <NavbarMobileItem key={navItem.label} {...navItem} />
      ))}
      <VStack alignItems={"flex-start"}>
        <NavbarAuthenticationElement />
      </VStack>
    </Stack>
  );
};
