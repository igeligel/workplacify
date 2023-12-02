import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import {
  FcBullish,
  FcCalendar,
  FcGenealogy,
  FcLike,
  FcOrganization,
} from "react-icons/fc";

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
  href: string;
}

const Card = ({ heading, description, icon }: CardProps) => {
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={"start"} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={useColorModeValue("gray.100", "gray.700")}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={"sm"}>
            {description}
          </Text>
        </Box>
        {/* <Button
          as={Link}
          variant={"link"}
          colorScheme={"orange"}
          size={"sm"}
          href={href}
        >
          Learn more
        </Button> */}
      </Stack>
    </Box>
  );
};

export const SimpleCardWrapper = () => {
  return (
    <Box p={{ base: 0, lg: 4 }}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
          Why workplacify?
        </Heading>
        <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
          The first open-source, self-hostable desk scheduling platform. Helping
          your employees to get their favorite desk and optimize your office
          spending with advanced analytics.
        </Text>
      </Stack>

      <Container maxW={"5xl"} mt={{ base: 6, lg: 12 }}>
        <Flex flexWrap="wrap" gridGap={{ base: 4, lg: 12 }} justify="center">
          <Card
            heading={"Desk scheduling"}
            icon={<Icon as={FcCalendar} w={10} h={10} />}
            description={
              "Ever had too many people in the office? We got you covered."
            }
            href={"#"}
          />
          <Card
            heading={"Office management"}
            icon={<Icon as={FcOrganization} w={10} h={10} />}
            description={
              "Manage multiple offices, with multiple floors. Perfect for growing companies."
            }
            href={"#"}
          />
          <Card
            heading={"Office analytics"}
            icon={<Icon as={FcBullish} w={10} h={10} />}
            description={
              "Want to save costs on office space? Our analytic tools will help you do just that."
            }
            href={"#"}
          />
          <Card
            heading={"Floor planning"}
            icon={<Icon as={FcGenealogy} w={10} h={10} />}
            description={
              "Assign desks to your floors and create outstanding floor maps."
            }
            href={"#"}
          />
          <Card
            heading={"Open-source"}
            icon={<Icon as={FcLike} w={10} h={10} />}
            description={
              "Self-host our software and customize it to your needs. We are open-source!"
            }
            href={"#"}
          />
        </Flex>
      </Container>
    </Box>
  );
};
