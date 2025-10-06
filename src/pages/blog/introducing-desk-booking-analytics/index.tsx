import {
  Box,
  Button,
  Container,
  Link,
  List,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import NextLink from "next/link";

import { blogArticles } from "../../../blogs/blogArticles";
import { BlogArticle } from "../../../chakra-starter/marketing-ui/BlogArticle";
import { BlogHeadingSecondary } from "../../../chakra-starter/marketing-ui/BlogArticle/BlogHeadingSecondary";
import { BlogHeadingTertiary } from "../../../chakra-starter/marketing-ui/BlogArticle/BlogHeadingTertiary";
import { BlogImage } from "../../../chakra-starter/marketing-ui/BlogArticle/BlogImage";
import { BlogIntroductionText } from "../../../chakra-starter/marketing-ui/BlogArticle/BlogIntroductionText";
import { BlogText } from "../../../chakra-starter/marketing-ui/BlogArticle/BlogText";
import { CtaActionContainer } from "../../../chakra-starter/marketing-ui/BlogArticle/CtaActionContainer";
import { CtaActionContainerContent } from "../../../chakra-starter/marketing-ui/BlogArticle/CtaActionContainerContent";
import { ComparisonTile } from "../../../chakra-starter/marketing-ui/ComparisonTile";
import { ComparisonTileBox } from "../../../chakra-starter/marketing-ui/ComparisonTile/ComparisonTileBox";
import { ComparisonTileCta } from "../../../chakra-starter/marketing-ui/ComparisonTile/ComparisonTileCta";
import { ComparisonTileListItem } from "../../../chakra-starter/marketing-ui/ComparisonTile/ComparisonTileListItem";
import { Faq } from "../../../components/Faq";
import { getMessages } from "../../../messages/getMessages";

const article = blogArticles.find(
  (article) =>
    article.title === "Workplacify Analytics: Turn Desk Booking Data into ROI",
)!;

const BlogContent = () => (
  <Stack width="100%" gap={6}>
    <BlogHeadingSecondary
      slug="what-is-analytics"
      title="What is Workplacify Analytics and Why Does It Matter?"
    />
    <BlogText>
      Workplacify Analytics translates raw booking data into simple, actionable
      insights. It answers questions like: How much space do we really need?
      Which days are most popular for in-office collaboration? Are our workplace
      policies working? Every empty desk represents a cost, and every frustrated
      employee who can not find a spot represents a productivity risk. With
      data, you replace guesswork with decisions that save money and improve the
      employee experience.
    </BlogText>

    <BlogHeadingTertiary
      slug="base-analytics"
      title="Introducing Base Analytics: Your Office's Vital Signs"
    />
    <BlogText>
      Base Analytics provides a high-level overview of space utilization. It
      highlights overall desk utilization, your peak day, and daily utilization
      trends so that you can see patterns at a glance and communicate clearly
      with stakeholders.
    </BlogText>
    <BlogImage
      image={"/introducing-desk-booking-base-analytics.png"}
      alt="A screenshot of the Workplacify Base Analytics dashboard showing overall desk utilization, peak day, and daily utilization trends."
      maxWidth={{ base: "100%", md: "80%" }}
    />
    <List.Root paddingLeft={5}>
      <List.Item>
        <BlogText>
          <b>Overall Desk Utilization:</b> The percentage of available desks
          booked over a period, with trend deltas to track direction.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Peak Day:</b> Instantly shows the busiest day of the week to help
          plan staffing, cleaning, and collaboration resources.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Daily Utilization Graph:</b> A clear view of which days are popular
          versus quiet.
        </BlogText>
      </List.Item>
    </List.Root>

    <BlogText>
      Filters support office-level and portfolio views and let you choose ranges
      from the last 7 to 365 days. Historical desk booking data is essential for
      forecasting and real estate planning.
    </BlogText>

    <BlogHeadingTertiary
      slug="people-analytics"
      title="Introducing People Analytics: Understanding How Your Teams Work"
    />
    <BlogText>
      People Analytics shifts focus from space to people. It reveals total
      bookings, average weekly visits, and favorite day per person, helping
      leaders coordinate team days organically and identify champions or gaps in
      adoption.
    </BlogText>

    <BlogImage
      image={"/introducing-desk-booking-people-analytics.png"}
      alt="A screenshot of the Workplacify Base Analytics dashboard showing overall desk utilization, peak day, and daily utilization trends."
      maxWidth={{ base: "100%", md: "80%" }}
    />

    <BlogHeadingSecondary
      slug="business-case"
      title="The Business Case: Calculating ROI with Office Analytics"
    />
    <BlogHeadingTertiary
      slug="roi-real-estate"
      title="1. ROI from Real Estate Savings"
    />
    <BlogText>
      Use utilization and peak data to right-size your footprint. For example,
      if one floor averages 30% utilization, consolidating or subleasing can
      yield substantial savings, often dwarfing software costs.
    </BlogText>
    {/* TODO: <CustomElement> Image Description; Infographic: From Data to Dollars (Collect Data → Analyze Insights → Drive ROI). Alt Text: Infographic explaining how desk booking analytics leads to ROI via real estate, productivity, and retention. File Name: roi-of-desk-booking-office-analytics.png */}

    <BlogHeadingTertiary
      slug="roi-productivity"
      title="2. ROI from Productivity and Collaboration Gains"
    />
    <List.Root paddingLeft={5}>
      <List.Item>
        <BlogText>
          <b>Eliminate Booking Friction:</b> A reliable desk booking flow saves
          minutes per employee per week. Try our {""}
          <Link colorPalette={"orange"} asChild>
            <NextLink href="/free-tools/desk-scheduling-efficiency-calculator">
              Desk Scheduling Efficiency Calculator
            </NextLink>
          </Link>
          {""} to estimate your impact.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Facilitate Intentional Collaboration:</b> Departmental trends guide
          when to schedule cross-functional sessions. As noted in {""}
          <Link colorPalette={"orange"} asChild>
            <NextLink
              href="https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/hybrid-work-making-it-fit-with-your-diversity-equity-and-inclusion-strategy"
              target="_blank"
              rel="noopener noreferrer"
            >
              McKinsey&apos;s hybrid work guidance
            </NextLink>
          </Link>
          , making in-office time purposeful is key.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Optimize for Peak Days:</b> Use peak-day insights to align
          staffing, catering, and room readiness. The {""}
          <Link colorPalette={"orange"} asChild>
            <NextLink
              href="https://www.jll.com/en-us/insights/future-of-work-survey"
              target="_blank"
              rel="noopener noreferrer"
            >
              JLL Future of Work survey
            </NextLink>
          </Link>
          {""} shows how organizations adapt operations to demand patterns.
        </BlogText>
      </List.Item>
    </List.Root>

    <BlogHeadingTertiary
      slug="roi-retention"
      title="3. ROI from Employee Retention and Experience"
    />
    <List.Root paddingLeft={5}>
      <List.Item>
        <BlogText>
          <b>Data-Driven Policy Making:</b> Build policies around observed
          behavior instead of arbitrary rules. Learn more about {""}
          <Link colorPalette={"orange"} asChild>
            <NextLink href="/blog/desk-sharing-vs-hot-desking-differences">
              desk sharing vs. hot desking
            </NextLink>
          </Link>
          .
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Ensure Fair Access:</b> Use insights to prevent persistent access
          issues and create team zones when needed. According to {""}
          <Link colorPalette={"orange"} asChild>
            <NextLink
              href="https://www.gartner.com/en/documents/5188863"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gartner research
            </NextLink>
          </Link>
          , equitable systems support retention and engagement.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Reduce Workplace Anxiety:</b> Confirmed desks reduce stress and
          improve daily satisfaction.
        </BlogText>
      </List.Item>
    </List.Root>

    <CtaActionContainer
      ctaContent={
        <CtaActionContainerContent
          title="Ready to Make Data-Driven Decisions?"
          description="Stop guessing and start knowing. See how Workplacify's Analytics optimizes space, cuts costs, and boosts employee satisfaction. Book a free demo."
        />
      }
      ctaAction={
        <Button width={"100%"} colorScheme="blue" size="lg" asChild>
          <NextLink href={"/"}>Book a free demo</NextLink>
        </Button>
      }
    />

    <BlogHeadingSecondary slug="key-takeaways" title="Key Takeaways" />
    <List.Root paddingLeft={5}>
      <List.Item>
        <BlogText>
          <b>Data Over Guesswork:</b> Replace assumptions with clear usage data.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Two Views, One Goal:</b> Base Analytics for space, People Analytics
          for behavior.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Clear Path to ROI:</b> Savings via real estate, productivity, and
          retention.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Identify Peak Demand:</b> Allocate resources on your busiest days.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Understand Team Cadence:</b> Discover preferred in-office days per
          team.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Build Better Policies:</b> Create hybrid policies from actual
          patterns, not mandates.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Simple and Actionable:</b> Clear metrics that drive decisive
          action.
        </BlogText>
      </List.Item>
    </List.Root>

    <BlogHeadingSecondary slug="conclusion" title="Conclusion" />
    <BlogText>
      Managing a hybrid workplace now requires more than scheduling—it requires
      intelligence. With Workplacify Analytics, you gain accessible, actionable
      data on both spaces and people to end ghost offices and reduce hybrid
      friction. Present leadership with utilization-backed plans to adjust
      footprint, foster collaboration through behavioral insights, and improve
      satisfaction with a predictable, fair booking experience.
    </BlogText>

    <BlogHeadingSecondary
      slug="comparison"
      title="Spreadsheets vs. Analytics Dashboard"
    />
    <BlogText>
      Manual spreadsheets are error-prone and offer little insight. An
      integrated analytics dashboard provides real-time visibility and decision
      support.
    </BlogText>
    <ComparisonTile
      firstTile={
        <ComparisonTileBox
          colorPalette="gray"
          heading={<>Spreadsheets</>}
          listItems={
            <>
              <ComparisonTileListItem
                title={<>Manual &amp; Error-Prone</>}
                description={
                  <>Time-consuming updates and inconsistent data accuracy</>
                }
              />
              <ComparisonTileListItem
                title={<>No Trend Visibility</>}
                description={<>Hard to see peak days, patterns, or behavior</>}
              />
              <ComparisonTileListItem
                title={<>Poor Governance</>}
                description={<>No consistent rules or auditability</>}
              />
            </>
          }
        />
      }
      secondTile={
        <ComparisonTileBox
          colorPalette="orange"
          heading={<>Workplacify Analytics</>}
          listItems={
            <>
              <ComparisonTileListItem
                checked
                title={<>Real-Time Insights</>}
                description={
                  <>Utilization, peak days, and people patterns at a glance</>
                }
              />
              <ComparisonTileListItem
                checked
                title={<>Actionable Decisions</>}
                description={<>Drive portfolio changes with confidence</>}
              />
              <ComparisonTileListItem
                checked
                title={<>Policy Feedback Loop</>}
                description={<>Use data to improve hybrid policies over time</>}
              />
            </>
          }
          cta={
            <ComparisonTileCta>
              <NextLink href={"/"}>Get Started with Workplacify</NextLink>
            </ComparisonTileCta>
          }
        />
      }
    />

    <BlogHeadingSecondary
      slug="faqs"
      title="Frequently Asked Questions (FAQs)"
    />
    <Box fontSize={"md"}>
      <Faq
        withoutHeading
        questionsAndAnswers={[
          {
            questionId: "1",
            question: <>What is desk utilization and how is it calculated?</>,
            answer: (
              <>
                Desk utilization is the percentage of available desks booked
                over a given period. Workplacify calculates this by dividing
                unique desk bookings by total available desks and multiplying by
                100.
              </>
            ),
          },
          {
            questionId: "2",
            question: <>How can People Analytics improve collaboration?</>,
            answer: (
              <>
                Favorite day insights let you coordinate natural team days and
                plan resources around real behavior.
              </>
            ),
          },
          {
            questionId: "3",
            question: <>Can analytics help determine office size needs?</>,
            answer: (
              <>
                Yes. If peak utilization stays below 70%, you likely have excess
                capacity. Conversely, consistent 95-100% peaks suggest expansion
                needs.
              </>
            ),
          },
          {
            questionId: "4",
            question: <>Why move beyond manual spreadsheets?</>,
            answer: (
              <>
                Spreadsheets are manual and error-prone. Real-time analytics
                automate data collection and surface trends instantly. See our
                post {""}
                <Link colorPalette={"orange"} asChild>
                  <NextLink href="/blog/signs-outgrown-office-spreadsheet">
                    5 signs you have outgrown your office spreadsheet
                  </NextLink>
                </Link>
                .
              </>
            ),
          },
          {
            questionId: "5",
            question: <>How does analytics support our hybrid work policy?</>,
            answer: (
              <>
                Analytics validates policy adoption and guides adjustments based
                on real-world behavior instead of assumptions.
              </>
            ),
          },
        ]}
      />
    </Box>
  </Stack>
);

const IntroducingDeskBookingAnalyticsPage = () => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${article.url}`;
  return (
    <>
      <NextSeo
        title={article.title}
        description={article.description}
        canonical={url}
        openGraph={{
          url,
          type: "article",
          title: article.title,
          description: article.description,
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_BASE_URL}${article.image}`,
              width: 1200,
              height: 630,
            },
          ],
          article: {
            publishedTime: article.datePublished.toISOString(),
            modifiedTime: article.datePublished.toISOString(),
            expirationTime: article.datePublished.toISOString(),
            authors: [article.author.name],
            section: "Workspace Management",
            tags: article.tags.map((tag) => tag.text),
          },
          siteName: "workplacify",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />

      <Container
        maxWidth={"7xl"}
        marginTop={{ base: "0", md: "2" }}
        paddingTop={{ base: "4", md: "8" }}
        paddingBottom={"12"}
      >
        <BlogArticle
          article={article}
          blogContent={<BlogContent />}
          blogIntroductionText={
            <VStack>
              <BlogIntroductionText>
                Making decisions about your office space without data means
                risk. Are you paying for square footage that sits empty? Are
                teams missing out on collaboration because popular days are
                overcrowded? The right analytics reveal patterns, eliminate
                guesswork, and lead directly to better outcomes.
              </BlogIntroductionText>
              <BlogIntroductionText>
                We are introducing Workplacify Analytics, a dashboard that turns
                desk booking data into ROI. In this article, we explore Base
                Analytics and People Analytics, and show how to use these
                insights to justify real estate changes, improve productivity,
                and support a better hybrid experience.
              </BlogIntroductionText>
            </VStack>
          }
        />
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

export default IntroducingDeskBookingAnalyticsPage;
