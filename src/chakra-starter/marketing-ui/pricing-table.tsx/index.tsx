import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Icon,
  Link,
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
          Plans that fit your organization
        </Heading>
        <Text fontSize="lg" color={"gray.500"}>
          Start with 3 month free trial. No credit card needed. Cancel at
          anytime.
        </Text>
        <Text fontSize="lg" color={"gray.500"}>
          Predictable pricing. No hidden fees. No usage fees or pricing per
          employee.
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
              >
                Easiest to start
              </Text>
            </Box>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Starter
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  $
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  10
                </Text>
                <Box fontSize="xl" color="gray.500">
                  per 10 users/month
                </Box>
              </HStack>
              <Text color={"gray.300"} fontSize={"sm"}>
                Taxes might apply additionally
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
                    Create up to 10 offices
                  </PricingFeatureListItem>
                  <PricingFeatureListItem>
                    Upload up to 50 floors
                  </PricingFeatureListItem>
                  <PricingFeatureListItem>
                    Invite up to 200 colleagues
                  </PricingFeatureListItem>
                  <PricingFeatureListItem>
                    Desk scheduling
                  </PricingFeatureListItem>
                  <PricingFeatureListItem>
                    Invitation templates
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
                      Coming soon
                    </Heading>
                  </Box>
                  <PricingFeatureListItem mode={"coming-soon"}>
                    Basic Workplace Analytics
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
                    Start desk scheduling
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
                      Start a free trial
                    </NextLink>
                  </Button>
                  <Text fontSize={"xs"} color={"gray.500"}>
                    Limited capabilities, no credit card required
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
                Large companies
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
                  per 10 users/month
                </Text>
              </HStack>
              <Text color={"gray.300"} fontSize={"sm"}>
                Taxes might apply additionally
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
                    Create unlimited offices
                  </PricingFeatureListItem>
                  <PricingFeatureListItem>
                    Upload unlimited floors
                  </PricingFeatureListItem>
                  <PricingFeatureListItem>
                    Invite unlimited colleagues
                  </PricingFeatureListItem>
                  <PricingFeatureListItem>
                    Desk scheduling
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
                      Coming soon
                    </Heading>
                  </Box>
                  <PricingFeatureListItem mode={"coming-soon"} comingSoon>
                    Advanced workplace analytics
                  </PricingFeatureListItem>
                  <PricingFeatureListItem mode={"coming-soon"} comingSoon>
                    Slack integration
                  </PricingFeatureListItem>
                  <PricingFeatureListItem mode={"coming-soon"} comingSoon>
                    Monthly email reports
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
                    Schedule a demo
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
                  <NextLink href={"/api/auth/signin"}>Subscribe</NextLink>
                </Button>
              </VStack>
            </VStack>
          </Box>
        </PriceWrapper>
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Enterprise
            </Text>
            <VStack paddingY={1}>
              <Box>
                <Text
                  color={"gray.400"}
                  fontSize={"sm"}
                  fontWeight={"normal"}
                  as={"p"}
                >
                  Tailored to your needs.
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
                  Contact us
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
                  Create unlimited offices
                </PricingFeatureListItem>
                <PricingFeatureListItem>
                  Upload unlimited floors
                </PricingFeatureListItem>
                <PricingFeatureListItem>SSO</PricingFeatureListItem>
                <PricingFeatureListItem>
                  Self-Hosting support
                </PricingFeatureListItem>
                <PricingFeatureListItem>
                  Workplacify creates your floor plans
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
                    Coming soon
                  </Heading>
                </Box>
                <PricingFeatureListItem mode={"coming-soon"} comingSoon>
                  25+ communication templates
                </PricingFeatureListItem>
                <PricingFeatureListItem mode={"coming-soon"} comingSoon>
                  custom SSO providers
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
                  Contact Us
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
