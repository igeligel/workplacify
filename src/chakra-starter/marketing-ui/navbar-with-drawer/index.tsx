import {
  Box,
  Collapsible,
  Container,
  Flex,
  Icon,
  IconButton,
  // IconButton,
  Link,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { FiMenu, FiMinimize2 } from "react-icons/fi";

// import { FiMenu, FiMinimize2 } from "react-icons/fi";

import { WorkplacifyIcon } from "../../../components/WorkplacifyIcon";
import { useWorkplacifyTheme } from "../../../hooks/useWorkplacifyTheme";
// import { Logo } from "../Core/Logo";
import { NavbarAuthenticationElement } from "./NavbarAuthenticationElement";
import { NavbarDesktop } from "./NavbarDesktop";
import { NavbarMobile } from "./NavbarMobile";
import { NavItems } from "./types";

export const NavbarWithDrawer = () => {
  const { theme } = useWorkplacifyTheme();

  const bgColor = theme === "dark" ? "gray.800" : "hsla(0,0%,100%, 0.8)";
  const textColor = theme === "dark" ? "white" : "gray.600";
  const borderColor = theme === "dark" ? "gray.900" : "gray.200";
  const brandColor = theme === "dark" ? "white" : "gray.800";

  const t = useTranslations("Menu");
  const NAV_ITEMS: NavItems = [
    // {
    //   label: "Product",
    //   children: [
    //     {
    //       label: "Desk Management",
    //       subLabel: "...",
    //       href: "/product/desk-management",
    //       tags: [],
    //     },
    //     {
    //       label: "Office Utilization Reporting",
    //       subLabel: "...",
    //       href: "/product/office-utilization-reporting",
    //       tags: [],
    //     },
    //   ],
    // },

    {
      label: t("pricing"),
      href: "/#pricing",
    },
    {
      label: t("freeTools"),
      subLabel: t("freeToolsDescription"),
      children: [
        {
          label: t("hybridWorkplacePolicyGenerator"),
          subLabel: t("hybridWorkplacePolicyGeneratorDescription"),
          href: "/free-tools/hybrid-workplace-policy-generator",
        },
        {
          label: t("deskSchedulingEfficiencyCalculator"),
          subLabel: t("deskSchedulingEfficiencyCalculatorDescription"),
          href: "/free-tools/desk-scheduling-efficiency-calculator",
        },
      ],
    },
    {
      label: t("blog"),
      href: "/blog",
    },
  ];

  const { open, onToggle } = useDisclosure();
  return (
    <Box position="fixed" width={"100%"} zIndex={"999"} top={"0"}>
      <Collapsible.Root open={open}>
        <Flex
          bg={bgColor}
          color={textColor}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={borderColor}
          align={"center"}
          style={{
            backdropFilter: "saturate(180%) blur(5px)",
          }}
        >
          <Container maxW="7xl" display="flex" alignItems="center">
            <Flex
              flex={{ base: 1, md: "auto" }}
              ml={{ base: -2 }}
              display={{ base: "flex", md: "none" }}
            >
              <Collapsible.Trigger asChild>
                <IconButton
                  onClick={onToggle}
                  variant={"ghost"}
                  aria-label={"Toggle Navigation"}
                >
                  {open ? <FiMinimize2 /> : <FiMenu />}
                </IconButton>
              </Collapsible.Trigger>
            </Flex>
            <Flex
              flex={{ base: 1 }}
              justify={{ base: "center", md: "start" }}
              alignItems="center"
            >
              <Link
                asChild
                display="flex"
                alignItems="center"
                _hover={{
                  textDecoration: "none",
                }}
              >
                <NextLink href="/">
                  <Box maxWidth={"25px"}>
                    <Icon h={2} w={2} as={WorkplacifyIcon} />
                  </Box>
                  <Text
                    paddingLeft={2}
                    textAlign={useBreakpointValue({
                      base: "center",
                      md: "left",
                    })}
                    fontFamily={"heading"}
                    color={brandColor}
                    fontWeight="600"
                    textDecoration="none"
                    data-testid="navbar-brand"
                  >
                    workplacify
                  </Text>
                </NextLink>
              </Link>

              <Flex display={{ base: "none", md: "flex" }} ml={10}>
                <NavbarDesktop navItems={NAV_ITEMS} />
              </Flex>
            </Flex>

            <Stack
              visibility={useBreakpointValue({ base: "hidden", md: "visible" })}
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              gap={6}
            >
              <NavbarAuthenticationElement />
            </Stack>
          </Container>
        </Flex>

        <Collapsible.Content>
          <NavbarMobile navItems={NAV_ITEMS} />
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
};
