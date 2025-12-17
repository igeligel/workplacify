import { Chart, useChart } from "@chakra-ui/charts";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Icon,
  Link,
  List,
  Stack,
  Text,
} from "@chakra-ui/react";
import { kebabCase } from "change-case";
import { createShuffle } from "fast-shuffle";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import NextLink from "next/link";
import { GiPiggyBank } from "react-icons/gi";
import { PiBuildingOffice } from "react-icons/pi";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { blogArticles } from "../../../blogs/blogArticles";
import { CtaActionContainer } from "../../../chakra-starter/marketing-ui/BlogArticle/CtaActionContainer";
import { CtaActionContainerContent } from "../../../chakra-starter/marketing-ui/BlogArticle/CtaActionContainerContent";
import { BlogArticlesList } from "../../../chakra-starter/marketing-ui/BlogArticles/BlogArticlesList";
import { BlogArticlesListItem } from "../../../chakra-starter/marketing-ui/BlogArticles/BlogArticlesListItem";
import { BlogArticlesMainSection } from "../../../chakra-starter/marketing-ui/BlogArticles/BlogArticlesMainSection";
import { BlogArticlesMainSectionHeading } from "../../../chakra-starter/marketing-ui/BlogArticles/BlogArticlesMainSectionHeading";
import { Faq } from "../../../components/Faq";
import { OfficeUtilizationPieChartWidget } from "../../../components/OfficeUtilization/OfficeUtilizationPieChartWidget";
import { OfficeUtilizationPieChartWidgetDescription } from "../../../components/OfficeUtilization/OfficeUtilizationPieChartWidgetDescription";
import { OfficeUtilizationPieChartWidgetHeading } from "../../../components/OfficeUtilization/OfficeUtilizationPieChartWidgetHeading";
import { getMessages } from "../../../messages/getMessages";
import {
  LocationData,
  getOfficeUtilizationData,
} from "../../../server/csv/getOfficeUtilizationData";

const colors = [
  "red.400",
  "blue.400",
  "green.400",
  "yellow.400",
  "purple.400",
  "orange.400",
  "pink.400",
  "teal.400",
  "cyan.400",
];

