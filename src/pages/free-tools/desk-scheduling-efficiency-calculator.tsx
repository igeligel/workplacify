import {
  Box,
  Button,
  Container,
  Field,
  Heading,
  Icon,
  Input,
  InputGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as htmlToImage from "html-to-image";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import NextLink from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiCopy } from "react-icons/fi";

import { CtaActionContainer } from "../../components/CtaActionContainer";
import { Faq } from "../../components/Faq";
import { FeatureSplitted } from "../../components/FeatureSplitted";
import { FreeToolHero } from "../../components/FreeToolHero";
import { FreeToolHeroHeading } from "../../components/FreeToolHeroHeading";
import { FreeToolHeroText } from "../../components/FreeToolHeroText";
import { toaster } from "../../components/ui/toaster";
import { getMessages } from "../../messages/getMessages";

const baseUrl = "https://workplacify.com";
const url = `${baseUrl}/free-tools/desk-scheduling-efficiency-calculator`;

const DeskSchedulingEfficiencyCalculator = () => {
  const { status } = useSession();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const t = useTranslations("DeskSchedulingEfficiencyCalculator");

  // Effect to handle loading state
  useEffect(() => {
    if (status === "loading") {
      setIsInitialLoading(true);
    } else {
      setIsInitialLoading(false);
    }
  }, [status]);

  // Form state
  const [numEmployees, setNumEmployees] = useState("");
  const [numDesks, setNumDesks] = useState("");
  const [deskUtilization, setDeskUtilization] = useState("");
  const [avgSalary, setAvgSalary] = useState("");
  const [officeSpaceCost, setOfficeSpaceCost] = useState("");

  // Results state
  const [timeSaved, setTimeSaved] = useState<number | null>(null);
  const [costSaved, setCostSaved] = useState<number | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);
  const [isCopying, setIsCopying] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const copyToClipboard = useCallback(async () => {
    if (resultRef.current) {
      try {
        setIsCopying(true);
        setCopySuccess(false);
        setIsGeneratingImage(true); // Hide buttons before generating image

        const canvas = await htmlToImage.toCanvas(resultRef.current, {
          skipFonts: true,
          imagePlaceholder: undefined,
          pixelRatio: 2,
          style: {
            // Explicitly set styles to avoid accessing CSS rules
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            backgroundColor: "#fff4e6", // orange.50
            color: "#2D3748", // gray.700
          },
        });

        setIsGeneratingImage(false); // Show buttons again after generating image

        canvas.toBlob(
          async (blob) => {
            if (blob) {
              try {
                await navigator.clipboard.write([
                  new ClipboardItem({
                    "image/png": blob,
                  }),
                ]);
                setCopySuccess(true);
                toaster.create({
                  title: "Success",
                  description: "Image copied to clipboard!",
                  type: "success",
                  duration: 3000,
                  closable: true,
                });
              } catch (err) {
                console.error("Failed to copy to clipboard:", err);
                // Fallback: offer download if clipboard fails
                const link = document.createElement("a");
                link.download = "desk-scheduling-savings.png";
                link.href = canvas.toDataURL("image/png");
                link.click();
                toaster.create({
                  title: "Notice",
                  description:
                    "Image downloaded instead of copied to clipboard",
                  type: "info",
                  duration: 3000,
                  closable: true,
                });
              }
            }
          },
          "image/png",
          1.0,
        );
      } catch (err) {
        console.error("Failed to generate image:", err);
        setIsGeneratingImage(false); // Make sure to show buttons if there's an error
        toaster.create({
          title: "Error",
          description:
            "Failed to generate image. Please try downloading instead.",
          type: "error",
          duration: 3000,
          closable: true,
        });
      } finally {
        setIsCopying(false);
      }
    }
  }, []);

  const calculateSavings = () => {
    // Validate required fields
    if (
      !numEmployees ||
      !numDesks ||
      !deskUtilization ||
      !avgSalary ||
      !officeSpaceCost
    ) {
      toaster.create({
        title: t("form.errors.missingFields.title"),
        description: t("form.errors.missingFields.description"),
        type: "error",
        duration: 3000,
        closable: true,
      });
      return;
    }

    // Convert inputs to numbers
    const employees = parseInt(numEmployees);
    const desks = parseInt(numDesks);
    const utilization = parseInt(deskUtilization) / 100;
    const salary = parseFloat(avgSalary);
    const spaceCost = parseFloat(officeSpaceCost);

    // Calculate time savings (assuming 2 hours per week spent searching for desks)
    const hoursPerWeek = 2;
    const weeksPerYear = 52;
    const hourlyRate = salary / (weeksPerYear * 40); // Assuming 40-hour work week
    const timeSavedPerYear =
      employees * hoursPerWeek * weeksPerYear * (1 - utilization);
    const timeCostSaved = timeSavedPerYear * hourlyRate;

    // Calculate space cost savings based on desk optimization
    const potentialDeskReduction = Math.max(
      0,
      desks - Math.ceil(employees * utilization),
    );
    const costPerDesk = spaceCost / desks;
    const spaceCostSaved = potentialDeskReduction * costPerDesk * 12;

    // Total cost saved is time cost savings plus space cost savings
    const totalCostSaved = timeCostSaved + spaceCostSaved;

    setTimeSaved(Math.round(timeSavedPerYear));
    setCostSaved(Math.round(totalCostSaved));
  };

  return (
    <>
      <NextSeo
        title={t("meta.title")}
        description={t("meta.description")}
        canonical={url}
        openGraph={{
          url,
          title: t("meta.title"),
          description: t("meta.description"),
          type: "website",
          images: [
            {
              url: `${baseUrl}/og-images/desk-scheduling-efficiency-calculator.png`,
              width: 1200,
              height: 630,
              alt: t("meta.imageAlt"),
            },
          ],
        }}
        twitter={{
          handle: "@WorkplacifyCamp",
          cardType: "summary_large_image",
          site: "@WorkplacifyCamp",
        }}
      />

      <Container maxW="6xl">
        <FreeToolHero
          heading={
            <FreeToolHeroHeading>{t("hero.heading")}</FreeToolHeroHeading>
          }
          text={<FreeToolHeroText>{t("hero.text")}</FreeToolHeroText>}
        />

        <Container maxW={"3xl"} paddingTop={8} paddingX={0}>
          <Stack gap={6}>
            <Field.Root>
              <Field.Label>{t("form.numEmployees.label")}</Field.Label>
              <Input
                type="number"
                value={numEmployees}
                onChange={(e) => setNumEmployees(e.target.value)}
                placeholder={t("form.numEmployees.placeholder")}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>{t("form.numDesks.label")}</Field.Label>
              <Input
                type="number"
                value={numDesks}
                onChange={(e) => setNumDesks(e.target.value)}
                placeholder={t("form.numDesks.placeholder")}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>{t("form.deskUtilization.label")}</Field.Label>
              <InputGroup startElement="%">
                <Input
                  type="number"
                  value={deskUtilization}
                  onChange={(e) => setDeskUtilization(e.target.value)}
                  placeholder={t("form.deskUtilization.placeholder")}
                />
              </InputGroup>
            </Field.Root>

            <Field.Root>
              <Field.Label>{t("form.avgSalary.label")}</Field.Label>
              <InputGroup startElement="$">
                <Input
                  type="number"
                  value={avgSalary}
                  onChange={(e) => setAvgSalary(e.target.value)}
                  placeholder={t("form.avgSalary.placeholder")}
                />
              </InputGroup>
            </Field.Root>

            <Field.Root>
              <Field.Label>{t("form.officeSpaceCost.label")}</Field.Label>
              <InputGroup startElement="$">
                <Input
                  type="number"
                  value={officeSpaceCost}
                  onChange={(e) => setOfficeSpaceCost(e.target.value)}
                  placeholder={t("form.officeSpaceCost.placeholder")}
                />
              </InputGroup>
            </Field.Root>

            <Button
              colorPalette="orange"
              size="lg"
              onClick={calculateSavings}
              loading={isInitialLoading}
              loadingText={t("form.calculatingButton")}
            >
              {t("form.calculateButton")}
            </Button>
          </Stack>

          {timeSaved !== null && costSaved !== null && (
            <>
              <Box
                ref={resultRef}
                mt={8}
                p={8}
                borderRadius="xl"
                bg="orange.50"
                border="2px"
                borderColor="orange.200"
                boxShadow="lg"
                position="relative"
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  top={0}
                  right={0}
                  bg="orange.100"
                  py={1}
                  px={4}
                  borderBottomLeftRadius="md"
                >
                  <Text fontSize="sm" color="orange.700" fontWeight="medium">
                    Powered by Workplacify
                  </Text>
                </Box>
                <VStack gap={6} align="stretch">
                  <Heading size="lg" color="orange.700" textAlign="center">
                    {t("results.heading")}
                  </Heading>
                  <Box
                    p={6}
                    bg="white"
                    borderRadius="lg"
                    border="1px"
                    borderColor="orange.100"
                  >
                    <VStack gap={4} align="stretch">
                      <Box>
                        <Text
                          fontSize="xl"
                          fontWeight="bold"
                          color="gray.700"
                          mb={1}
                        >
                          {t("results.timeEfficiency.title")}
                        </Text>
                        <Text
                          fontSize="3xl"
                          fontWeight="bold"
                          color="orange.500"
                        >
                          {timeSaved.toLocaleString()}{" "}
                          {t("results.timeEfficiency.hours")}
                        </Text>
                        <Text fontSize="md" color="gray.600">
                          {t("results.timeEfficiency.perYear")}
                        </Text>
                      </Box>
                      <Box>
                        <Text
                          fontSize="xl"
                          fontWeight="bold"
                          color="gray.700"
                          mb={1}
                        >
                          {t("results.costEfficiency.title")}
                        </Text>
                        <Text
                          fontSize="3xl"
                          fontWeight="bold"
                          color="orange.500"
                        >
                          ${costSaved.toLocaleString()}
                        </Text>
                        <Text fontSize="md" color="gray.600">
                          {t("results.costEfficiency.perYear")}
                        </Text>
                      </Box>
                    </VStack>
                  </Box>
                  <VStack gap={3} display={isGeneratingImage ? "none" : "flex"}>
                    <Button
                      asChild
                      colorPalette="orange"
                      size="lg"
                      width="full"
                    >
                      <NextLink href="/api/auth/signin">
                        {t("results.ctaButton")}
                      </NextLink>
                    </Button>
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      colorPalette="orange"
                      size="md"
                      width="full"
                      loading={isCopying}
                      loadingText="Copying..."
                    >
                      <Icon as={FiCopy} />
                      Copy as Image
                    </Button>
                    {copySuccess && (
                      <Text color="green.500" fontSize="sm" fontWeight="medium">
                        ✓ Image copied to clipboard!
                      </Text>
                    )}
                  </VStack>
                </VStack>
              </Box>
            </>
          )}
        </Container>

        <FeatureSplitted
          marginTop={{ base: 12, md: 24 }}
          tag={t("features.tag")}
          heading={t("features.title")}
          headingAs="h2"
          description={
            <>
              <Text as="p" fontSize={"xl"}>
                {t("features.description")}
              </Text>
              <Stack gap={2} mt={4}>
                <Text as="p" fontSize={"xl"}>
                  • {t("features.benefits.first")}
                </Text>
                <Text as="p" fontSize={"xl"}>
                  • {t("features.benefits.second")}
                </Text>
                <Text as="p" fontSize={"xl"}>
                  • {t("features.benefits.third")}
                </Text>
                <Text as="p" fontSize={"xl"}>
                  • {t("features.benefits.fourth")}
                </Text>
              </Stack>
            </>
          }
          image="/desk-scheduling-efficiency-calculator-preview.png"
          alt={t("meta.imageAlt")}
        />

        <Box marginTop={{ base: 12, lg: 24 }}>
          <CtaActionContainer>
            <Box
              display={"flex"}
              flexDirection={{ base: "column", lg: "row" }}
              alignItems={{ base: "flex-start", lg: "center" }}
              justifyContent={"space-between"}
              width={"100%"}
              gap={4}
            >
              <Box maxWidth={"600px"}>
                <Heading
                  as="h3"
                  fontSize={{ base: "xl", lg: "2xl" }}
                  color={"gray.700"}
                  marginBottom={2}
                  textAlign={"center"}
                >
                  {t("cta.heading")}
                </Heading>
                <Text
                  fontSize={"md"}
                  color={"gray.600"}
                  maxWidth={"380px"}
                  textAlign={"center"}
                  margin={"0 auto"}
                >
                  {t("cta.description")}
                </Text>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                width={"100%"}
                maxWidth="400px"
                marginTop={{ base: "4", lg: "0" }}
                flex={1}
                justifyContent={"center"}
              >
                <Button
                  asChild
                  variant={"solid"}
                  color={"white"}
                  colorPalette={"orange"}
                  background={"orange.400"}
                  textDecoration={"none"}
                  _hover={{
                    background: "orange.500",
                    textDecoration: "none",
                  }}
                  paddingX={"12"}
                  borderRadius={"full"}
                  size={"sm"}
                >
                  <NextLink href={"/api/auth/signin"}>
                    {t("cta.button")}
                  </NextLink>
                </Button>
              </Box>
            </Box>
          </CtaActionContainer>
        </Box>

        <Container maxW="5xl">
          <VStack mt={{ base: 12, lg: 24 }} gap={{ base: 5, lg: 10 }}>
            <VStack gap={4}>
              <Heading textAlign={"center"} color={"gray.800"} as="h3">
                {t("sections.dataDecisions.heading")}
              </Heading>
              <Text
                fontSize={"xl"}
                textAlign={"center"}
                color={"gray.600"}
                lineHeight={"2.2rem"}
              >
                {t("sections.dataDecisions.description")}
              </Text>
            </VStack>
            <VStack gap={4}>
              <Heading textAlign={"center"} color={"gray.800"} as="h3">
                {t("sections.easyToUse.heading")}
              </Heading>
              <Text
                fontSize={"xl"}
                textAlign={"center"}
                color={"gray.600"}
                lineHeight={"2.2rem"}
              >
                {t("sections.easyToUse.description")}
              </Text>
            </VStack>
            <VStack gap={4}>
              <Heading textAlign={"center"} color={"gray.800"} as="h3">
                {t("sections.freeToUse.heading")}
              </Heading>
              <Text
                fontSize={"xl"}
                textAlign={"center"}
                color={"gray.600"}
                lineHeight={"2.2rem"}
              >
                {t("sections.freeToUse.description")}
              </Text>
            </VStack>
          </VStack>
        </Container>

        <Container maxW={"container.md"} paddingTop={{ base: 6, md: 24 }}>
          <Faq
            questionsAndAnswers={[
              {
                questionId: "1",
                question: t("faq.isFree.question"),
                answer: t("faq.isFree.answer"),
              },
              {
                questionId: "2",
                question: t("faq.accuracy.question"),
                answer: t("faq.accuracy.answer"),
              },
              {
                questionId: "3",
                question: t("faq.metrics.question"),
                answer: t("faq.metrics.answer"),
              },
              {
                questionId: "4",
                question: t("faq.export.question"),
                answer: t("faq.export.answer"),
              },
              {
                questionId: "5",
                question: t("faq.recalculate.question"),
                answer: t("faq.recalculate.answer"),
              },
            ]}
          />
        </Container>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const messages = await getMessages(context);

  return {
    props: {
      messages,
    },
  };
};

export default DeskSchedulingEfficiencyCalculator;
