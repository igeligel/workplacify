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
import { ComparisonTileListItem } from "../../../chakra-starter/marketing-ui/ComparisonTile/ComparisonTileListItem";
import { Faq } from "../../../components/Faq";
import { getMessages } from "../../../messages/getMessages";

const article = blogArticles.find(
  (article) =>
    article.title ===
    "Master Your Office: Desk Booking Limitations with Workplacify",
)!;

const BlogContent = () => (
  <Stack width="100%" gap={6}>
    {/* The Problem with Unrestricted Desk Booking */}
    <BlogHeadingSecondary
      slug="unrestricted-booking-problems"
      title="The Problem with Unrestricted Desk Booking: A Recipe for Chaos"
    />
    <BlogText>
      An open-for-all desk booking system sounds great in theory but often
      creates practical problems in a dynamic workplace. When employees can book
      any desk, anytime, with no restrictions, inefficiencies and frustrations
      quickly appear. This lack of structure can undermine the very goals of
      your hybrid work policy.
    </BlogText>

    <BlogHeadingTertiary
      slug="ghost-booker"
      title='The "Ghost Booker" and Wasted Space'
    />
    <BlogText>
      We have all seen it: a desk is marked as reserved for the entire day, but
      it sits empty. This is the work of a &quot;ghost booker.&quot; An employee
      might book a desk &quot;just in case&quot; they come in, or reserve their
      favorite spot for the entire month, even if they only plan to use it a few
      times. Without desk booking limitations, this behavior runs rampant.
      According to research from CBRE, office utilization often hovers around
      60%, meaning a significant portion of space is already underused. Ghost
      bookings exacerbate this problem, creating artificial scarcity and driving
      up real estate costs for space that is not actually being used.
    </BlogText>

    <BlogHeadingTertiary
      slug="planning-paralysis"
      title="Planning Paralysis: When Too Much Choice is a Bad Thing"
    />
    <BlogText>
      Having the ability to book a desk six months from now might seem like a
      benefit, but it can lead to decision fatigue and logistical headaches.
      Plans change. A project gets moved, a meeting is canceled, or an employee
      decides to work from home. When the booking calendar is a free-for-all, it
      becomes cluttered with tentative reservations that may never materialize,
      making it difficult for others to find a spot when they genuinely need
      one. This forces employees to spend more time managing their schedules and
      less time on productive work.
    </BlogText>

    <BlogHeadingTertiary
      slug="unfair-advantage"
      title="Unfair Advantage: The Early Bird Catches All the Desks"
    />
    <BlogText>
      In a system with no booking window, a few hyper-organized employees can
      claim all the best desks—the ones by the window or in a quiet corner—weeks
      or months in advance. This leaves the rest of the team scrambling for
      leftover spots, fostering a sense of unfairness and competition. A
      positive workplace experience is built on equity. When your booking system
      feels like a race, it can quickly damage morale and make employees feel
      undervalued, which is a major factor in employee turnover.
    </BlogText>

    {/* Introducing Workplacify's New Office Settings */}
    <BlogHeadingSecondary
      slug="office-settings-intro"
      title="Introducing Workplacify's New Office Settings: Your Command Center"
    />
    <BlogText>
      To solve these exact problems, we have built the new Office Settings
      feature directly into Workplacify. It is a simple, powerful control panel
      that lets you define the rules of engagement for your office space,
      ensuring the system is fair, efficient, and aligned with your
      company&apos;s unique policies.
    </BlogText>

    <BlogHeadingTertiary
      slug="office-settings-overview"
      title="What are Office Settings? A Quick Overview"
    />
    <BlogText>
      The Office Settings page is your new command center for scheduling rules.
      Here, you can implement key desk booking limitations with just a few
      clicks. You no longer need to rely on honor systems or manual oversight.
    </BlogText>

    <BlogImage
      image={"/desk-booking-limitations-office-settings.png"}
      alt="A screenshot of the Workplacify Office Settings page."
      maxWidth={{ base: "100%", md: "60%" }}
    />

    <BlogText>As you can see, the settings are straightforward:</BlogText>
    <List.Root paddingLeft={5}>
      <List.Item>
        <BlogText>
          <b>Duration Scheduling Future:</b> Control how many days into the
          future employees can book a desk.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Restrict Scheduling to Specific Days:</b> Select only the days of
          the week your office is open for bookings.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Allow Scheduling in the Past:</b> Enable users to log desk usage
          after the fact for 100% accurate reporting.
        </BlogText>
      </List.Item>
    </List.Root>

    <BlogHeadingTertiary
      slug="why-it-matters"
      title="Why This Matters for Workplace Managers and HR"
    />
    <BlogText>
      For workplace managers, these settings mean less time spent manually
      managing conflicts and more time focusing on strategic initiatives. You
      can set the policy once and trust the system to enforce it. For HR
      professionals, it is a tool to promote a fair and equitable workplace
      culture. By ensuring everyone has a reasonable chance to book a good spot,
      you contribute to a positive employee experience, which is directly linked
      to higher retention rates. A well-managed desk booking system is a
      critical component of a successful hybrid work model.
    </BlogText>

    {/* Deep Dive into Desk Booking Limitations */}
    <BlogHeadingSecondary
      slug="deep-dive"
      title="A Deep Dive into Desk Booking Limitations"
    />
    <BlogText>
      Let us look at how each of these new office settings works and how you can
      use them to create a more organized and efficient workplace.
    </BlogText>

    <BlogHeadingTertiary
      slug="duration-scheduling"
      title="Setting the Future: The 'Duration Scheduling Future' Setting"
    />
    <BlogText>
      This is perhaps the most impactful limitation you can set. It defines the
      booking window for your entire organization. For example, setting this to
      &quot;14&quot; means an employee can book a desk up to 14 days in advance,
      but no further.
    </BlogText>

    <BlogImage
      image={"/desk-booking-limitations-schedule.png"}
      alt="A screenshot of the Workplacify desk booking schedule page"
      maxWidth={{ base: "100%", md: "60%" }}
    />

    <BlogHeadingTertiary
      slug="sweet-spot"
      title="Finding Your Sweet Spot: 7, 14, or 30 Days?"
    />
    <BlogText>
      The ideal booking window depends on your company culture and workflow.
    </BlogText>
    <List.Root paddingLeft={5}>
      <List.Item>
        <BlogText>
          <b>7 Days:</b> A short window is great for highly agile teams whose
          plans change weekly. It promotes spontaneous collaboration and ensures
          the schedule reflects near-term reality.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>14 Days:</b> This is a popular choice. It provides enough time for
          employees to plan their weeks without allowing for the long-term
          &quot;hoarding&quot; of popular desks. It strikes a good balance
          between planning and flexibility.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>30 Days:</b> A longer window may be suitable for companies where
          employees have more fixed schedules or need to plan travel to the
          office a month in advance.
        </BlogText>
      </List.Item>
    </List.Root>
    <BlogText>
      By setting a reasonable window, you level the playing field and
      drastically reduce ghost bookings.
    </BlogText>

    <BlogHeadingTertiary
      slug="restrict-scheduling"
      title="Keeping it Current: The 'Restrict Scheduling to Specific Days' Setting"
    />
    <BlogText>
      Does your company have a 4-day work week? Is the office closed on Fridays
      for deep work from home? This setting allows you to align your digital
      booking system with your physical office reality.
    </BlogText>

    <BlogHeadingTertiary
      slug="align-digital-office"
      title="Aligning Your Digital Office with Your Physical One"
    />
    <BlogText>
      Simply uncheck the days your office is closed (like Saturday and Sunday),
      and those dates will become unbookable on the schedule. This prevents
      accidental bookings on days when no one will be in the office, reducing
      confusion for employees and keeping your utilization data clean. It is a
      simple way to enforce your company&apos;s hybrid work policy without
      constant reminders.
    </BlogText>

    <BlogHeadingTertiary
      slug="allow-past-scheduling"
      title="The Power of Hindsight: 'Allow Scheduling in the Past'"
    />
    <BlogText>
      This setting might seem counterintuitive, but it is a powerful tool for
      data accuracy. We know people are busy. Someone might come into the
      office, grab an empty desk, and forget to book it.
    </BlogText>

    <BlogHeadingTertiary
      slug="historical-data"
      title="Why Accurate Historical Data is Your Secret Weapon"
    />
    <BlogText>
      By allowing scheduling in the past (e.g., for the previous day), you
      empower employees to correct the record. They can log their desk usage
      after the fact, ensuring it is captured in the system. Why does this
      matter? Because your workplace analytics are only as good as your data.
      This feature helps you get to 100% accuracy, which is essential when
      making big-ticket decisions about your real estate portfolio. It
      transforms your booking system from just a scheduling tool into a robust
      data collection platform. If you are struggling with getting started, our{" "}
      <Link colorPalette={"orange"} asChild>
        <NextLink href="/blog/signs-outgrown-office-spreadsheet">
          moving away from office spreadsheets
        </NextLink>
      </Link>{" "}
      can provide more context.
    </BlogText>

    {/* Building the Business Case */}
    <BlogHeadingSecondary
      slug="business-case"
      title="Building the Business Case: The ROI of Smart Desk Booking Limitations"
    />
    <BlogText>
      Implementing desk booking limitations is not just about creating a tidy
      schedule; it is about driving real business results. The controls within
      Workplacify&apos;s Office Settings directly impact your bottom line.
    </BlogText>

    <CtaActionContainer
      ctaContent={
        <CtaActionContainerContent
          title="See Office Settings in Action"
          description="Ready to take control of your workspace? Schedule a personalized demo to see how Workplacify's new desk booking limitations can optimize your office and save you money."
        />
      }
      ctaAction={
        <Button width={"100%"} colorScheme="blue" size="lg" asChild>
          <NextLink href={"/"}>Start a trial</NextLink>
        </Button>
      }
    />
    <BlogHeadingTertiary
      slug="real-estate-savings"
      title="Calculating Real Estate Savings Through Accurate Data"
    />
    <BlogText>
      Commercial real estate is one of the largest expenses for most companies.
      Making decisions about office space without accurate data is a massive
      financial risk.
    </BlogText>
    <List.Root paddingLeft={5}>
      <List.Item>
        <BlogText>
          <b>The Problem:</b> Ghost bookings and unrecorded desk usage skew your
          perception of office needs. You might think you need more space when
          you are actually just using your current space inefficiently.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>The Solution:</b> By using the &quot;Duration Scheduling
          Future&quot; setting to reduce ghost bookings and the &quot;Allow
          Scheduling in the Past&quot; setting to capture all activity, you get
          a crystal-clear picture of your actual desk utilization.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>The ROI:</b> This accurate data, as highlighted by workplace
          analytics firm XY Sense, is critical for &quot;right-sizing&quot; your
          real estate portfolio. Armed with reliable reports, you can
          confidently make decisions to consolidate floors, sublease excess
          space, or avoid costly expansions, leading to hundreds of thousands of
          dollars in savings.
        </BlogText>
      </List.Item>
    </List.Root>

    <BlogHeadingTertiary
      slug="boosting-productivity"
      title="Boosting Productivity by Reducing Uncertainty"
    />
    <BlogText>
      Every minute an employee spends trying to find a place to work or
      navigating a confusing booking system is a minute they are not spending on
      their core responsibilities.
    </BlogText>

    <ComparisonTile
      firstTile={
        <ComparisonTileBox
          colorPalette="orange"
          heading={<>Smart Desk Booking Rules</>}
          listItems={
            <>
              <ComparisonTileListItem
                checked
                title={<>Reduced Cognitive Load</>}
                description={
                  <>
                    Clear rules mean less time spent planning and worrying about
                    finding a desk
                  </>
                }
              />
              <ComparisonTileListItem
                checked
                title={<>Faster Onboarding</>}
                description={
                  <>
                    New hires can quickly understand the straightforward booking
                    process
                  </>
                }
              />
              <ComparisonTileListItem
                checked
                title={<>Focus on Work</>}
                description={
                  <>
                    Employees arrive knowing a desk is waiting, allowing them to
                    be productive immediately
                  </>
                }
              />
            </>
          }
        />
      }
      secondTile={
        <ComparisonTileBox
          colorPalette="gray"
          heading={<>Unrestricted Booking</>}
          listItems={
            <>
              <ComparisonTileListItem
                title={<>Decision Fatigue</>}
                description={
                  <>
                    Endless choices and a cluttered schedule create unnecessary
                    mental stress
                  </>
                }
              />
              <ComparisonTileListItem
                title={<>Time Wasted</>}
                description={
                  <>
                    Employees spend valuable time searching for desks and
                    managing long-term bookings
                  </>
                }
              />
              <ComparisonTileListItem
                title={<>Onboarding Confusion</>}
                description={
                  <>
                    Complicated or nonexistent rules make it hard for new
                    employees to get started
                  </>
                }
              />
            </>
          }
        />
      }
    />

    <List.Root paddingLeft={5}>
      <List.Item>
        <BlogText>
          <b>The Problem:</b> An unrestricted system creates uncertainty and
          planning overhead.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>The Solution:</b> Simple, clear desk booking limitations create a
          predictable and stress-free experience. Employees know the rules,
          trust the system is fair, and can book their space in seconds.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>The ROI:</b> A study from Gallup found that engaged, productive
          employees are a key driver of profitability. By removing a daily point
          of friction, you give time back to your employees, reduce their
          cognitive load, and empower them to focus on high-value work, directly
          contributing to overall business productivity. For more ideas on
          improving the office, see our post on{" "}
          <Link colorPalette={"orange"} asChild>
            <NextLink href="/blog/empty-office-improve-occupancy">
              how to improve office occupancy
            </NextLink>
          </Link>
          .
        </BlogText>
      </List.Item>
    </List.Root>

    <BlogHeadingTertiary
      slug="improving-retention"
      title="Improving Employee Retention with a Fairer System"
    />
    <BlogText>
      The modern employee expects a flexible, fair, and positive workplace
      experience. A poorly managed hot-desking system can be a major source of
      frustration and a reason for people to look elsewhere.
    </BlogText>
    <List.Root paddingLeft={5}>
      <List.Item>
        <BlogText>
          <b>The Problem:</b> When a few people always get the &quot;best&quot;
          desks, it creates a culture of &quot;haves&quot; and
          &quot;have-nots,&quot; leading to resentment.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>The Solution:</b> A limited booking window ensures that everyone
          has a fair chance to book a desirable desk. It democratizes access to
          office resources.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>The ROI:</b> According to Gartner, employee retention is a top
          priority for CEOs. Creating a fair and equitable environment is a
          low-cost, high-impact way to improve employee satisfaction. By using
          office settings to build a better booking experience, you show your
          employees that you value their time and well-being, which is a
          powerful factor in retaining top talent. This aligns perfectly with
          creating a strong{" "}
          <Link colorPalette={"orange"} asChild>
            <NextLink href="/free-tools/hybrid-workplace-policy-generator">
              hybrid workplace policy
            </NextLink>
          </Link>
          .
        </BlogText>
      </List.Item>
    </List.Root>

    {/* Quick Takeaways */}
    <BlogHeadingSecondary slug="quick-takeaways" title="Quick Takeaways" />
    <List.Root paddingLeft={5}>
      <List.Item>
        <BlogText>
          <b>Unrestricted booking causes problems:</b> It leads to wasted space
          from &quot;ghost bookings,&quot; employee frustration from unfairness,
          and planning difficulties.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Workplacify&apos;s new Office Settings give you control:</b> Easily
          set rules for how far in the future desks can be booked and on which
          days.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>A limited booking window is key:</b> Setting a future booking limit
          (e.g., 14 days) prevents desk hoarding and ensures fair access for
          everyone.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Align your digital and physical office:</b> Restrict bookings to
          specific days to match your company&apos;s work week (e.g.,
          Monday-Thursday).
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Data accuracy is a superpower:</b> Allowing past bookings helps you
          capture 100% of desk usage, leading to better real estate decisions.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Limitations deliver real ROI:</b> Smart rules lead to direct cost
          savings on real estate, improved employee productivity, and higher
          retention rates.
        </BlogText>
      </List.Item>
    </List.Root>

    {/* FAQs */}
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
            question: (
              <>What is the ideal desk booking window for a hybrid company?</>
            ),
            answer: (
              <>
                There is no single answer, but a 14-day booking window is a
                great starting point. It provides enough time for planning
                without allowing the schedule to become cluttered with
                long-term, uncertain bookings. We recommend starting there and
                adjusting based on employee feedback.
              </>
            ),
          },
          {
            questionId: "2",
            question: (
              <>
                Can I set different desk booking rules for different office
                locations or teams?
              </>
            ),
            answer: (
              <>
                Currently, the Office Settings apply to the entire office.
                However, creating more granular rules for specific departments
                or zones is a feature we are actively exploring for future
                updates.
              </>
            ),
          },
          {
            questionId: "3",
            question: (
              <>
                Will setting these limitations annoy our employees who like to
                plan far ahead?
              </>
            ),
            answer: (
              <>
                While a few employees may need to adjust, most will appreciate a
                fairer system where they do not have to compete with a handful
                of super-planners. Communicating the &quot;why&quot; behind the
                change—to ensure fairness and efficiency for everyone—is key to
                a smooth transition.
              </>
            ),
          },
          {
            questionId: "4",
            question: (
              <>
                How does allowing past bookings help with office space
                management?
              </>
            ),
            answer: (
              <>
                It ensures your utilization data is complete. If an employee
                uses a desk but forgets to book it, they can add it the next
                day. This complete data set is vital for making accurate,
                cost-saving decisions about your office lease and layout.
              </>
            ),
          },
          {
            questionId: "5",
            question: (
              <>
                How quickly can I set up these new office settings for my
                company?
              </>
            ),
            answer: (
              <>
                You can configure these settings in under a minute. Simply
                navigate to the &quot;Office Settings&quot; page in your
                Workplacify admin panel, enter your preferences, and click
                &quot;Submit.&quot; The rules will apply instantly to all future
                bookings.
              </>
            ),
          },
        ]}
      />
    </Box>

    {/* Take Control */}
    <BlogHeadingSecondary
      slug="take-control"
      title="Take Control of Your Workspace Today"
    />
    <BlogText>
      A well-organized office is a productive office. With Workplacify&apos;s
      new Office Settings feature, you have the power to create a fair,
      efficient, and data-driven desk booking system that works for everyone.
      Stop letting scheduling chaos dictate your workplace experience. It is
      time to implement smart desk booking limitations that save money, boost
      productivity, and keep your employees happy.
    </BlogText>

    <BlogText>
      Ready to see it for yourself?{" "}
      <Link colorPalette={"orange"} asChild>
        <NextLink href="/">Sign up for Workplacify for free</NextLink>
      </Link>{" "}
      or book a personalized demo with our team today.
    </BlogText>
  </Stack>
);

const DeskBookingLimitationsPage = () => {
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
                Setting up effective desk booking limitations is crucial for a
                smooth-running hybrid office, but getting it right can be
                tricky. Without clear rules, you risk everything from
                &quot;ghost bookings&quot; that waste valuable space to employee
                frustration over unfair desk availability. It often feels like
                you have to choose between total chaos and a system so rigid it
                defeats the purpose of flexibility. But what if you could have
                both control and adaptability? A system that enforces fairness,
                provides accurate data, and is simple for everyone to use.
              </BlogIntroductionText>
              <BlogIntroductionText>
                That is why we are excited to introduce a major update to
                Workplacify: Office Settings. This new feature gives workplace
                managers and HR teams precise control over their desk scheduling
                policies directly within the platform. You can now define
                exactly how far in advance your team can book, which days are
                available for scheduling, and even allow for past entries to
                ensure your data is always accurate. In this article, we will
                explore the problems with unrestricted booking, take a deep dive
                into our new office settings, and build a clear business case
                showing how these simple limitations can deliver a significant
                return on investment through real estate savings, productivity
                gains, and improved employee retention.
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

export default DeskBookingLimitationsPage;
