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
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";

export const GetStartGetStartedScheduleDesk = () => {
  const [isElementHovered, setIsElementHovered] = useState(false);

  return (
    <Link
      href={"/app/schedule"}
      textDecoration={"none"}
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
          <Heading as={"h3"} fontSize={"md"} color={"gray.700"}>
            Schedule a desk for the next days
          </Heading>
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
            src={"/get-started-schedule-desk.png"}
            alt={"placeholder"}
            transition={"transform 0.25s ease-in-out"}
            transform={
              isElementHovered ? "translateY(0px)" : "translateY(10px)"
            }
          />
        </Box>
      </VStack>
    </Link>
  );
};
