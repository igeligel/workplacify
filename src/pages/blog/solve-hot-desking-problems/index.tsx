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
  (article) => article.title === "5 Hot Desking Problems & How to Solve Them",
)!;

const BlogContent = () => (
  <Stack width="100%" gap={6}>
    <BlogHeadingSecondary
      slug="problem-1"
      title="Problem 1: The Daily Desk Hunt & Squatter's Rights"
    />
    <BlogText>
      The clock strikes 9 AM. Employees start to trickle in, but instead of
      settling in to work, they begin a familiar ritual: the slow, anxious lap
      around the office. They are looking for an available desk, preferably one
      by a window or near their team. This daily hunt wastes time, creates
      stress, and can lead to &quot;desk squatting,&quot; where employees leave
      personal items to unofficially claim a desk for days at a time.
    </BlogText>

    <BlogHeadingTertiary
      slug="chaos-first-come"
      title="The Chaos of First-Come, First-Served"
    />
    <BlogText>
      A first-come, first-served approach seems fair on the surface, but it
      often rewards arrival time over actual need. It creates a competitive
      environment and penalizes employees who may have legitimate reasons for a
      later start, such as childcare drop-offs or client meetings. This
      uncertainty adds a layer of stress to the start of every workday and can
      lead to employees coming in earlier than needed just to secure a spot,
      negating some of the flexibility hot desking is meant to offer.
      Productivity dips as the first 15-30 minutes of the day are lost to simply
      finding a place to work.
    </BlogText>

    <BlogHeadingTertiary
      slug="solution-booking-system"
      title="Solution: Implement a Smart Booking System"
    />
    <BlogText>
      The most effective way to eliminate the desk hunt is to switch from a
      &quot;find&quot; model to a &quot;book&quot; model. Implementing a
      dedicated hot desking software allows employees to see desk availability
      and reserve a specific spot before they even leave for the office.
    </BlogText>

    <BlogHeadingTertiary
      slug="spreadsheets-dont-cut-it"
      title="Why Spreadsheets Don't Cut It"
    />
    <BlogText>
      Many companies start by{" "}
      <Link colorPalette={"orange"} asChild>
        <NextLink href="/blog/desk-scheduling-the-hidden-costs-of-your-spreadsheet">
          managing desk reservations with a spreadsheet
        </NextLink>
      </Link>
      , but they quickly discover its limitations. Spreadsheets are clunky,
      difficult to manage in real-time, and prone to errors like
      double-bookings. They lack visual floor plans, making it hard for
      employees to understand where a desk is located. As your team grows, you
      will soon see the signs that you have outgrown your office spreadsheet.
    </BlogText>

    <BlogHeadingTertiary
      slug="role-of-software"
      title="The Role of Hot Desking Software"
    />
    <BlogText>
      Modern <b>hot desking software</b> like Workplacify provides a seamless
      solution. Employees can open an app, view an interactive map of the
      office, see which desks are free, and book a spot in seconds. This removes
      uncertainty and ensures everyone has a guaranteed place to work. It also
      provides valuable data for workplace managers. You can see which desks are
      most popular and how your space is being used, allowing you to make
      data-driven decisions about your office layout and resource allocation.
    </BlogText>

    <CtaActionContainer
      ctaContent={
        <CtaActionContainerContent
          title="Is Your Spreadsheet Holding You Back?"
          description="See how much time and money you could save by switching to a dedicated desk booking system. Try our free Desk Scheduling Efficiency Calculator."
        />
      }
      ctaAction={
        <Button width={"100%"} colorScheme="blue" size="lg" asChild>
          <NextLink href={"/free-tools/desk-scheduling-efficiency-calculator"}>
            Try Our Free Calculator
          </NextLink>
        </Button>
      }
    />

    <BlogHeadingSecondary
      slug="problem-2"
      title='"Where is Everyone?" - Finding Teammates'
    />
    <BlogText>
      Hot desking can feel like a game of hide-and-seek. An employee comes in
      for a day of collaboration with their project team, only to find they are
      scattered across different floors. The time that should be spent on
      productive teamwork is wasted sending Slack messages and wandering the
      office trying to locate colleagues. This is one of the most significant{" "}
      <b>hot desking problems</b> because it directly impacts collaboration and
      teamwork.
    </BlogText>

    <BlogHeadingTertiary
      slug="collaboration-killer"
      title="The Collaboration Killer"
    />
    <BlogText>
      Spontaneous collaboration—the quick question, the whiteboard session, the
      shared &quot;aha!&quot; moment—is a cornerstone of innovation. When team
      members cannot easily find each other, these valuable interactions are
      lost. It introduces friction into simple communication, forcing employees
      to schedule a formal meeting for a question that could have been answered
      with a quick chat. This can slow down projects and make employees feel
      disconnected from their immediate team.
    </BlogText>

    <BlogImage
      maxWidth={{ base: "100%", md: "80%" }}
      image={"/team-neighborhoods-solves-problems.png"}
      alt="A diagram illustrating how managing hot desks with team neighborhoods solves collaboration problems compared to random seating."
    />

    <BlogHeadingTertiary
      slug="solution-interactive-plans"
      title="Solution: Use Interactive Floor Plans & Neighborhoods"
    />
    <BlogText>
      Technology and smart office design can solve the problem of finding
      colleagues. A combination of visual tools and a strategic seating strategy
      ensures teams can sit together when they need to collaborate.
    </BlogText>

    <BlogHeadingTertiary
      slug="creating-zones"
      title="Creating Team 'Zones' or 'Neighborhoods'"
    />
    <BlogText>
      Instead of making the entire office a free-for-all, you can designate
      specific areas or &quot;neighborhoods&quot; for different departments or
      project teams. Within their neighborhood, team members can still choose
      any available desk, retaining the flexibility of hot desking. But this
      approach ensures that members of the same team are always in the same
      general area, making it easy to find each other and collaborate. This
      strategy is a core component of successfully <b>managing hot desks</b> for
      larger teams.
    </BlogText>

    <BlogHeadingTertiary
      slug="visualizing-office"
      title="Visualizing Who's in the Office"
    />
    <BlogText>
      Good <b>hot desking software</b> provides a live, interactive floor plan.
      Employees can not only see which desks are available but also who has
      booked them. This feature is incredibly useful. An employee can quickly
      search for a colleague&apos;s name and see exactly where they are sitting
      that day. This simple function removes the guesswork and makes connecting
      with teammates effortless, preserving the collaborative energy of the
      office.
    </BlogText>

    <BlogHeadingSecondary
      slug="problem-3"
      title="The Tech & Equipment Lottery"
    />
    <BlogText>
      An employee arrives at their booked desk, ready to start a day of video
      calls and data analysis, only to find the desk lacks the second monitor
      they need. Or a developer grabs a spot only to realize it does not have
      the right docking station for their laptop. This &quot;tech lottery&quot;
      is a common source of frustration and a major productivity killer in hot
      desking environments.
    </BlogText>

    <BlogHeadingTertiary
      slug="mismatched-needs"
      title="Mismatched Needs and Workstation Setups"
    />
    <BlogText>
      Not all work is the same, and not all workstations need to be identical. A
      graphic designer needs a high-resolution monitor, while a sales
      representative might just need a phone and a headset. When all desks are
      treated as interchangeable, it leads to a constant mismatch between
      employee needs and available equipment. This forces employees to either
      waste time hunting for a suitable desk or try to make do with a
      sub-optimal setup, harming both their productivity and their overall
      experience.
    </BlogText>

    <BlogHeadingTertiary
      slug="solution-standardize"
      title="Solution: Standardize and Categorize Desks"
    />
    <BlogText>
      The solution is not to make every desk identical, which can be
      prohibitively expensive. Instead, the answer lies in standardizing a few
      key workstation types and making it easy for employees to find the one
      that fits their needs for the day.
    </BlogText>

    <ComparisonTile
      firstTile={
        <ComparisonTileBox
          colorPalette="gray"
          heading={<>Alternative Approach</>}
          listItems={
            <>
              <ComparisonTileListItem
                title={<>1. Random Search</>}
                description={
                  <>
                    Wander the office hoping to find a free desk with what you
                    need
                  </>
                }
              />
              <ComparisonTileListItem
                title={<>2. Equipment Burden</>}
                description={<>Carry adapters and cables with you everywhere</>}
              />
              <ComparisonTileListItem
                title={<>3. IT Dependency</>}
                description={<>Interrupt IT to help you find equipment</>}
              />
            </>
          }
        />
      }
      secondTile={
        <ComparisonTileBox
          colorPalette="orange"
          heading={<>Smart Desk Booking</>}
          listItems={
            <>
              <ComparisonTileListItem
                checked
                title={<>1. Filtered Search</>}
                description={
                  <>
                    Find a desk with the right equipment (e.g., dual monitors,
                    standing desk)
                  </>
                }
              />
              <ComparisonTileListItem
                checked
                title={<>2. Advance Planning</>}
                description={<>Guarantee your setup before you commute</>}
              />
              <ComparisonTileListItem
                checked
                title={<>3. Team Coordination</>}
                description={
                  <>See which colleagues have booked similar desks</>
                }
              />
            </>
          }
          cta={
            <ComparisonTileCta>
              <NextLink href="/app/schedule">Try Smart Desk Booking</NextLink>
            </ComparisonTileCta>
          }
        />
      }
    />

    <BlogHeadingTertiary
      slug="using-desk-attributes"
      title="Using Desk Attributes in Your Booking System"
    />
    <BlogText>
      This is another area where dedicated <b>hot desking software</b> shines.
      When setting up your office map in a system like Workplacify, you can add
      specific attributes or amenities to each desk. You can tag desks as
      having:
    </BlogText>
    <List.Root paddingLeft={5}>
      <List.Item>
        <BlogText>Dual monitors</BlogText>
      </List.Item>
      <List.Item>
        <BlogText>A specific docking station (e.g., USB-C)</BlogText>
      </List.Item>
      <List.Item>
        <BlogText>An ergonomic chair</BlogText>
      </List.Item>
      <List.Item>
        <BlogText>A standing desk option</BlogText>
      </List.Item>
      <List.Item>
        <BlogText>A phone headset</BlogText>
      </List.Item>
    </List.Root>
    <BlogText>
      When an employee goes to book a desk, they can filter the office map by
      these attributes. If they need two monitors, they can instantly see all
      the available desks that meet this requirement. This turns the tech
      lottery into a deliberate choice, ensuring every employee has the tools
      they need to be productive from the moment they sit down. According to
      research by{" "}
      <Link colorPalette={"orange"} asChild>
        <NextLink
          href="https://www.cbre.com/insights/articles/the-future-of-the-office-2021-us-occupier-sentiment-survey"
          target="_blank"
          rel="noopener noreferrer"
        >
          CBRE
        </NextLink>
      </Link>
      , providing employees with the right technology and a choice in their work
      setting is critical for a positive workplace experience.
    </BlogText>

    <BlogHeadingSecondary
      slug="problem-4"
      title="Hygiene Headaches & The Messy Desk Dilemma"
    />
    <BlogText>
      In a traditional office, your desk is your own. You can leave a coffee
      mug, a stack of papers, or a family photo. In a hot desking environment,
      your desk today is your colleague&apos;s desk tomorrow. This shared nature
      can lead to significant hygiene concerns and conflicts over cleanliness,
      especially in a post-pandemic world. Employees may worry about germs or
      feel frustrated when they arrive at a desk littered with the previous
      user&apos;s crumbs and clutter.
    </BlogText>

    <BlogHeadingTertiary
      slug="shared-spaces"
      title="Shared Spaces, Shared Germs"
    />
    <BlogText>
      Health and safety are top priorities for today&apos;s workforce. A{" "}
      <Link colorPalette={"orange"} asChild>
        <NextLink
          href="https://www.gensler.com/blog/insights-from-genslers-u-s-work-from-home-survey-2020"
          target="_blank"
          rel="noopener noreferrer"
        >
          survey from Gensler
        </NextLink>
      </Link>{" "}
      found that the top-ranked element that would make employees feel
      comfortable returning to the office was stricter and more enforced
      cleaning policies. If employees perceive their shared workspace as
      unclean, it can lead to anxiety and a reluctance to come into the office
      at all. This undermines the goal of creating a welcoming and collaborative
      environment.
    </BlogText>

    <BlogHeadingTertiary
      slug="solution-etiquette"
      title="Solution: Establish Clear Etiquette and Cleaning Protocols"
    />
    <BlogText>
      Tackling hygiene issues requires a two-pronged approach: setting clear
      expectations for employees and implementing reliable cleaning processes.
      Both can be supported by your workplace management system.
    </BlogText>

    <BlogImage
      maxWidth={{ base: "100%", md: "80%" }}
      image={"/clean-desk-policy.png"}
      alt="An infographic outlining the key points of a clean desk policy for solving hot desking problems related to hygiene."
    />

    <BlogHeadingTertiary
      slug="clean-desk-policy"
      title="The Power of a Clean Desk Policy"
    />
    <BlogText>
      A formal &quot;Clean Desk Policy&quot; is essential for{" "}
      <b>managing hot desks</b>. This is not just about tidiness; it is about
      respect for the shared environment. The policy should be simple and clear:
      at the end of the day, employees are expected to clear the desk of all
      personal items, dispose of any trash, and wipe down the surfaces with
      provided sanitary wipes.
    </BlogText>

    <BlogText>
      Communicating this policy is key. It should be part of the employee
      onboarding process and reinforced through signage in the office. To make
      it even easier, you can create a{" "}
      <Link colorPalette={"orange"} asChild>
        <NextLink href="/free-tools/hybrid-workplace-policy-generator">
          hybrid workplace policy
        </NextLink>
      </Link>{" "}
      that includes your hot desking etiquette. A central policy ensures
      everyone understands the expectations for using shared spaces. By making
      it a collective responsibility, you foster a culture of mutual respect.
    </BlogText>

    <BlogText>
      Your hot desking software can also help. You can include a pop-up reminder
      of the clean desk policy when an employee ends their booking for the day.
      Some systems even allow employees to discreetly flag a desk that was left
      in a poor state, allowing facilities teams to address the issue.
    </BlogText>

    <BlogHeadingSecondary
      slug="problem-5"
      title="Eroding Team Culture and Belonging"
    />
    <BlogText>
      One of the most subtle but significant <b>hot desking problems</b> is the
      potential loss of team identity and a sense of belonging. When employees
      do not have a physical &quot;home base&quot; in the office—a specific desk
      in a specific team area—they can begin to feel like anonymous visitors in
      their own workplace. This can weaken social bonds, reduce team cohesion,
      and make it harder to build a strong, unified company culture.
    </BlogText>

    <BlogHeadingTertiary
      slug="losing-home-base"
      title="Losing the 'Home Base' Feeling"
    />
    <BlogText>
      A dedicated desk provides more than just a place to work. It is a personal
      space that anchors an employee to their team and the organization. It is
      where team jokes are shared, photos are displayed, and a sense of
      permanence is established. Hot desking removes this anchor. While some
      employees embrace the freedom, others can feel untethered and
      disconnected. As{" "}
      <Link colorPalette={"orange"} asChild>
        <NextLink
          href="https://hbr.org/2019/12/the-value-of-belonging-at-work"
          target="_blank"
          rel="noopener noreferrer"
        >
          Harvard Business Review notes
        </NextLink>
      </Link>
      , a sense of belonging is a fundamental human need, and a lack of it can
      lead to lower engagement and higher turnover.
    </BlogText>

    <BlogHeadingTertiary
      slug="solution-build-culture"
      title="Solution: Proactively Build Culture Beyond the Desk"
    />
    <BlogText>
      If the desk is no longer the center of an employee&apos;s work life, then
      you must be intentional about creating other anchors for connection and
      culture. The office&apos;s purpose shifts from a place for individual work
      to a hub for collaboration, connection, and culture-building.
    </BlogText>

    <BlogHeadingTertiary
      slug="fostering-connection"
      title="Fostering Connection in a Flexible Environment"
    />
    <BlogText>
      Here are a few strategies for building culture when{" "}
      <b>managing hot desks</b>:
    </BlogText>
    <List.Root paddingLeft={5}>
      <List.Item>
        <BlogText>
          <b>Use Team Neighborhoods:</b> As mentioned earlier, grouping teams in
          designated zones helps maintain a sense of team identity and makes it
          easier for colleagues to connect.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Provide Ample Storage:</b> A lack of personal storage is a common
          employee complaint. Providing secure day lockers where employees can
          store their personal belongings gives them a small, permanent space to
          call their own, even if their desk changes daily.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Optimize for a Purpose:</b> Encourage teams to coordinate their
          in-office days. A good <b>hot desking software</b> shows who is
          planning to be in the office on any given day, making this
          coordination simple. Teams can plan to come in on the same day for
          specific activities like project kick-offs, brainstorming sessions, or
          team lunches. This transforms the office from &quot;a place I have to
          go&quot; to &quot;a place we go to connect and collaborate.&quot;
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Invest in Social and Collaborative Spaces:</b> If desks are
          transient, the permanent social spaces—the kitchen, lounge areas, and
          collaborative zones—become even more important. Make these spaces
          inviting and functional to encourage the informal interactions that
          build strong working relationships.
        </BlogText>
      </List.Item>
    </List.Root>

    <BlogHeadingSecondary slug="key-takeaways" title="Key Takeaways" />
    <BlogText>
      Managing a hot desking system does not have to be a headache. By
      anticipating these common challenges, you can build a system that works.
    </BlogText>
    <List.Root paddingLeft={5}>
      <List.Item>
        <BlogText>
          <b>Problem 1: The Desk Hunt.</b> Solution: Replace spreadsheets with a
          smart <b>hot desking software</b> for easy, advanced booking.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Problem 2: Finding Teammates.</b> Solution: Use interactive maps
          and create team &quot;neighborhoods&quot; to facilitate collaboration.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Problem 3: Tech Lottery.</b> Solution: Categorize desks by
          amenities and allow employees to filter and book based on their
          specific needs.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Problem 4: Hygiene Issues.</b> Solution: Implement and communicate
          a clear Clean Desk Policy, supported by easy-to-access cleaning
          supplies.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Problem 5: Weakened Culture.</b> Solution: Be intentional about
          building culture by coordinating team days and optimizing social
          spaces.
        </BlogText>
      </List.Item>
    </List.Root>

    <BlogHeadingSecondary
      slug="from-problems-to-productivity"
      title="From Problems to Productivity with Workplacify"
    />
    <BlogText>
      The common thread through all these solutions is a shift from chaos to
      clarity. The most successful hot desking environments are not random; they
      are intentionally managed systems designed to support employee needs.
      While policies and office design are crucial, the right technology is the
      engine that makes it all run smoothly.
    </BlogText>

    <BlogText>
      Effective <b>hot desking software</b> eliminates the daily friction
      points, empowers employees with choice and certainty, and provides you
      with the data you need to continuously improve your workplace. By solving
      the core <b>hot desking problems</b> of finding desks, people, and
      resources, you can unlock the true benefits of a flexible office: a more
      engaged, collaborative, and productive workforce.
    </BlogText>

    <BlogHeadingTertiary
      slug="next-steps"
      title="Your Next Steps for Managing Hot Desks"
    />
    <BlogText>
      Ready to move beyond the problems and build a better flexible work
      experience? The first step is to understand where your current system
      falls short. If you are still using a manual system or a clunky
      spreadsheet, it is time to see what a modern solution can do for you.
    </BlogText>

    <BlogText>
      Explore how Workplacify can help you implement desk booking, interactive
      maps, and resource management to create a seamless hot desking experience
      for your team.
    </BlogText>

    <CtaActionContainer
      ctaContent={
        <CtaActionContainerContent
          title="Ready to Transform Your Hot Desking Experience?"
          description="Say goodbye to desk hunting, team coordination challenges, and hygiene concerns. Try Workplacify's smart desk booking system today."
        />
      }
      ctaAction={
        <Button width={"100%"} colorScheme="blue" size="lg" asChild>
          <NextLink href={"/app/schedule"}>Get Started Now</NextLink>
        </Button>
      }
    />

    <BlogHeadingSecondary
      slug="faqs"
      title="Frequently Asked Questions about Hot Desking Problems"
    />
    <Box fontSize={"md"}>
      <Faq
        withoutHeading
        questionsAndAnswers={[
          {
            questionId: "1",
            question: (
              <>What is a good desk-to-employee ratio for hot desking?</>
            ),
            answer: (
              <>
                There is no single perfect number, but many companies find
                success with ratios between 1:1.2 and 1:1.5 (meaning 10 desks
                for every 12-15 employees). The ideal ratio depends on your
                specific hybrid work policy and average office attendance. The
                best approach is to start with a conservative ratio and use data
                from your hot desking software to adjust over time.
              </>
            ),
          },
          {
            questionId: "2",
            question: (
              <>How do you handle personal storage in a hot desking office?</>
            ),
            answer: (
              <>
                Providing secure day-use lockers is the most common and
                effective solution. Employees can store their personal items,
                bags, and laptop for the day. This keeps desks clear and gives
                employees a personal &quot;home base&quot; in the office.
              </>
            ),
          },
          {
            questionId: "3",
            question: (
              <>How do you get employee buy-in for a new hot desking policy?</>
            ),
            answer: (
              <>
                Communication is key. Clearly explain the &quot;why&quot; behind
                the shift—the benefits for both the company (efficiency) and
                them (flexibility). Involve employees in the process by asking
                for feedback on the new system. Most importantly, ensure you
                have a robust software and clear policies in place from day one
                to make the transition as smooth as possible.
              </>
            ),
          },
          {
            questionId: "4",
            question: (
              <>
                Can hot desking work for creative or highly collaborative teams?
              </>
            ),
            answer: (
              <>
                Absolutely. In fact, it can be better if managed correctly. By
                creating team &quot;neighborhoods&quot; and encouraging teams to
                coordinate their in-office days for collaborative work, you can
                create a focused, high-energy environment. It ensures that when
                people are in the office, they are there with the right people
                at the right time.
              </>
            ),
          },
          {
            questionId: "5",
            question: (
              <>
                What is the difference between hot desking and office hoteling?
              </>
            ),
            answer: (
              <>
                The terms are often used interchangeably, but there is a slight
                difference.{" "}
                <Link colorPalette={"orange"} asChild>
                  <NextLink href="/blog/desk-sharing-vs-hot-desking-differences">
                    Hot desking is typically a first-come, first-served system
                  </NextLink>
                </Link>
                , while office hoteling implies an advance reservation is
                required, much like booking a hotel room. Modern successful
                strategies almost always use the hoteling (booking) model, even
                if they call it hot desking.
              </>
            ),
          },
        ]}
      />
    </Box>
  </Stack>
);

const SolveHotDeskingProblemsPage = () => {
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
                Hot desking promised a new era of workplace flexibility and cost
                efficiency. For many organizations, it delivered. But without a
                clear strategy, managing hot desks can create a new set of
                challenges that frustrate employees and undermine the very
                benefits you seek. From the daily scramble for a good spot to
                the slow erosion of team culture, these issues can turn a
                flexible office into a source of daily friction.
              </BlogIntroductionText>
              <BlogIntroductionText>
                The good news is that these hot desking problems are not
                inevitable. They are symptoms of a flawed system, not a flawed
                concept. With the right approach and the right tools, you can
                solve these common issues and build a thriving, efficient, and
                collaborative flexible workplace. This article breaks down the
                five most common hot desking problems we see and provides
                practical, actionable solutions for each. We will cover
                everything from finding a desk to finding your team, ensuring
                your hot desking strategy works for everyone.
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

export default SolveHotDeskingProblemsPage;
