import {
  Box,
  Button,
  Container,
  Field,
  Grid,
  Heading,
  Input,
  InputGroup,
  Portal,
  Select,
  Stack,
  Text,
  VStack,
  createListCollection,
} from "@chakra-ui/react";
import { kebabCase } from "change-case";
import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import NextLink from "next/link";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { blogArticles } from "../../blogs/blogArticles";
import { BlogArticlesList } from "../../chakra-starter/marketing-ui/BlogArticles/BlogArticlesList";
import { BlogArticlesListItem } from "../../chakra-starter/marketing-ui/BlogArticles/BlogArticlesListItem";
import { BlogArticlesMainSection } from "../../chakra-starter/marketing-ui/BlogArticles/BlogArticlesMainSection";
import { BlogArticlesMainSectionHeading } from "../../chakra-starter/marketing-ui/BlogArticles/BlogArticlesMainSectionHeading";
import { DeskBookingPreview } from "../../components/BlogInteractiveElements/DeskBookingPreview";
import { CtaActionContainer } from "../../components/CtaActionContainer";
import { Faq } from "../../components/Faq";
import { FreeToolHero } from "../../components/FreeToolHero";
import { FreeToolHeroHeading } from "../../components/FreeToolHeroHeading";
import { FreeToolHeroText } from "../../components/FreeToolHeroText";
import { getMessages } from "../../messages/getMessages";
import {
  LocationData,
  getOfficeUtilizationData,
} from "../../server/csv/getOfficeUtilizationData";
import { computeRightsizing, formatCurrency } from "../../utils/calculator";

type CityOption = {
  name: string;
  slug: string;
  rentPerSqft: number;
};

type Props = {
  cities: CityOption[];
  messages: Record<string, unknown>;
};

const baseUrl = "https://workplacify.com";
const url = `${baseUrl}/free-tools/rightsizing-office-calculator`;
const DEFAULT_UTILIZATION = 75;
const SQFT_PER_DESK = 75;

