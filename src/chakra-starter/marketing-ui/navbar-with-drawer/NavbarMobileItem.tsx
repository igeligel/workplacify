import { Link } from "@chakra-ui/next-js";
import {
  Collapse,
  Flex,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

import { NavItem } from "./types";

export const NavbarMobileItem = (props: NavItem) => {
  const { label, children, href } = props;

  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={!children && href ? href : "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={FiChevronDown}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children?.map((child) => (
            <Link href={child.href ?? "#"} py={2} key={child.label}>
              {child.label}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
