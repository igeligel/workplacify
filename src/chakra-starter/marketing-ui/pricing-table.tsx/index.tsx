import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Icon,
  List,
  Separator,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { ReactNode } from "react";
import { FiGithub } from "react-icons/fi";

import { useWorkplacifyTheme } from "../../../hooks/useWorkplacifyTheme";
import { CtaActionContainer } from "../BlogArticle/CtaActionContainer";
import { CtaActionContainerContent } from "../BlogArticle/CtaActionContainerContent";
import { PricingFeatureListItem } from "./PricingFeatureListItem";

type PriceWrapperProps = {
  children: ReactNode;
  isHighlighted?: boolean;
};
const PriceWrapper = (props: PriceWrapperProps) => {
  const { children, isHighlighted } = props;

  const { theme } = useWorkplacifyTheme();

  const borderColorHighlighted = theme === "dark" ? "orange.500" : "orange.200";
  const borderColorNotHighlighted = theme === "dark" ? "gray.500" : "gray.200";

  const borderColor = isHighlighted
    ? borderColorHighlighted
    : borderColorNotHighlighted;

  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth={isHighlighted ? "2px" : "1px"}
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={borderColor}
      borderRadius={"xl"}
      flex={{ base: "1", lg: "1 1 0px" }}
      width={{ base: "100%", lg: 0 }}
    >
      {children}
    </Box>
  );
};