const OfficeRightsizingCalculator = ({ cities }: Props) => {
  const t = useTranslations("OfficeRightsizingCalculator");

  const cityCollection = useMemo(
    () =>
      createListCollection({
        items: cities.map((c: CityOption) => ({
          label: c.name,
          value: c.slug,
        })),
      }),
    [cities],
  );

  const [employees, setEmployees] = useState("200");
  const [currentDesks, setCurrentDesks] = useState("200");
  const [cityValue, setCityValue] = useState<string[]>([
    cities.find((c: CityOption) => c.name === "New York")?.slug ??
      cities[0]?.slug ??
      "",
  ]);
  const [peakUtilization, setPeakUtilization] = useState(
    String(DEFAULT_UTILIZATION),
  );

  const parsedEmployees = employees === "" ? 0 : Number(employees);
  const parsedDesks = currentDesks === "" ? 0 : Number(currentDesks);
  const parsedUtilization =
    peakUtilization === "" ? 0 : Number(peakUtilization);

  const selectedCity = useMemo(() => {
    const slug = cityValue[0];
    return cities.find((c: CityOption) => c.slug === slug) ?? null;
  }, [cityValue, cities]);

  const rent = selectedCity?.rentPerSqft ?? 0;
  const result = computeRightsizing(
    parsedEmployees,
    parsedDesks,
    parsedUtilization,
    rent,
    SQFT_PER_DESK,
  );

  const chartData = useMemo(
    () => [
      { name: t("results.currentDesks"), value: parsedDesks },
      { name: t("results.recommendedDesks"), value: result.recommendedDesks },
      { name: t("results.desksSaved"), value: result.desksSaved },
    ],
    [parsedDesks, result, t],
  );

  const showResults = parsedEmployees > 0 && parsedDesks > 0 && rent > 0;

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
              url: `${baseUrl}/og-images/office-rightsizing-calculator.png`,
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
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
            <Field.Root>
              <Field.Label>{t("form.employees.label")}</Field.Label>
              <Input
                type="number"
                value={employees}
                min={0}
                onChange={(e) => setEmployees(e.target.value)}
                placeholder={t("form.employees.placeholder")}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>{t("form.currentDesks.label")}</Field.Label>
              <Input
                type="number"
                value={currentDesks}
                min={0}
                onChange={(e) => setCurrentDesks(e.target.value)}
                placeholder={t("form.currentDesks.placeholder")}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>{t("form.city.label")}</Field.Label>
              <Select.Root
                collection={cityCollection}
                value={cityValue}
                onValueChange={(e) => setCityValue(e.value)}
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText
                      placeholder={t("form.city.placeholder")}
                    />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {cityCollection.items.map(
                        (item: { label: string; value: string }) => (
                          <Select.Item item={item} key={item.value}>
                            {item.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ),
                      )}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </Field.Root>

            <Field.Root>
              <Field.Label>{t("form.peakUtilization.label")}</Field.Label>
              <InputGroup startElement="%">
                <Input
                  type="number"
                  value={peakUtilization}
                  min={0}
                  max={100}
                  onChange={(e) => setPeakUtilization(e.target.value)}
                  placeholder={t("form.peakUtilization.placeholder")}
                />
              </InputGroup>
            </Field.Root>
          </Grid>

          {showResults && (
            <>
              <Box
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

                  <Stack
                    direction={{ base: "column", md: "row" }}
                    gap={4}
                    justify="center"
                  >
                    <Box
                      p={6}
                      bg="white"
                      borderRadius="lg"
                      border="1px"
                      borderColor="orange.100"
                      flex={1}
                      textAlign="center"
                    >
                      <Text fontSize="sm" color="gray.500" mb={1}>
                        {t("results.currentDesks")}
                      </Text>
                      <Text fontSize="3xl" fontWeight="bold" color="gray.700">
                        {parsedDesks}
                      </Text>
                    </Box>
                    <Box
                      p={6}
                      bg="white"
                      borderRadius="lg"
                      border="1px"
                      borderColor="orange.100"
                      flex={1}
                      textAlign="center"
                    >
                      <Text fontSize="sm" color="gray.500" mb={1}>
                        {t("results.recommendedDesks")}
                      </Text>
                      <Text fontSize="3xl" fontWeight="bold" color="blue.500">
                        {result.recommendedDesks}
                      </Text>
                    </Box>
                    <Box
                      p={6}
                      bg="white"
                      borderRadius="lg"
                      border="1px"
                      borderColor="orange.100"
                      flex={1}
                      textAlign="center"
                    >
                      <Text fontSize="sm" color="gray.500" mb={1}>
                        {t("results.desksSaved")}
                      </Text>
                      <Text
                        fontSize="3xl"
                        fontWeight="bold"
                        color={result.desksSaved > 0 ? "green.500" : "gray.500"}
                      >
                        {result.desksSaved}
                      </Text>
                    </Box>
                  </Stack>

                  <Box
                    p={6}
                    bg="white"
                    borderRadius="lg"
                    border="1px"
                    borderColor="orange.100"
                    textAlign="center"
                  >
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      color="gray.700"
                      mb={2}
                    >
                      {t("results.annualSavings")}
                    </Text>
                    <Text
                      fontSize="4xl"
                      fontWeight="bold"
                      color={
                        result.annualSavings > 0 ? "orange.500" : "gray.500"
                      }
                    >
                      {formatCurrency(result.annualSavings)}
                    </Text>
                    <Text fontSize="md" color="gray.500">
                      {t("results.perYear")}
                    </Text>
                  </Box>

                  <Box
                    p={6}
                    bg="white"
                    borderRadius="lg"
                    border="1px"
                    borderColor="orange.100"
                  >
                    <Text
                      fontSize="md"
                      fontWeight="bold"
                      color="gray.700"
                      mb={3}
                    >
                      {t("results.calculationBreakdown")}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {result.desksSaved} × ${rent} × {SQFT_PER_DESK} sqft
                    </Text>
                    <Text fontSize="sm" color="gray.500" mt={1}>
                      = {formatCurrency(result.annualSavings)}
                    </Text>
                  </Box>

                  <Box
                    width="100%"
                    height="200px"
                    display="flex"
                    justifyContent="center"
                  >
                    <BarChart
                      width={400}
                      height={200}
                      data={chartData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" isAnimationActive={false}>
                        {chartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              index === 0
                                ? "#DD6B20"
                                : index === 1
                                  ? "#3182CE"
                                  : "#38A169"
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </Box>

                  <Button asChild colorPalette="orange" size="lg" width="full">
                    <NextLink href="/api/auth/signin">
                      {t("results.ctaButton")}
                    </NextLink>
                  </Button>
                </VStack>
              </Box>
            </>
          )}
        </Container>

        <Box marginTop={{ base: 12, md: 24 }}>
          <Stack
            direction={{ base: "column", lg: "row" }}
            gap={8}
            align="center"
          >
            <Box flex={1}>
              <Text
                textTransform="uppercase"
                color="orange.400"
                fontSize="sm"
                fontWeight="700"
                letterSpacing="0.1em"
              >
                {t("features.tag")}
              </Text>
              <Heading as="h2" marginTop="0.5rem">
                {t("features.title")}
              </Heading>
              <Text as="p" fontSize={"xl"} marginTop="0.5rem" color="gray.600">
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
            </Box>
            <Box flex={1} width="100%">
              <DeskBookingPreview />
            </Box>
          </Stack>
        </Box>

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
                {t("sections.methodology.heading")}
              </Heading>
              <Text
                fontSize={"xl"}
                textAlign={"center"}
                color={"gray.600"}
                lineHeight={"2.2rem"}
              >
                {t("sections.methodology.description")}
              </Text>
            </VStack>
            <VStack gap={4}>
              <Heading textAlign={"center"} color={"gray.800"} as="h3">
                {t("sections.dataDriven.heading")}
              </Heading>
              <Text
                fontSize={"xl"}
                textAlign={"center"}
                color={"gray.600"}
                lineHeight={"2.2rem"}
              >
                {t("sections.dataDriven.description")}
              </Text>
            </VStack>
          </VStack>
        </Container>

        <Container maxW={"container.md"} paddingTop={{ base: 6, md: 24 }}>
          <Faq
            questionsAndAnswers={[
              {
                questionId: "1",
                question: t("faq.whatIs.question"),
                answer: t("faq.whatIs.answer"),
              },
              {
                questionId: "2",
                question: t("faq.utilizationRate.question"),
                answer: t("faq.utilizationRate.answer"),
              },
              {
                questionId: "3",
                question: t("faq.sqftPerDesk.question"),
                answer: t("faq.sqftPerDesk.answer"),
              },
              {
                questionId: "4",
                question: t("faq.accuracy.question"),
                answer: t("faq.accuracy.answer"),
              },
              {
                questionId: "5",
                question: t("faq.startSaving.question"),
                answer: t("faq.startSaving.answer"),
              },
            ]}
          />
        </Container>

        <Container maxW="5xl" py={16}>
          <BlogArticlesMainSection
            heading={
              <BlogArticlesMainSectionHeading>
                Learn More About Workplace Optimization
              </BlogArticlesMainSectionHeading>
            }
            blogArticlesList={
              <BlogArticlesList>
                {blogArticles
                  .sort(
                    (a, b) =>
                      b.datePublished.getTime() - a.datePublished.getTime(),
                  )
                  .slice(0, 3)
                  .map((article) => (
                    <BlogArticlesListItem
                      key={article.uuid}
                      blogArticle={article}
                    />
                  ))}
              </BlogArticlesList>
            }
          />
        </Container>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const messages = await getMessages(context);

  const records = await getOfficeUtilizationData();

  const cities: CityOption[] = records
    .map((record: LocationData) => ({
      name: record.city,
      slug: kebabCase(record.city.toLowerCase()),
      rentPerSqft: parseInt(record.prime_rent_usd_sqft),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    props: {
      messages,
      cities,
    },
  };
};

export default OfficeRightsizingCalculator;
