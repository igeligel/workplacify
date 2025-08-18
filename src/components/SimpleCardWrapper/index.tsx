import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import {
  FcBullish,
  FcCalendar,
  FcGenealogy,
  FcLike,
  FcOrganization,
} from "react-icons/fc";

import { useWorkplacifyTheme } from "../../hooks/useWorkplacifyTheme";

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
  href: string;
}

const Card = ({ heading, description, icon }: CardProps) => {
  const { theme } = useWorkplacifyTheme();
  const bgColor = theme === "dark" ? "gray.700" : "gray.100";
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={"start"} gap={2}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={bgColor}
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
          colorPalette={"orange"}
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
  const t = useTranslations("IndexPage");
  return (
    <Box p={{ base: 0, lg: 4 }}>
      <Stack gap={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
          {t("whyWorkplacify")}
        </Heading>
        <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
          {t("whyWorkplacifyDescription")}
        </Text>
      </Stack>

      <Container maxW={"5xl"} mt={{ base: 6, lg: 12 }}>
        <Flex flexWrap="wrap" gridGap={{ base: 4, lg: 12 }} justify="center">
          <Card
            heading={t("deskScheduling")}
            icon={<Icon as={FcCalendar} w={10} h={10} />}
            description={t("deskSchedulingDescription")}
            href={"#"}
          />
          <Card
            heading={t("officeManagement")}
            icon={<Icon as={FcOrganization} w={10} h={10} />}
            description={t("officeManagementDescription")}
            href={"#"}
          />
          <Card
            heading={t("officeAnalytics")}
            icon={<Icon as={FcBullish} w={10} h={10} />}
            description={t("officeAnalyticsDescription")}
            href={"#"}
          />
          <Card
            heading={t("floorPlanning")}
            icon={<Icon as={FcGenealogy} w={10} h={10} />}
            description={t("floorPlanningDescription")}
            href={"#"}
          />
          <Card
            heading={t("openSource")}
            icon={<Icon as={FcLike} w={10} h={10} />}
            description={t("openSourceDescription")}
            href={"#"}
          />
        </Flex>
      </Container>
    </Box>
  );
};