export const ThreeTierPricing = () => {
  const t = useTranslations("IndexPage");
  const { theme } = useWorkplacifyTheme();
  const textBackgroundColor = theme === "dark" ? "orange.700" : "orange.300";
  const textColor = theme === "dark" ? "gray.300" : "gray.900";
  const highlightedBgColor = theme === "dark" ? "orange.700" : "orange.50";
  const notHighlightedBgColor = theme === "dark" ? "gray.800" : "gray.50";

  return (
    <Box>
      <VStack gap={2} textAlign="center">
        <Heading as="h2" fontSize="4xl" id="pricing">
          {t("plansThatFitYourOrganization")}
        </Heading>
        <Text fontSize="lg" color={"gray.500"}>
          {t("freeTrialDescription")}
        </Text>
        <Text fontSize="lg" color={"gray.500"}>
          {t("predictablePricing")}
        </Text>
      </VStack>
      <Stack
        direction={{ base: "column", md: "row" }}
        textAlign="center"
        justify="center"
        gap={{ base: 4, lg: 10 }}
        py={10}
      >
        <PriceWrapper isHighlighted={true}>
          <Box position="relative">
            <Box
              position="absolute"
              top="-16px"
              left="50%"
              style={{ transform: "translate(-50%)" }}
            >
              <Text
                textTransform="uppercase"
                bg={textBackgroundColor}
                px={3}
                py={1}
                color={textColor}
                fontSize="sm"
                fontWeight="600"
                rounded="xl"
                textWrap="nowrap"
              >
                {t("easiestToStart")}
              </Text>
            </Box>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                {t("starter")}
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  $
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  10
                </Text>
                <Box fontSize="xl" color="gray.500">
                  {t("per10UsersMonth")}
                </Box>
              </HStack>
              <Text color={"gray.300"} fontSize={"sm"}>
                {t("taxesMightApplyAdditionally")}
              </Text>
            </Box>
            <VStack bg={highlightedBgColor} py={4} borderBottomRadius={"xl"}>
              <List.Root asChild>
                <Box
                  as={"ul"}
                  gap={2.5}
                  textAlign="start"
                  px={8}
                  minWidth={"100%"}
                  listStyleType="circle"
                >
                  <PricingFeatureListItem>
                    {t("createUpTo10Offices")}
                  </PricingFeatureListItem>
                  <PricingFeatureListItem>
                    {t("uploadUpTo50Floors")}
                  </PricingFeatureListItem>
                  <PricingFeatureListItem>
                    {t("inviteUpTo200Colleagues")}
                  </PricingFeatureListItem>
                  <PricingFeatureListItem>
                    {t("deskScheduling")}
                  </PricingFeatureListItem>
                  <PricingFeatureListItem>
                    {t("invitationTemplates")}
                  </PricingFeatureListItem>
                  <Separator role="presentation" />
                  <Box
                    as={"li"}
                    role="listitem"
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Heading
                      as={"h3"}
                      fontSize={"sm"}
                      color={"gray.400"}
                      fontWeight={"semibold"}
                    >
                      {t("comingSoon")}
                    </Heading>
                  </Box>
                  <PricingFeatureListItem mode={"coming-soon"}>
                    {t("basicWorkplaceAnalytics")}
                  </PricingFeatureListItem>
                </Box>
              </List.Root>
              <VStack w="80%" pt={4} gap={2}>
                <Button
                  asChild
                  w="full"
                  colorPalette="orange"
                  variant="outline"
                  textDecoration={"none"}
                  backgroundColor={"white"}
                  _hover={{
                    textDecoration: "none",
                    background: "orange.100",
                  }}
                  // onClick={async (e) => {
                  //   router.push("/signup");
                  // }}
                >
                  <NextLink href={"/api/auth/signin"}>
                    {t("startDeskScheduling")}
                  </NextLink>
                </Button>

                <VStack w={"full"} gap={1}>
                  <Button
                    asChild
                    w="full"
                    colorPalette="orange"
                    textDecoration={"none"}
                    _hover={{
                      textDecoration: "none",
                    }}
                  >
                    <NextLink href={"/api/auth/signin"}>
                      {t("startFreeTrial")}
                    </NextLink>
                  </Button>
                  <Text fontSize={"xs"} color={"gray.500"}>
                    {t("limitedCapabilitiesNoCreditCardRequired")}
                  </Text>
                </VStack>
              </VStack>
            </VStack>
          </Box>
        </PriceWrapper>

        <PriceWrapper>
          <Box position="relative">
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                {t("largeCompanies")}
              </Text>
              <Text fontWeight="500">{">"} 200 employees</Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  $
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  5
                </Text>
                <Text fontSize="xl" color="gray.500">
                  {t("per10UsersMonth")}
                </Text>
              </HStack>
              <Text color={"gray.300"} fontSize={"sm"}>
                {t("taxesMightApplyAdditionally")}
              </Text>
            </Box>
            <VStack bg={notHighlightedBgColor} py={4} borderBottomRadius={"xl"}>
              <List.Root asChild>
                <Box
                  as={"ul"}
                  gap={2.5}
                  textAlign="start"
                  px={8}
                  minWidth={"100%"}
                  listStyleType="circle"
                >
                  <PricingFeatureListItem>
                    {t("createUnlimitedOffices")}
                  </PricingFeatureListItem>
                  <PricingFeatureListItem>
                    {t("uploadUnlimitedFloors")}
                  </PricingFeatureListItem>
                  <PricingFeatureListItem>
                    {t("inviteUnlimitedColleagues")}
                  </PricingFeatureListItem>
                  <PricingFeatureListItem>
                    {t("deskScheduling")}
                  </PricingFeatureListItem>
                  <Separator role="presentation" />
                  <Box
                    as={"li"}
                    role="listitem"
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Heading
                      as={"h3"}
                      fontSize={"sm"}
                      color={"gray.400"}
                      fontWeight={"semibold"}
                    >
                      {t("comingSoon")}
                    </Heading>
                  </Box>
                  <PricingFeatureListItem mode={"coming-soon"} comingSoon>
                    {t("advancedWorkplaceAnalytics")}
                  </PricingFeatureListItem>
                  <PricingFeatureListItem mode={"coming-soon"} comingSoon>
                    {t("slackIntegration")}
                  </PricingFeatureListItem>
                  <PricingFeatureListItem mode={"coming-soon"} comingSoon>
                    {t("monthlyEmailReports")}
                  </PricingFeatureListItem>
                </Box>
              </List.Root>
              <VStack w="80%" pt={4}>
                <Button
                  asChild
                  w="full"
                  colorPalette="orange"
                  variant={"outline"}
                  background={"white"}
                  textDecoration={"none"}
                  _hover={{
                    textDecoration: "none",
                    background: "orange.100",
                  }}
                >
                  <NextLink
                    target="_blank"
                    href={"https://calendar.app.google/N3vdeHJkt452xi2XA"}
                  >
                    {t("scheduleADemo")}
                  </NextLink>
                </Button>

                <Button
                  asChild
                  w="full"
                  colorPalette="orange"
                  textDecoration={"none"}
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  <NextLink href={"/api/auth/signin"}>
                    {t("subscribe")}
                  </NextLink>
                </Button>
              </VStack>
            </VStack>
          </Box>
        </PriceWrapper>
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              {t("enterprise")}
            </Text>
            <VStack paddingY={1}>
              <Box>
                <Text
                  color={"gray.400"}
                  fontSize={"sm"}
                  fontWeight={"normal"}
                  as={"p"}
                >
                  {t("tailoredToYourNeeds")}
                </Text>
              </Box>
              <Button
                asChild
                colorPalette={"orange"}
                variant={"outline"}
                textDecoration={"none"}
                _hover={{
                  backgroundColor: "orange.100",
                  textDecoration: "none",
                }}
              >
                <NextLink
                  target="_blank"
                  href={
                    "mailto:kevinigeligeligel@gmail.com?subject=workplacify enterprise"
                  }
                >
                  {t("contactUs")}
                </NextLink>
              </Button>
            </VStack>
          </Box>
          <VStack bg={notHighlightedBgColor} py={4} borderBottomRadius={"xl"}>
            <List.Root asChild>
              <Box
                as={"ul"}
                gap={2.5}
                textAlign="start"
                px={8}
                minWidth={"100%"}
                listStyleType="circle"
              >
                <PricingFeatureListItem>
                  {t("createUnlimitedOffices")}
                </PricingFeatureListItem>
                <PricingFeatureListItem>
                  {t("uploadUnlimitedFloors")}
                </PricingFeatureListItem>
                <PricingFeatureListItem>{t("sso")}</PricingFeatureListItem>
                <PricingFeatureListItem>
                  {t("selfHostingSupport")}
                </PricingFeatureListItem>
                <PricingFeatureListItem>
                  {t("floorPlans")}
                </PricingFeatureListItem>
                <Separator role="presentation" />
                <Box
                  as={"li"}
                  role="listitem"
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Heading
                    as={"h3"}
                    fontSize={"sm"}
                    color={"gray.400"}
                    fontWeight={"semibold"}
                  >
                    {t("comingSoon")}
                  </Heading>
                </Box>
                <PricingFeatureListItem mode={"coming-soon"} comingSoon>
                  {t("twentyFivePlusCommunicationTemplates")}
                </PricingFeatureListItem>
                <PricingFeatureListItem mode={"coming-soon"} comingSoon>
                  {t("customSsoProviders")}
                </PricingFeatureListItem>
              </Box>
            </List.Root>
            <Box w="80%" pt={7}>
              <Button
                textDecoration={"none"}
                asChild
                w="full"
                colorPalette="orange"
                _hover={{
                  textDecoration: "none",
                }}
              >
                <NextLink
                  target="_blank"
                  href={
                    "mailto:workplacify@gmail.com?subject=Workplacify inquiry"
                  }
                >
                  {t("contactUs")}
                </NextLink>
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>
      </Stack>
      <Container maxW={"5xl"}>
        <CtaActionContainer
          ctaContent={
            <CtaActionContainerContent
              title={t("openSourceCtaTitle")}
              description={t("openSourceCtaDescription")}
            />
          }
          ctaAction={
            <Button asChild>
              <NextLink
                href={"https://github.com/igeligel/workplacify"}
                target="_blank"
              >
                {t.rich("openSourceCtaButton", {
                  githubIcon: () => (
                    <Icon>
                      <FiGithub />
                    </Icon>
                  ),
                })}
              </NextLink>
            </Button>
          }
        />
      </Container>
    </Box>
  );
};
