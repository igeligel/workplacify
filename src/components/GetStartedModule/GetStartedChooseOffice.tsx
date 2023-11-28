import { Link } from "@chakra-ui/next-js";
import {
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";

import { useMenuStore } from "../../chakra-starter/application-ui/sidebar-with-header/menuStore";

export const GetStartedChooseOffice = () => {
  const {
    setIsOfficeSelectorOpen,
    setIsOfficeSelectorHighlighted,
    setIsSidebarOpen,
  } = useMenuStore((state) => ({
    setIsOfficeSelectorOpen: state.setIsOfficeSelectorOpen,
    setIsOfficeSelectorHighlighted: state.setIsOfficeSelectorHighlighted,
    setIsSidebarOpen: state.setIsSidebarOpen,
  }));
  const [isElementHovered, setIsElementHovered] = useState(false);

  const openSidebarAndOfficeSelector = () => {
    setIsSidebarOpen(true);
    setIsOfficeSelectorOpen(true);
    setIsOfficeSelectorHighlighted(true);
  };

  return (
    <Button
      variant={"link"}
      textDecoration={"none"}
      onClick={openSidebarAndOfficeSelector}
      _hover={{
        textDecoration: "none",
      }}
      onMouseEnter={() => {
        setIsElementHovered(true);
      }}
      onMouseLeave={() => {
        setIsElementHovered(false);
      }}
    >
      <VStack alignItems={"flex-start"} spacing={3}>
        <HStack>
          <Badge colorScheme="orange">new</Badge>
        </HStack>
        <VStack spacing={1} alignItems={"flex-start"} justifyContent={"center"}>
          <Tooltip label="In the menu you can choose an office">
            <Heading as={"h3"} fontSize={"md"} color={"gray.700"}>
              Choose your office
            </Heading>
          </Tooltip>
          <Text
            as={"span"}
            colorScheme="orange"
            color={"orange.400"}
            _hover={{
              textDecoration: "none",
              color: "orange.600",
            }}
          >
            <Button
              color={"orange.400"}
              _hover={{
                textDecoration: "none",
                color: "orange.600",
              }}
              as={Text}
              variant={"link"}
            >
              Start
            </Button>
            <Icon
              marginInlineStart={"0px !important"}
              boxSize={4}
              as={FiChevronRight}
              transform={"translateY(3px)"}
            />
          </Text>
        </VStack>
        <Box maxWidth={"80%"}>
          <Image
            borderTopLeftRadius={"lg"}
            borderTopRightRadius={"lg"}
            boxShadow={"lg"}
            src={"/get-started-select-office.png"}
            alt={"placeholder"}
            transition={"transform 0.25s ease-in-out"}
            transform={
              isElementHovered ? "translateY(0px)" : "translateY(10px)"
            }
          />
        </Box>
      </VStack>
    </Button>
  );
};