const OfficeUtilizationPage = (
  props: InferGetServerSidePropsType<typeof getStaticProps>,
) => {
  const sortedBlogArticlesButNotShuffled = blogArticles.sort(
    (a, b) => b.datePublished.getTime() - a.datePublished.getTime(),
  );

  const t = useTranslations("OfficeUtilization");
  const { locationData, comparisonCities: comparisonCitiesFromProps } = props;
  const comparisonCities = comparisonCitiesFromProps as LocationData[];
  let [sortedBlogArticles] = createShuffle([
    sortedBlogArticlesButNotShuffled,
    locationData.city,
  ]);
  sortedBlogArticles = sortedBlogArticles.slice(0, 3);
  const chart = useChart({
    data: [
      { name: "windows", value: 52, color: "blue.solid" },
      { name: "mac", value: 48, color: "gray.200" },
    ],
  });

  const comparisonCitiesData = comparisonCities.map((city) => ({
    allocation: parseInt(city.attendance_high_percentage),
    name: city.city,
  }));

  const mainCityData = {
    allocation: parseInt(locationData.attendance_high_percentage),
    name: locationData.city,
  };

  const chartBarData = [mainCityData, ...comparisonCitiesData];

  const chartBarDataWithColors = chartBarData.map((item, index) => ({
    ...item,
    color: colors[index],
  }));

  const chartBarChart = useChart({
    data: chartBarDataWithColors,
    // ],
  });

  const key = `hybridWorkTrend.${locationData.hybrid_work_trend_2025}`;

  let hybridWorkTrend = "";
  try {
    // @ts-expect-error - key is a valid message key
    hybridWorkTrend = t(key);
  } catch (error) {
    console.error(error);
  }

  const City = locationData.city;
  const Attendance_Low = locationData.attendance_low_percentage;
  const Attendance_High = locationData.attendance_high_percentage;
  const Util_Peak_Low = locationData.util_peak_low_percentage;
  const Util_Peak_High = locationData.util_peak_high_percentage;
  const prime_rent_usd_sqft = locationData.prime_rent_usd_sqft;
  const Est_Savings_USD_Per_Emp = locationData.est_savings_usd_per_emp;

  // Calculate averages
  const avgAttendance =
    (parseFloat(Attendance_Low) + parseFloat(Attendance_High)) / 2 / 100.0;
  const avgUtilization =
    (parseFloat(Util_Peak_Low) + parseFloat(Util_Peak_High)) / 2 / 100.0;

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}`;

  const title = t("meta.title", { location: locationData.city });
  // 2025 Office Benchmarks for {City}: Attendance is trending at {Attendance_Low}-{Attendance_High}% with peak utilization of {Util_Peak_High}%. View prime rents and hybrid work savings data.
  const description = t("meta.description", {
    City: locationData.city,
    Attendance_Low: locationData.attendance_low_percentage,
    Attendance_High: locationData.attendance_high_percentage,
    Util_Peak_Low: locationData.util_peak_low_percentage,
    Util_Peak_High: locationData.util_peak_high_percentage,
  });

  const kebabCasedLocation = kebabCase(locationData.city.toLowerCase());

  const fullUrl = `${url}/office-utilization/${kebabCasedLocation}`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={fullUrl}
        openGraph={{
          url: fullUrl,
          type: "website",
          title: title,
          description,
          images: [
            {
              url: `${url}/og-images/home.png`,
              width: 1200,
              height: 630,
              alt: t("meta.imageAlt"),
            },
          ],
          siteName: "workplacify",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <Box
        height={"100%"}
        width={"100%"}
        // #f12711 to #f5af19 gradient
        backgroundImage="linear-gradient(to right, hsl(6, 89%, 91%), hsl(41, 92%, 93%))"
        // bg={"orange.200"}
        marginTop={-16}
        paddingTop={16}
        paddingBottom={8}
      >
        <Container maxW="3xl" paddingTop={4} colorPalette={"orange"}>
          <Stack direction="row" justify="space-between" align="center">
            <Heading size="3xl" color={"orange.1000"} marginTop={4} as={"h1"}>
              Office Utilization — {City} • 2025
            </Heading>
            <Box>
              <Badge colorPalette="red" variant={"surface"}>
                DE • 2025
              </Badge>
            </Box>
          </Stack>
          <Text color={"orange.900"} fontSize={"xl"} paddingTop={2}>
            Attendance is stabilizing at {Attendance_Low}–{Attendance_High}%
            while peak utilization trends toward {Util_Peak_Low}–
            {Util_Peak_High}%.
          </Text>
          <Stack>
            <Box paddingY={4} borderRadius={"md"}>
              <Grid templateColumns="repeat(4, 1fr)" gap="6" width={"100%"}>
                <Box
                  backgroundColor={"white"}
                  padding={2}
                  borderRadius={"md"}
                  height={"100%"}
                >
                  <OfficeUtilizationPieChartWidget
                    heading={
                      <OfficeUtilizationPieChartWidgetHeading>
                        Attendance
                      </OfficeUtilizationPieChartWidgetHeading>
                    }
                    percentage={avgAttendance}
                    description={
                      <OfficeUtilizationPieChartWidgetDescription>
                        Low: 50%, High: 55%
                      </OfficeUtilizationPieChartWidgetDescription>
                    }
                  />
                </Box>

                <Box
                  backgroundColor={"white"}
                  padding={2}
                  borderRadius={"md"}
                  height={"100%"}
                >
                  <OfficeUtilizationPieChartWidget
                    heading={
                      <OfficeUtilizationPieChartWidgetHeading>
                        Utilization
                      </OfficeUtilizationPieChartWidgetHeading>
                    }
                    percentage={avgUtilization}
                    description={
                      <OfficeUtilizationPieChartWidgetDescription>
                        Low: {Util_Peak_Low}%, High: {Util_Peak_High}%
                      </OfficeUtilizationPieChartWidgetDescription>
                    }
                  />
                </Box>

                <Box
                  backgroundColor={"white"}
                  padding={2}
                  borderRadius={"md"}
                  height={"100%"}
                >
                  <OfficeUtilizationPieChartWidgetHeading>
                    Prime Rent
                  </OfficeUtilizationPieChartWidgetHeading>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    gap={2}
                    justifyContent={"center"}
                    paddingY={1}
                  >
                    <Icon w={14} h={14} color={"orange.600"}>
                      <PiBuildingOffice />
                    </Icon>
                  </Box>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    gap={2}
                    justifyContent={"center"}
                  >
                    <Text fontSize={"lg"} fontWeight={700}>
                      ${prime_rent_usd_sqft}/sqft
                    </Text>
                  </Box>
                </Box>

                <Box
                  backgroundColor={"white"}
                  padding={2}
                  borderRadius={"md"}
                  height={"100%"}
                >
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    gap={2}
                    justifyContent={"center"}
                    paddingY={1}
                  >
                    <Icon w={14} h={14} color={"orange.600"}>
                      <GiPiggyBank />
                    </Icon>
                  </Box>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    gap={2}
                    justifyContent={"center"}
                  >
                    <Text fontSize={"sm"} fontWeight={600}>
                      Savings / Employee
                    </Text>
                  </Box>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    gap={2}
                    justifyContent={"center"}
                  >
                    <Text fontSize={"lg"} fontWeight={700}>
                      ${locationData.est_savings_usd_per_emp}
                    </Text>
                  </Box>
                </Box>
              </Grid>
            </Box>
          </Stack>
        </Container>
      </Box>
      <Box marginTop={12}>
        <Container maxW="4xl">
          <Grid templateColumns="repeat(1, 1fr)" gapY={"8"}>
            <Grid templateColumns="repeat(12, 1fr)" gapX={"12"}>
              <Card.Root
                gridColumn="span 7 / span 7"
                width="100%"
                variant={"outline"}
                colorPalette="orange"
                backgroundColor={"orange.50"}
              >
                <Card.Body gap="2">
                  <Card.Title mb="2">Hybrid Work Trend (2025)</Card.Title>
                  <Card.Description fontSize={"md"}>
                    {hybridWorkTrend}
                  </Card.Description>
                </Card.Body>
              </Card.Root>
              <Box gridColumn="span 5 / span 5">
                <Heading>Interpretation</Heading>
                <List.Root paddingLeft={4}>
                  <List.Item>Return-to-office push increasing</List.Item>
                  <List.Item>Amenity-rich spaces in higher demand</List.Item>
                  <List.Item>
                    Utilization expected to rise over next 12 months
                  </List.Item>
                </List.Root>
              </Box>
            </Grid>
            <Grid templateColumns="repeat(12, 1fr)" gapX={"12"}>
              <Box gridColumn="span 5 / span 5">
                <Heading>Cost Implications</Heading>
                <List.Root paddingLeft={4}>
                  <List.Item>
                    Prime Rent: <b>${prime_rent_usd_sqft}/sqft</b>
                  </List.Item>
                  <List.Item>
                    Estimated Savings per Employee:{" "}
                    <b>${Est_Savings_USD_Per_Emp}</b>
                  </List.Item>
                  <List.Item>
                    Rightsizing Potential: <b>Moderate</b>
                  </List.Item>
                </List.Root>
              </Box>
              <Box gridColumn="span 7 / span 7">
                <Heading>How {City} Compares Globally</Heading>
                <Box marginTop={2}>
                  <Chart.Root
                    maxH="180px"
                    chart={chartBarChart}
                    aspectRatio={0.5}
                  >
                    <BarChart data={chartBarChart.data}>
                      <CartesianGrid
                        stroke={chartBarChart.color("border.muted")}
                        vertical={false}
                      />
                      <XAxis
                        axisLine={false}
                        tickLine={false}
                        angle={45}
                        dataKey={chartBarChart.key("name")}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={true}
                        domain={[0, 100]}
                        padding={{ bottom: 20 }}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <ReferenceLine
                        y={locationData.attendance_high_percentage}
                        stroke={chart.color("red.fg")}
                        strokeDasharray="3 3"
                      />
                      <Tooltip
                        cursor={{ fill: chartBarChart.color("bg.muted") }}
                        animationDuration={0}
                        content={<Chart.Tooltip />}
                      />
                      <Bar
                        isAnimationActive={false}
                        dataKey={chartBarChart.key("allocation")}
                      >
                        {chartBarChart.data.map((item) => (
                          <Cell
                            key={item.name}
                            fill={chartBarChart.color(item.color)}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </Chart.Root>
                </Box>
                {/* <Box>{JSON.stringify(comparisonCities)}</Box> */}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box marginTop={6}>
        <Container maxW="4xl">
          <Heading as={"h2"} fontWeight={500}>
            Related Office Utilization Pages
          </Heading>
          <Stack direction="row" gap={2}>
            {comparisonCities.map((city, index) => (
              <>
                <Box key={city.city}>
                  <Link colorPalette="orange" asChild>
                    <NextLink
                      href={`/office-utilization/${kebabCase(city.city.toLowerCase())}`}
                    >
                      <Text textWrap={"nowrap"}>{city.city}</Text>
                    </NextLink>
                  </Link>
                </Box>
                {index < comparisonCities.length - 1 && (
                  <Box borderWidth={0}>{"•"}</Box>
                )}
              </>
            ))}
          </Stack>
        </Container>
      </Box>

      <Container maxW="5xl" py={16}>
        {/* CTA */}
        <CtaActionContainer
          ctaContent={
            <CtaActionContainerContent
              title="Ready to Optimize Your Office?"
              description="See how a dedicated platform provides real-time data and a seamless employee experience."
            />
          }
          ctaAction={
            <Button width={"100%"} colorScheme="blue" size="lg" asChild>
              <NextLink href={"/"}>Explore Workplacify</NextLink>
            </Button>
          }
        />
      </Container>
      <Container maxW="5xl" py={16}>
        <Faq
          questionsAndAnswers={[
            {
              questionId: "1",
              question: `What is the average office attendance in ${City}?`,
              answer: `As of late 2025, ${City} sees an average attendance of ${Attendance_Low}% to ${Attendance_High}%, with peak days hitting ${Util_Peak_High}%.`,
            },
            {
              questionId: "2",
              question: `How much does office space cost in ${City}?`,
              answer: `Prime rent in ${City} is currently averaging ${prime_rent_usd_sqft}/sqft.`,
            },
            {
              questionId: "3",
              question: `Is hybrid work common in ${City}?`,
              answer: `Yes. The current trend in ${City} is ${hybridWorkTrend}.`,
            },
          ]}
        />
      </Container>
      <Container maxW="5xl" py={16}>
        <BlogArticlesMainSection
          heading={
            <BlogArticlesMainSectionHeading>
              Articles related to office utilization in {City}
            </BlogArticlesMainSectionHeading>
          }
          blogArticlesList={
            <BlogArticlesList>
              {sortedBlogArticles.map((article) => (
                <BlogArticlesListItem
                  key={article.uuid}
                  blogArticle={article}
                />
              ))}
            </BlogArticlesList>
          }
        />
      </Container>
    </>
  );
};

export const getStaticPaths = (async () => {
  const records = await getOfficeUtilizationData();
  const paths = records.map((record) => ({
    params: {
      location: kebabCase(record.city.toLowerCase()),
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps: GetStaticProps = async (context) => {
  const messages = await getMessages(context);

  const location = context.params?.location;
  if (!location) {
    return { notFound: true };
  }
  let lowerCasedLocation = location?.toString().toLowerCase();
  if (!lowerCasedLocation) {
    return { notFound: true, props: { messages } };
  }
  lowerCasedLocation = kebabCase(lowerCasedLocation);

  const records = await getOfficeUtilizationData();

  const locationData = records.find(
    (record) => kebabCase(record.city.toLowerCase()) === lowerCasedLocation,
  );

  if (!locationData) {
    return { notFound: true, props: { messages } };
  }

  const comparisonCities = records.filter((record) => {
    return Boolean(
      record.country === locationData.country &&
        record.region === locationData.region &&
        record.city !== locationData.city,
    );
  });

  const finalComparisonCities: LocationData[] = [];

  const sortedAttendanceSameRegion = comparisonCities
    .sort((a, b) => {
      return (
        parseInt(a.attendance_high_percentage) -
        parseInt(b.attendance_high_percentage)
      );
    })
    .slice(0, 2);

  finalComparisonCities.push(...sortedAttendanceSameRegion);

  const sortedByEstimatedSavings = comparisonCities
    .filter(
      (record) => !finalComparisonCities.some((r) => r.city === record.city),
    )
    .sort((a, b) => {
      return (
        parseInt(a.est_savings_usd_per_emp) -
        parseInt(b.est_savings_usd_per_emp)
      );
    })
    .slice(0, 2);

  finalComparisonCities.push(...sortedByEstimatedSavings);

  const descendingEstimatedSavings = comparisonCities
    .filter(
      (record) => !finalComparisonCities.some((r) => r.city === record.city),
    )
    .sort((a, b) => {
      return (
        parseInt(a.est_savings_usd_per_emp) -
        parseInt(b.est_savings_usd_per_emp)
      );
    })
    .slice(0, 2);
  finalComparisonCities.push(...descendingEstimatedSavings);

  const bigCitiesList = [
    "london",
    "new-york",
    "hong-kong",
    "tokyo",
    "shanghai",
  ];
  // Shuffle big cities as well
  const bigCities = records
    .filter(
      (record) =>
        kebabCase(record.city.toLowerCase()) !==
          kebabCase(locationData.city.toLowerCase()) &&
        bigCitiesList.includes(kebabCase(record.city.toLowerCase())),
    )
    .sort(() => {
      return Math.random() - 0.5;
    });

  while (finalComparisonCities.length < 8 && bigCities.length > 0) {
    if (finalComparisonCities.length < 8) {
      const randomCity = bigCities.shift();
      if (randomCity) {
        finalComparisonCities.push(randomCity);
      }
    }
  }

  return {
    props: { messages, locationData, comparisonCities: finalComparisonCities },
  };
};

// export const getServerSideProps: GetServerSideProps = async (context) => {

// };

export default OfficeUtilizationPage;
