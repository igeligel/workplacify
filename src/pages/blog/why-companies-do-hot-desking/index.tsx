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
import ComparisonTile from "../../../chakra-starter/marketing-ui/ComparisonTile";
import { ComparisonTileBox } from "../../../chakra-starter/marketing-ui/ComparisonTile/ComparisonTileBox";
import { ComparisonTileListItem } from "../../../chakra-starter/marketing-ui/ComparisonTile/ComparisonTileListItem";
import { Faq } from "../../../components/Faq";
import { getMessages } from "../../../messages/getMessages";

const article = blogArticles.find(
  (article) => article.uuid === "13fd086f-486f-496d-99b7-19182a71df9d",
)!;

const BlogContent = () => (
  <Stack width="100%" gap={6}>
    <BlogHeadingSecondary
      slug="what-is-hot-desking"
      title="What is Hot Desking?"
    />
    <BlogText>
      Hot desking is an office organization system where desks are used by
      different people at different times. In a typical office, each employee
      has their own assigned desk. With hot desking, employees can choose where
      they want to sit each day. This can be a great way to save space and
      reduce costs, but it&apos;s not without its challenges.
    </BlogText>

    <BlogHeadingTertiary
      slug="rise-of-flexible-workspace"
      title="The Rise of the Flexible Workspace"
    />
    <BlogText>
      The traditional office layout is becoming a thing of the past.
      Today&apos;s workforce is more mobile and flexible than ever before. With
      the rise of hybrid work models, many employees are splitting their time
      between the office and home. This means that on any given day, a
      significant portion of your office desks may be sitting empty. Hot desking
      is a direct response to this shift, allowing companies to make more
      efficient use of their office space. According to{" "}
      <Link colorPalette={"orange"} asChild>
        <NextLink
          href="https://archieapp.co/blog/hot-desking-statistics/"
          target="_blank"
          rel="noopener noreferrer"
        >
          research by Archie
        </NextLink>
      </Link>
      , 60% of U.S. and Canadian employers now use some form of desk sharing.
    </BlogText>

    <BlogImage
      maxWidth={{ base: "100%", md: "60%" }}
      image={"/cubicle-farm-to-hot-desk-flexible.png"}
      alt="The evolution of office design, including hot desking."
    />

    <BlogHeadingSecondary
      slug="business-case"
      title="The Business Case for Hot Desking: Why Companies Make the Switch"
    />
    <BlogText>
      So, why do companies do hot desking? The motivations are multifaceted,
      ranging from financial incentives to a desire for a more dynamic and
      collaborative work environment. Let&apos;s explore the key drivers behind
      the adoption of hot desking.
    </BlogText>

    <BlogHeadingTertiary slug="cost-savings" title="Significant Cost Savings" />
    <BlogText>
      One of the most compelling reasons for implementing hot desking is the
      potential for significant cost savings. With a hybrid workforce, it&apos;s
      no longer necessary to have a dedicated desk for every employee. By
      reducing the number of desks, companies can downsize their office
      footprint, leading to lower rent, utilities, and maintenance costs. Many{" "}
      <Link colorPalette={"orange"} asChild>
        <NextLink href="/blog/desk-sharing-startups-cut-costs-boost-agility">
          startups are using desk sharing to cut costs and boost agility
        </NextLink>
      </Link>
      , with some companies reporting savings up to 30% on their real estate
      costs after implementing a hot desking model. You can use our{" "}
      <Link colorPalette={"orange"} asChild>
        <NextLink href="/free-tools/desk-scheduling-efficiency-calculator">
          Desk Scheduling Efficiency Calculator
        </NextLink>
      </Link>{" "}
      to see how much your company could save.
    </BlogText>

    <BlogHeadingTertiary
      slug="collaboration"
      title="Increased Collaboration and Communication"
    />
    <BlogText>
      According to{" "}
      <Link colorPalette={"orange"} asChild>
        <NextLink
          href="https://kadence.co/news/the-pros-and-cons-of-hot-desking/"
          target="_blank"
          rel="noopener noreferrer"
        >
          research by Kadence
        </NextLink>
      </Link>
      , hot desking can break down departmental silos and encourage employees to
      interact with colleagues they might not otherwise meet. This increased
      communication and collaboration can lead to new ideas, improved
      problem-solving, and a stronger sense of community. When employees are
      free to choose where they sit, they can position themselves near different
      teams or individuals, fostering a more dynamic and cross-functional work
      environment.
    </BlogText>

    <BlogHeadingTertiary
      slug="flexibility"
      title="Flexibility for a Hybrid Workforce"
    />
    <BlogText>
      Hot desking is a natural fit for companies with a hybrid work model. If
      you&apos;re considering implementing a hybrid workplace policy, our{" "}
      <Link colorPalette={"orange"} asChild>
        <NextLink href="/free-tools/hybrid-workplace-policy-generator">
          hybrid workplace policy generator
        </NextLink>
      </Link>{" "}
      can help you create clear guidelines. It provides employees with the
      flexibility to work in the office when they need to, without the company
      having to maintain a large, underutilized office space. This flexibility
      is a major draw for top talent, with 77% of employees considering flexible
      work arrangements before choosing an organization. For a detailed
      comparison of different flexible seating models, check out our guide on{" "}
      <Link colorPalette={"orange"} asChild>
        <NextLink href="/blog/desk-sharing-vs-hot-desking-differences">
          desk sharing vs hot desking differences
        </NextLink>
      </Link>
      .
    </BlogText>

    <CtaActionContainer
      ctaContent={
        <CtaActionContainerContent
          title="Ready to Embrace a More Flexible Workplace?"
          description="Workplacify's desk booking software makes it easy to manage your hot desking environment, from booking desks to analyzing usage data. See how we can help you create a more efficient and collaborative workspace."
        />
      }
      ctaAction={
        <Button width={"100%"} colorScheme="blue" size="lg" asChild>
          <NextLink href={"/"}>Learn More</NextLink>
        </Button>
      }
    />

    <BlogHeadingSecondary
      slug="employee-perspective"
      title="The Employee Perspective: The Good, The Bad, and The Ugly"
    />
    <BlogText>
      While hot desking offers clear benefits for companies, the employee
      experience can be a mixed bag. It&apos;s crucial to understand both the
      positive and negative aspects of hot desking from the employee&apos;s
      point of view.
    </BlogText>

    <BlogHeadingTertiary
      slug="good-perspective"
      title="The Good: A Change of Scenery and New Connections"
    />
    <BlogText>
      For some employees, hot desking is a welcome change from the monotony of
      sitting at the same desk every day. It offers the opportunity to choose a
      workspace that suits their mood and tasks for the day. It can also lead to
      new connections and friendships, as employees interact with a wider range
      of colleagues.
    </BlogText>

    <BlogHeadingTertiary
      slug="bad-perspective"
      title="The Bad: The Daily Desk Hunt and Lack of Personalization"
    />
    <BlogText>
      For others, the daily scramble for a desk can be a source of stress and
      anxiety. The lack of a personal workspace can also be a major drawback, as
      employees are unable to personalize their desks with photos, plants, or
      other personal items. This can lead to a feeling of detachment from the
      company and a less comfortable work environment. As one{" "}
      <Link colorPalette={"orange"} asChild>
        <NextLink
          href="https://www.reddit.com/r/Wellington/comments/vilz0x/why_is_everyone_hotdeskingflexiworking_now/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Reddit user commented
        </NextLink>
      </Link>
      , &quot;The worst part is the stress of not knowing where you&apos;ll be
      sitting each day.&quot;
    </BlogText>

    <BlogHeadingTertiary
      slug="ugly-perspective"
      title="The Ugly: Hygiene Concerns and Territorial Disputes"
    />
    <BlogText>
      In a hot desking environment, hygiene can be a major concern. With
      multiple people using the same desk and equipment, it&apos;s essential to
      have a robust cleaning protocol in place. Territorial disputes can also
      arise, with some employees attempting to &quot;claim&quot; a particular
      desk or area. These issues can create a negative and unproductive work
      environment if not addressed properly.
    </BlogText>

    <ComparisonTile
      firstTile={
        <ComparisonTileBox
          colorPalette="green"
          heading={<>Advantages</>}
          listItems={
            <>
              <ComparisonTileListItem
                checked
                title={<>1. Significant Cost Savings</>}
                description={
                  <>
                    Reduce real estate costs by up to 30% by optimizing desk
                    usage and downsizing office footprint
                  </>
                }
              />
              <ComparisonTileListItem
                checked
                title={<>2. Increased Collaboration</>}
                description={
                  <>
                    Break down departmental silos as employees interact with
                    different colleagues each day
                  </>
                }
              />
              <ComparisonTileListItem
                checked
                title={<>3. Workplace Flexibility</>}
                description={
                  <>
                    Support hybrid work models while maintaining efficient use
                    of office space
                  </>
                }
              />
            </>
          }
        />
      }
      secondTile={
        <ComparisonTileBox
          colorPalette="red"
          heading={<>Disadvantages</>}
          listItems={
            <>
              <ComparisonTileListItem
                title={<>1. Daily Desk Hunt Stress</>}
                description={
                  <>
                    Employees may experience anxiety about finding available
                    desks, especially during peak times
                  </>
                }
              />
              <ComparisonTileListItem
                title={<>2. Lack of Personalization</>}
                description={
                  <>
                    No ability to personalize workspace with photos or personal
                    items, leading to reduced sense of belonging
                  </>
                }
              />
              <ComparisonTileListItem
                title={<>3. Hygiene and Territory Issues</>}
                description={
                  <>
                    Concerns about desk cleanliness and territorial disputes
                    over preferred spaces can create tension
                  </>
                }
              />
            </>
          }
        />
      }
    />

    <BlogHeadingSecondary
      slug="implementation"
      title="How to Implement Hot Desking Successfully: A Guide for Workplace Managers"
    />
    <BlogText>
      If you&apos;ve decided that hot desking is the right choice for your
      company, it&apos;s important to implement it thoughtfully and
      strategically. Here are some best practices to ensure a smooth transition
      and a successful hot desking program.
    </BlogText>

    <BlogHeadingTertiary
      slug="desk-booking-system"
      title="Invest in a Robust Desk Booking System"
    />
    <BlogText>
      A user-friendly desk booking system is essential for a successful hot
      desking program. This will allow employees to easily see which desks are
      available and book a space in advance. A good booking system can also
      provide valuable data on desk usage, helping you to optimize your office
      layout and resources. If you&apos;re still using a spreadsheet to manage
      your desks, check out our guide on{" "}
      <Link colorPalette={"orange"} asChild>
        <NextLink href="/blog/signs-outgrown-office-spreadsheet">
          signs you&apos;ve outgrown your office spreadsheet
        </NextLink>
      </Link>{" "}
      and learn about the{" "}
      <Link colorPalette={"orange"} asChild>
        <NextLink href="/blog/desk-scheduling-the-hidden-costs-of-your-spreadsheet">
          hidden costs of using a spreadsheet
        </NextLink>
      </Link>{" "}
      for desk scheduling.
    </BlogText>

    <BlogHeadingTertiary
      slug="variety-workspaces"
      title="Create a Variety of Workspaces"
    />
    <BlogText>
      One of the biggest mistakes companies make with hot desking is simply
      replacing assigned desks with a sea of generic, identical workstations. To
      create a truly flexible and productive work environment, it&apos;s
      important to offer a variety of workspaces to suit different tasks and
      preferences. This could include quiet zones for focused work,
      collaborative areas for team projects, and comfortable lounge areas for
      informal meetings.
    </BlogText>

    <BlogHeadingTertiary
      slug="clear-policies"
      title="Establish Clear Policies and Etiquette"
    />
    <BlogText>
      To avoid confusion and conflict, it&apos;s important to establish clear
      policies and etiquette for your hot desking program. This should include
      guidelines on booking desks, cleaning up after yourself, and respecting
      the needs of your colleagues. Make sure to communicate these policies
      clearly to all employees and provide training on how to use the desk
      booking system.
    </BlogText>

    <CtaActionContainer
      ctaContent={
        <CtaActionContainerContent
          title="Ready to Transform Your Workspace?"
          description="Whether you're just starting with hot desking or looking to optimize your current setup, we can help you create a more efficient and collaborative workspace."
        />
      }
      ctaAction={
        <Button width={"100%"} colorScheme="blue" size="lg" asChild>
          <NextLink href={"/"}>Get Started</NextLink>
        </Button>
      }
    />

    <BlogHeadingSecondary slug="quick-takeaways" title="Quick Takeaways" />
    <List.Root paddingLeft={5}>
      <List.Item>
        <BlogText>
          <b>Cost savings:</b> Hot desking can significantly reduce real estate
          and operational costs.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Increased collaboration:</b> It can break down silos and foster a
          more collaborative work environment.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Flexibility for hybrid work:</b> It&apos;s a natural fit for
          companies with a hybrid work model.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Employee experience is key:</b> The success of your hot desking
          program depends on the employee experience.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Invest in technology:</b> A good desk booking system is essential
          for a smooth and efficient process.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Offer a variety of workspaces:</b> Provide a range of options to
          suit different tasks and preferences.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Communication is crucial:</b> Clearly communicate your hot desking
          policies and etiquette to all employees.
        </BlogText>
      </List.Item>
    </List.Root>

    <BlogHeadingSecondary slug="conclusion" title="Conclusion" />
    <BlogText>
      So, why do companies do hot desking? The answer is clear: it offers a
      powerful combination of cost savings, increased collaboration, and
      flexibility for a hybrid workforce. However, it&apos;s not a
      one-size-fits-all solution. To be successful, hot desking must be
      implemented thoughtfully and with a focus on the employee experience. By
      investing in the right technology, creating a variety of workspaces, and
      establishing clear policies, you can create a hot desking environment that
      is both efficient and enjoyable for your employees.
    </BlogText>
    <BlogText>
      Are you ready to embrace the future of work? With the right approach, hot
      desking can be a valuable tool in your workplace strategy, helping you to
      create a more dynamic, collaborative, and cost-effective office
      environment.
    </BlogText>

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
              <>What is the main benefit of hot desking for a company?</>
            ),
            answer: (
              <>
                The main benefit of hot desking is cost savings. By reducing the
                number of assigned desks, companies can significantly reduce
                their real estate and operational costs.
              </>
            ),
          },
          {
            questionId: "2",
            question: <>How does hot desking affect employee productivity?</>,
            answer: (
              <>
                The effect of hot desking on employee productivity can be mixed.
                Some employees find that the flexibility and change of scenery
                boosts their productivity, while others find the lack of a
                consistent workspace to be distracting.
              </>
            ),
          },
          {
            questionId: "3",
            question: (
              <>What are some of the challenges of implementing hot desking?</>
            ),
            answer: (
              <>
                Some of the challenges of implementing hot desking include
                employee resistance, hygiene concerns, and the need for a robust
                desk booking system.
              </>
            ),
          },
          {
            questionId: "4",
            question: <>Is hot desking suitable for all companies?</>,
            answer: (
              <>
                No, hot desking is not suitable for all companies. It works best
                for companies with a mobile or hybrid workforce, and in roles
                that do not require specialized equipment at a fixed location.
              </>
            ),
          },
          {
            questionId: "5",
            question: (
              <>How can I make hot desking more appealing to my employees?</>
            ),
            answer: (
              <>
                To make hot desking more appealing, you can offer a variety of
                workspaces, provide a user-friendly desk booking system, and
                establish clear policies and etiquette. It&apos;s also important
                to listen to employee feedback and make adjustments as needed.
              </>
            ),
          },
        ]}
      />
    </Box>
  </Stack>
);

const WhyCompaniesDoHotDeskingBlogPage = () => {
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
                As a workplace experience manager, you&apos;re always looking
                for ways to improve your office environment. You want to create
                a space that is both productive and enjoyable for your
                employees. <b>Why do companies do hot desking?</b> This is a
                question that many workplace managers are asking themselves. Hot
                desking, a flexible seating arrangement where employees do not
                have assigned desks, has become a popular trend in recent years.
                But is it right for your company?
              </BlogIntroductionText>
              <BlogIntroductionText>
                This article will explore the reasons why companies are adopting
                hot desking, the benefits and drawbacks of this flexible
                workspace model, and how to implement it successfully. We will
                also look at some real-world examples and data to help you make
                an informed decision.
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

export default WhyCompaniesDoHotDeskingBlogPage;
