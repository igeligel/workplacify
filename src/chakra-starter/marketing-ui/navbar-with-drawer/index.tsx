import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Collapse,
  Container,
  Flex,
  Icon, // Icon,
  IconButton,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { FiMenu, FiMinimize2 } from "react-icons/fi";

import { WorkplacifyIcon } from "../../../components/WorkplacifyIcon";
// import { Logo } from "../Core/Logo";
import { NavbarAuthenticationElement } from "./NavbarAuthenticationElement";
import { NavbarDesktop } from "./NavbarDesktop";
import { NavbarMobile } from "./NavbarMobile";
import { NavItems } from "./types";

export const NavbarWithDrawer = () => {
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
  ];

  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box position="fixed" width={"100%"} zIndex={"999"} top={"0"}>
      <Flex
        bg={useColorModeValue("hsla(0,0%,100%, 0.8)", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        style={{
          backdropFilter: "saturate(180%) blur(5px)",
        }}
      >
        <Container maxW="container.xl" display="flex" alignItems="center">
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <FiMinimize2 /> : <FiMenu />}
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Flex
            flex={{ base: 1 }}
            justify={{ base: "center", md: "start" }}
            alignItems="center"
          >
            <Link
              href="/"
              display="flex"
              alignItems="center"
              _hover={{
                textDecoration: "none",
              }}
            >
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
                color={useColorModeValue("gray.800", "white")}
                fontWeight="600"
                textDecoration="none"
                data-testid="navbar-brand"
              >
                workplacify
              </Text>
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
            spacing={6}
          >
            <NavbarAuthenticationElement />
          </Stack>
        </Container>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <NavbarMobile navItems={NAV_ITEMS} />
      </Collapse>
    </Box>
  );
};
