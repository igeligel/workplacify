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
    "Why We Chose to Be Open-Source: The Workplacify Philosophy",
)!;

const BlogContent = () => (
  <Stack width="100%" gap={6}>
    {/* The Problem with the "Black Box" Workplace Model */}
    <BlogHeadingSecondary
      slug="black-box-problem"
      title='The Problem with the "Black Box" Workplace Model'
    />
    <BlogText>
      Before we built Workplacify, we worked as consultants helping companies
      navigate the maze of workplace technology. We saw the same story play out
      time and again. A company would invest heavily in a sleek, proprietary
      desk booking system, only to hit a wall months later. The core of the
      problem lies in the &quot;black box&quot; nature of most SaaS solutions.
      You can see the inputs and the outputs, but you have no visibility into
      the inner workings, and certainly no control over them.
    </BlogText>

    <BlogHeadingTertiary
      slug="innovation-trapped"
      title="When Innovation Gets Trapped Behind Paywalls"
    />
    <BlogText>
      We had a client, a large financial institution, who needed a simple
      integration. They wanted their desk booking system to automatically sync
      with their HRIS to provision new employee accounts. It was a standard
      request that would save their HR team hours each week. Their vendor&apos;s
      response? A $50,000 professional services fee and a six-month waiting
      period. For a simple API connection.
    </BlogText>

    <BlogText>
      This was our &quot;aha!&quot; moment. It became painfully clear that the
      proprietary model was not designed for the customer&apos;s success; it was
      designed for the vendor&apos;s. Innovation was held hostage. Basic
      customization required exorbitant fees. Companies were forced to adapt
      their workflows to the software&apos;s limitations, not the other way
      around. This experience solidified our belief that the workplace tech
      industry needed a fundamental shift, a move towards an open source
      philosophy that puts power back into the hands of the user.
    </BlogText>

    <BlogHeadingTertiary
      slug="hidden-costs"
      title="The Hidden Costs of Inflexibility"
    />
    <BlogText>
      The costs of this inflexibility are more than just financial. They
      manifest as frustrated employees who cannot book a desk easily, IT teams
      bogged down with security reviews for opaque software, and workplace
      managers stuck using clunky spreadsheets as workarounds because the
      &quot;official&quot; tool cannot meet a specific need. You might think you
      have{" "}
      <Link colorPalette={"orange"} asChild>
        <NextLink href="/blog/signs-outgrown-office-spreadsheet">
          outgrown your office spreadsheet
        </NextLink>
      </Link>
      , but if your new tool is just as rigid, you have only traded one problem
      for another. The true cost is lost productivity, diminished employee
      experience, and a workplace strategy that cannot adapt to change.
    </BlogText>

    {/* Our Core Belief: The Open-Source Philosophy in Practice */}
    <BlogHeadingSecondary
      slug="core-belief"
      title="Our Core Belief: The Open-Source Philosophy in Practice"
    />
    <BlogText>
      Our decision to build an open source desk booking platform is rooted in
      three core principles. These are not just marketing points; they are the
      tenets that guide every decision we make at Workplacify.
    </BlogText>

    <BlogHeadingTertiary
      slug="transparency-trust"
      title="Principle 1: Transparency Builds Trust"
    />
    <BlogText>
      Trust is paramount, especially when it comes to software that manages your
      employees and your physical space. With proprietary software, you are
      asked to blindly trust the vendor&apos;s security claims. With
      open-source, you do not have to. Our source code is available for anyone
      to view, audit, and scrutinize on the{" "}
      <Link colorPalette={"orange"} asChild>
        <NextLink
          href="https://github.com/workplacify/workplacify"
          target="_blank"
          rel="noopener noreferrer"
        >
          Workplacify GitHub
        </NextLink>
      </Link>
      .
    </BlogText>

    <CtaActionContainer
      ctaContent={
        <CtaActionContainerContent
          title="Ready to Take Control?"
          description="Experience the power of open-source desk booking. Start with our Community Edition and see how customizable workplace management can transform your office."
        />
      }
      ctaAction={
        <Button width={"100%"} colorScheme="blue" size="lg" asChild>
          <NextLink href="/app/schedule">Get Started Now</NextLink>
        </Button>
      }
    />

    <BlogText>
      For your Head of IT, this is a critical distinction. Your security team
      can independently vet our code to ensure it meets your organization&apos;s
      stringent standards. A{" "}
      <Link colorPalette={"orange"} asChild>
        <NextLink
          href="https://www.linuxfoundation.org/research/state-of-open-standards-2023"
          target="_blank"
          rel="noopener noreferrer"
        >
          2023 Linux Foundation report
        </NextLink>
      </Link>{" "}
      found that organizations using open source software have 30% fewer
      security incidents. There are no hidden backdoors, no questionable data
      handling practices. This level of transparency accelerates security
      reviews and provides a degree of confidence that a closed-source solution
      simply cannot match. It is about verification, not just promises.
    </BlogText>

    <BlogHeadingTertiary
      slug="collaboration-drives"
      title="Principle 2: Collaboration Drives Better Solutions"
    />
    <BlogText>
      No single company, no matter how large, has all the answers. The
      collective intelligence of a community will always outperform a closed-off
      development team. By making Workplacify open-source, we invite developers,
      IT professionals, and workplace managers from around the world to
      contribute.
    </BlogText>

    <BlogText>
      This collaboration leads to a more robust, secure, and feature-rich
      product. According to{" "}
      <Link colorPalette={"orange"} asChild>
        <NextLink
          href="https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/developer-velocity-how-software-excellence-fuels-business-performance"
          target="_blank"
          rel="noopener noreferrer"
        >
          McKinsey&apos;s research
        </NextLink>
      </Link>
      , organizations that embrace open source development see up to 2.6x higher
      business performance. Someone in a different industry might solve a
      problem you are facing, contribute the fix, and benefit the entire
      community. This ecosystem fosters rapid innovation and ensures the
      platform evolves to meet real-world needs, not just what a product manager
      thinks is important.
    </BlogText>

    <BlogHeadingTertiary
      slug="freedom-adapt"
      title="Principle 3: Freedom to Adapt and Integrate"
    />
    <BlogText>
      Your organization is unique. Your tech stack, your workflows, and your{" "}
      <Link colorPalette={"orange"} asChild>
        <NextLink href="/free-tools/hybrid-workplace-policy-generator">
          hybrid workplace policy
        </NextLink>
      </Link>{" "}
      are specific to you. An open source desk booking system gives you the
      freedom to adapt the software to your exact needs.
    </BlogText>

    <BlogText>
      Need to integrate with a custom internal tool? You can. Want to build a
      unique dashboard with specific analytics? You have the access and the
      freedom to do so. You are never locked into our roadmap or at the mercy of
      our development priorities. This is a stark contrast to the proprietary
      model, where you have to submit a feature request and hope it gets built
      one day. With Workplacify, you have the keys. You can build what you need,
      when you need it.
    </BlogText>

    {/* Building the Business Case for Open-Source Workplace Tech */}
    <BlogHeadingSecondary
      slug="business-case"
      title="Building the Business Case for Open-Source Workplace Tech"
    />
    <BlogText>
      Choosing an open-source solution is not just a philosophical or technical
      decision; it is a strategic business move with a clear return on
      investment (ROI). Let us move beyond the code and talk about the numbers.
    </BlogText>

    <ComparisonTile
      firstTile={
        <ComparisonTileBox
          colorPalette="gray"
          heading={<>Proprietary Solutions</>}
          listItems={
            <>
              <ComparisonTileListItem
                title={<>Limited Control</>}
                description={
                  <>Vendor-controlled roadmap and development priorities</>
                }
              />
              <ComparisonTileListItem
                title={<>High Integration Costs</>}
                description={
                  <>Expensive professional services fees for customizations</>
                }
              />
              <ComparisonTileListItem
                title={<>Security Black Box</>}
                description={
                  <>No visibility into code, relying on vendor promises</>
                }
              />
            </>
          }
        />
      }
      secondTile={
        <ComparisonTileBox
          colorPalette="orange"
          heading={<>Open Source Advantages</>}
          listItems={
            <>
              <ComparisonTileListItem
                checked
                title={<>Full Control</>}
                description={
                  <>Freedom to modify and adapt to your specific needs</>
                }
              />
              <ComparisonTileListItem
                checked
                title={<>Cost-Effective Integration</>}
                description={<>Build custom integrations without vendor fees</>}
              />
              <ComparisonTileListItem
                checked
                title={<>Transparent Security</>}
                description={
                  <>Code is open for security audits and verification</>
                }
              />
            </>
          }
        />
      }
    />

    <BlogHeadingTertiary
      slug="retention-factor"
      title="The Retention Factor: Improving Employee Experience"
    />
    <BlogText>
      In today&apos;s competitive job market, employee experience is a key
      differentiator. A flexible, empowering work environment is a major factor
      in attracting and retaining top talent. An open source desk booking system
      contributes directly to this. It gives employees the autonomy to choose
      where and when they work, fostering a sense of trust and control.
      Furthermore, because the system is adaptable, you can integrate it into
      the tools your employees already use, like Slack or Microsoft Teams,
      creating a seamless experience rather than introducing yet another
      frustrating login.
    </BlogText>

    <BlogImage
      image={"/open-source-desk-booking-philosophy-infographic-1.png"}
      alt={"An infographic breaking down the ROI of Workplacify."}
      maxWidth={{ base: "100%", md: "80%" }}
    />

    {/* How It Works: The Workplacify Open-Core Model */}
    <BlogHeadingSecondary
      slug="how-it-works"
      title="How It Works: The Workplacify Open-Core Model"
    />
    <BlogText>
      The most common question we get from companies is, &quot;If it is
      open-source, how do you provide support and make money?&quot; This is
      where the open-core model comes in, and it directly addresses the
      misconception that open-source means you are on your own.
    </BlogText>

    <BlogHeadingTertiary
      slug="community-edition"
      title="Our Community Edition on GitHub"
    />
    <BlogText>
      The core of our platform, the powerful desk booking engine, user
      management, and basic analytics, is completely free and open-source. You
      can find it on the{" "}
      <Link colorPalette={"orange"} asChild>
        <NextLink
          href="https://github.com/workplacify/workplacify"
          target="_blank"
          rel="noopener noreferrer"
        >
          Workplacify GitHub
        </NextLink>
      </Link>{" "}
      repository today. You can download it, install it on your own servers
      (self-host), modify it, and use it forever without paying a cent. This is
      perfect for smaller businesses, tech-savvy companies, or anyone who wants
      complete control over their data and infrastructure.
    </BlogText>

    <BlogHeadingTertiary
      slug="enterprise-features"
      title="Enterprise-Grade Features and Support"
    />
    <BlogText>
      We build our business by offering an Enterprise Edition on top of the
      open-source core. This paid version includes features that large
      organizations require for security, compliance, and scale. This includes:
    </BlogText>

    <List.Root paddingLeft={5}>
      <List.Item>
        <BlogText>
          <b>Seamless Single Sign-On (SSO) Integration:</b> Our open
          architecture is designed for straightforward integration with your
          existing identity providers like Okta or Azure AD, allowing you to
          connect Workplacify into your security framework.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Advanced Analytics</b> and reporting dashboards.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Priority Support</b> with guaranteed SLAs.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Managed Hosting</b> options so you do not have to worry about
          infrastructure.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Auditable Codebase</b> for your internal compliance and security
          reviews.
        </BlogText>
      </List.Item>
    </List.Root>

    <BlogText>
      This &quot;open-core&quot; model provides the best of both worlds.
      According to{" "}
      <Link colorPalette={"orange"} asChild>
        <NextLink
          href="https://www.forrester.com/blogs/open-source-under-attack-your-source-is-ajar/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Forrester&apos;s 2023 analysis
        </NextLink>
      </Link>
      , 90% of organizations now consider open source strategic to their
      business. You get the transparency, security, and flexibility of open
      source, combined with the reliability, support, and advanced features you
      expect from an enterprise-grade solution. You are not locked in, and you
      can choose the level of service that is right for you.
    </BlogText>

    {/* Quick Takeaways */}
    <BlogHeadingSecondary slug="quick-takeaways" title="Quick Takeaways" />
    <List.Root paddingLeft={5}>
      <List.Item>
        <BlogText>
          <b>The Problem:</b> Traditional workplace software is often a
          &quot;black box,&quot; leading to vendor lock-in, high costs for
          simple customizations, and security risks.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Our Philosophy:</b> We believe in transparency, collaboration, and
          freedom. Our open-source model reflects these core values.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Transparency Builds Trust:</b> Anyone can audit our code on the
          Workplacify GitHub, ensuring it meets the highest security standards.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Freedom and Flexibility:</b> Adapt Workplacify to your unique
          workflows and integrate it with your existing tech stack without
          permission or penalty fees.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Clear ROI:</b> Open-source desk booking delivers savings through
          real estate optimization, increased productivity, and improved
          employee retention.
        </BlogText>
      </List.Item>
      <List.Item>
        <BlogText>
          <b>Open-Core Model:</b> We offer a free, self-hosted Community Edition
          and a paid Enterprise Edition with advanced features and dedicated
          support.
        </BlogText>
      </List.Item>
    </List.Root>

    {/* Conclusion */}
    <BlogHeadingSecondary slug="conclusion" title="Conclusion" />
    <BlogText>
      Choosing to build Workplacify on an open source philosophy was a
      deliberate, mission-driven decision. We saw a gap in the market, not for
      another desk booking tool, but for a new way of thinking about workplace
      technology. The future of work is flexible, hybrid, and constantly
      evolving. The software that supports it cannot be rigid and proprietary.
      It must be as adaptable and transparent as the cultures it aims to
      support.
    </BlogText>

    <BlogText>
      For workplace managers, HR leaders, and IT teams, this means a shift from
      being a &quot;customer&quot; to being a &quot;partner.&quot; It means
      having control over your own data and destiny. It means having a platform
      that can grow and change with you, not one that holds you back. Our
      commitment to the open source desk booking model is a commitment to our
      users. It is a promise of transparency in a world of black boxes, a
      guarantee of flexibility in the face of constant change, and an invitation
      to build the future of the workplace, together. We invite you to explore
      our code, question our methods, and join the community.
    </BlogText>

    <CtaActionContainer
      ctaContent={
        <CtaActionContainerContent
          title="Join the Open Source Revolution"
          description="Ready to experience true workplace flexibility? Start with our Community Edition today and see how open source can transform your workplace management."
        />
      }
      ctaAction={
        <Button width={"100%"} colorScheme="blue" size="lg" asChild>
          <NextLink href="/app/schedule">Try Workplacify Free</NextLink>
        </Button>
      }
    />

    {/* FAQs */}
    <BlogHeadingSecondary slug="faqs" title="FAQs" />
    <Box fontSize={"md"}>
      <Faq
        withoutHeading
        questionsAndAnswers={[
          {
            questionId: "1",
            question: (
              <>
                Is an open-source desk booking system secure for enterprise use?
              </>
            ),
            answer: (
              <>
                Absolutely. In many ways, it is more secure. Because the source
                code is public, it is constantly scrutinized by a global
                community of developers. This &quot;many eyes&quot; approach
                often identifies and fixes vulnerabilities faster than a
                closed-source vendor&apos;s internal team. Additionally, your
                own security team can audit the code directly to ensure it
                complies with your internal policies.
              </>
            ),
          },
          {
            questionId: "2",
            question: <>Do I need a team of developers to use Workplacify?</>,
            answer: (
              <>
                No. For our Enterprise Edition, we offer managed hosting and
                full support, so it works just like any other SaaS product, no
                technical expertise required. For the free Community Edition,
                you will need some IT knowledge to self-host the application on
                your own server, but the process is well-documented.
              </>
            ),
          },
          {
            questionId: "3",
            question: (
              <>
                What does &quot;free&quot; in the Community Edition really mean?
              </>
            ),
            answer: (
              <>
                It means the software license is free. You can download, use,
                and modify the core Workplacify platform for as many users and
                desks as you want, forever. Your only costs would be for the
                server infrastructure you choose to run it on (e.g., AWS, Azure,
                or your own on-premise server).
              </>
            ),
          },
          {
            questionId: "4",
            question: (
              <>
                How is Workplacify different from other free desk booking tools?
              </>
            ),
            answer: (
              <>
                Many &quot;free&quot; tools are actually freemium models with
                very low limits on users or features, designed to force you into
                a paid plan quickly. Our open-source Community Edition is
                fully-featured for its core purpose. The primary difference is
                our model: we provide a complete, powerful tool for free to the
                community, while offering specialized, enterprise-grade features
                and services as our paid product.
              </>
            ),
          },
          {
            questionId: "5",
            question: (
              <>
                What kind of support is available for the open-source version?
              </>
            ),
            answer: (
              <>
                The Community Edition is supported by the community through
                forums and our GitHub repository. Our core team monitors these
                channels and contributes, but for guaranteed response times and
                dedicated support, we offer SLAs as part of our paid Enterprise
                Edition.
              </>
            ),
          },
        ]}
      />
    </Box>
  </Stack>
);

const OpenSourceDeskBookingPhilosophyPage = () => {
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
                In the world of workplace management software, the path of least
                resistance is often the proprietary one. Build a closed system,
                charge a subscription, and control every aspect of the user
                experience. When we founded Workplacify, we had a choice to
                make. We could have followed that well-worn path. Instead, we
                chose a different direction entirely. We chose to be
                open-source. This decision was not just a technical preference;
                it is the very core of our mission and vision for the future of
                the workplace.
              </BlogIntroductionText>
              <BlogIntroductionText>
                This article is not just about code. It is a thought leadership
                piece from us, the founders, explaining the mission behind
                making Workplacify an open source desk booking platform. We will
                share the pivotal moment that shaped our thinking, break down
                what our philosophy means for your organization, from the
                facilities manager to the Head of IT, and provide a clear
                framework for building a business case around security,
                flexibility, and long-term value.
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

export default OpenSourceDeskBookingPhilosophyPage;
