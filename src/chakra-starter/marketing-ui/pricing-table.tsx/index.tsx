import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";

import { PricingFeatureListItem } from "./PricingFeatureListItem";

type PriceWrapperProps = {
  children: ReactNode;
  isHighlighted?: boolean;
};
const PriceWrapper = (props: PriceWrapperProps) => {
  const { children, isHighlighted } = props;

  const borderColorHighlighted = useColorModeValue("orange.200", "orange.500");
  const borderColorNotHighlighted = useColorModeValue("gray.200", "gray.500");

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
  return (
    <Box>
      <VStack spacing={2} textAlign="center">
        <Heading as="h2" fontSize="4xl" id="pricing">
          Plans that fit your organization
        </Heading>
        <Text fontSize="lg" color={"gray.500"}>
          Start with 3 month free trial. No credit card needed. Cancel at
          anytime.
        </Text>
        <Text fontSize="lg" color={"gray.500"}>
          Simple, transparent pricing with no hidden fees.
        </Text>
      </VStack>
      <Stack
        direction={{ base: "column", md: "row" }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
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
                bg={useColorModeValue("orange.300", "orange.700")}
                px={3}
                py={1}
                color={useColorModeValue("gray.900", "gray.300")}
                fontSize="sm"
                fontWeight="600"
                rounded="xl"
              >
                Most popular
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
                  1
                </Text>
                <Box fontSize="xl" color="gray.500">
                  <Text>per user/month</Text>
                </Box>
              </HStack>
              <Text color={"gray.500"} fontSize={"sm"}>
                Billed monthly • Save 20% with annual billing
              </Text>
            </Box>
            <VStack
              bg={useColorModeValue("orange.50", "gray.700")}
              py={4}
              borderBottomRadius={"xl"}
            >
              <List spacing={2.5} textAlign="start" px={8} minWidth={"100%"}>
                <PricingFeatureListItem>
                  Create up to 10 offices
                </PricingFeatureListItem>
                <PricingFeatureListItem>
                  Upload up to 50 floors
                </PricingFeatureListItem>
                <PricingFeatureListItem>
                  Invite up to 200 colleagues
                </PricingFeatureListItem>
                <PricingFeatureListItem>Desk scheduling</PricingFeatureListItem>
                <PricingFeatureListItem>
                  Invitation templates
                </PricingFeatureListItem>
                <Divider role="presentation" />
                <ListItem role="listitem">
                  <Heading
                    as={"h3"}
                    fontSize={"sm"}
                    color={"gray.400"}
                    fontWeight={"semibold"}
                  >
                    Coming soon
                  </Heading>
                </ListItem>
                <PricingFeatureListItem mode={"coming-soon"}>
                  Basic Workplace Analytics
                </PricingFeatureListItem>
              </List>
              <VStack w="80%" pt={4} spacing={2}>
                <Button
                  href={"/api/auth/signin"}
                  as={Link}
                  w="full"
                  colorScheme="orange"
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
                  Start desk scheduling
                </Button>

                <Box w={"full"}>
                  <Button
                    href={"/api/auth/signin"}
                    as={Link}
                    w="full"
                    colorScheme="orange"
                    textDecoration={"none"}
                    _hover={{
                      textDecoration: "none",
                    }}
                  >
                    Start a free trial
                  </Button>
                  <Text fontSize={"xs"} color={"gray.500"}>
                    Limited capabilities, no credit card required
                  </Text>
                </Box>
              </VStack>
            </VStack>
          </Box>
        </PriceWrapper>

        <PriceWrapper>
          <Box position="relative">
            <Box
              position="absolute"
              top="-16px"
              left="50%"
              style={{ transform: "translate(-50%)" }}
            >
              <Text
                textTransform="uppercase"
                bg={useColorModeValue("orange.300", "orange.700")}
                px={3}
                py={1}
                color={useColorModeValue("gray.900", "gray.300")}
                fontSize="sm"
                fontWeight="600"
                rounded="xl"
              >
                Best value
              </Text>
            </Box>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Large companies
              </Text>
              <Text fontWeight="500" color="gray.500">
                {">"} 200 employees
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  $
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  0.50
                </Text>
                <Box fontSize="xl" color="gray.500">
                  <Text>per user/month</Text>
                </Box>
              </HStack>
              <Text color={"gray.500"} fontSize={"sm"}>
                Billed monthly • Save 20% with annual billing
              </Text>
            </Box>
            <VStack
              bg={useColorModeValue("gray.50", "gray.700")}
              py={4}
              borderBottomRadius={"xl"}
            >
              <List spacing={2.5} textAlign="start" px={8} minWidth={"100%"}>
                <PricingFeatureListItem>
                  Create unlimited offices
                </PricingFeatureListItem>
                <PricingFeatureListItem>
                  Upload unlimited floors
                </PricingFeatureListItem>
                <PricingFeatureListItem>
                  Invite unlimited colleagues
                </PricingFeatureListItem>
                <PricingFeatureListItem>Desk scheduling</PricingFeatureListItem>
                <Divider role="presentation" />
                <ListItem role="listitem">
                  <Heading
                    as={"h3"}
                    fontSize={"sm"}
                    color={"gray.400"}
                    fontWeight={"semibold"}
                  >
                    Coming soon
                  </Heading>
                </ListItem>
                <PricingFeatureListItem mode={"coming-soon"} comingSoon>
                  Advanced workplace analytics
                </PricingFeatureListItem>
                <PricingFeatureListItem mode={"coming-soon"} comingSoon>
                  Slack integration
                </PricingFeatureListItem>
                <PricingFeatureListItem mode={"coming-soon"} comingSoon>
                  Monthly email reports
                </PricingFeatureListItem>
              </List>
              <VStack w="80%" pt={4}>
                <Box w={"full"}>
                  <Button
                    href={"/api/auth/signin"}
                    as={Link}
                    w="full"
                    colorScheme="orange"
                    textDecoration={"none"}
                    _hover={{
                      textDecoration: "none",
                    }}
                  >
                    Start a free trial
                  </Button>
                  <Text fontSize={"xs"} color={"gray.500"}>
                    Limited capabilities, no credit card required
                  </Text>
                </Box>
                <Button
                  href={"https://calendar.app.google/N3vdeHJkt452xi2XA"}
                  as={Link}
                  w="full"
                  colorScheme="orange"
                  variant={"outline"}
                  background={"white"}
                  target={"_blank"}
                  textDecoration={"none"}
                  _hover={{
                    textDecoration: "none",
                    background: "orange.100",
                  }}
                >
                  Schedule a demo
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
                href={
                  "mailto:kevinigeligeligel@gmail.com?subject=workplacify enterprise"
                }
                as={Link}
                colorScheme={"orange"}
                variant={"outline"}
                target="_blank"
                textDecoration={"none"}
                _hover={{
                  backgroundColor: "orange.100",
                  textDecoration: "none",
                }}
              >
                Contact us
              </Button>
            </VStack>
          </Box>
          <VStack
            bg={useColorModeValue("gray.50", "gray.700")}
            py={4}
            borderBottomRadius={"xl"}
          >
            <List spacing={2.5} textAlign="start" px={8} minWidth={"100%"}>
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
              <Divider role="presentation" />
              <ListItem role="listitem">
                <Heading
                  as={"h3"}
                  fontSize={"sm"}
                  color={"gray.400"}
                  fontWeight={"semibold"}
                >
                  Coming soon
                </Heading>
              </ListItem>
              <PricingFeatureListItem mode={"coming-soon"} comingSoon>
                25+ communication templates
              </PricingFeatureListItem>
              <PricingFeatureListItem mode={"coming-soon"} comingSoon>
                custom SSO providers
              </PricingFeatureListItem>
            </List>
            <Box w="80%" pt={7}>
              <Button
                textDecoration={"none"}
                href={
                  "mailto :hello@hackathon.camp?subject=Hackathon.camp enterprise"
                }
                target={"_blank"}
                as={Link}
                w="full"
                colorScheme="orange"
                _hover={{
                  textDecoration: "none",
                }}
              >
                Contact Us
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>
      </Stack>
    </Box>
  );
};
