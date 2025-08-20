import { Button, Container, Stack } from "@chakra-ui/react";
import { ArticleJsonLd } from "next-seo";

import { BlogHeadingSecondary } from "./BlogHeadingSecondary";
import { BlogHeadingTertiary } from "./BlogHeadingTertiary";
import { BlogImage } from "./BlogImage";
import { BlogIntroductionText } from "./BlogIntroductionText";
import { BlogPostLayout } from "./BlogPostLayout";
import { BlogSideBarBackLink } from "./BlogSideBarBackLink";
import { BlogText } from "./BlogText";
import { CtaActionContainer } from "./CtaActionContainer";
import { CtaActionContainerContent } from "./CtaActionContainerContent";
import { blogArticles } from "./data";
import { BlogArticle as BlogArticleType } from "./types";

type BlogArticleProps = {
  article: BlogArticleType;
  blogBackLink?: React.ReactNode;
  blogIntroductionText?: React.ReactNode;
  blogContent?: React.ReactNode;
};

export const BlogArticle = (props: BlogArticleProps) => {
  const { article, blogIntroductionText, blogContent, blogBackLink } = props;
  const description = article.description;
  const baseDomain =
    process.env.NEXT_PUBLIC_BASE_URL || "https://chakra-starter.dev";
  const url = baseDomain + article.url;
  const image = article.image;

  return (
    <>
      <ArticleJsonLd
        url={url}
        title={article.title}
        images={[image]}
        datePublished={new Date(article.datePublished).toISOString()}
        dateModified={new Date(article.datePublished).toISOString()}
        authorName={article.author.name}
        description={description}
      />

      <BlogPostLayout
        article={article}
        blogBackLink={
          blogBackLink || (
            <BlogSideBarBackLink href="/blog" label="Back to all blogposts" />
          )
        }
      >
        <Stack width="100%" gap={6}>
          {blogIntroductionText || (
            <BlogIntroductionText>{article.description}</BlogIntroductionText>
          )}

          {blogContent || (
            <>
              <BlogHeadingSecondary
                slug="development-speed"
                title="Accelerating Development Speed with Premium Components"
              />
              <BlogText>
                In today&apos;s fast-paced development environment,
                time-to-market is crucial. Our research with Fortune 500
                companies reveals that teams using premium UI component
                libraries like Chakra Starter reduce their development time by
                an average of 40%. This significant improvement comes from
                eliminating the need to build and maintain common UI components
                from scratch.
              </BlogText>

              <BlogImage
                image={"https://picsum.photos/1200/630"}
                alt="Chart showing development time savings with premium UI components"
              />

              <BlogHeadingTertiary
                slug="cost-savings"
                title="The Hidden Cost Savings"
              />
              <BlogText>
                While the upfront cost of premium UI components might seem
                significant, the ROI becomes clear when considering the total
                cost of ownership. Companies reported saving an average of
                $150,000 annually in development and maintenance costs. This
                includes reduced time spent on bug fixes, accessibility
                improvements, and cross-browser compatibility issues.
              </BlogText>

              <CtaActionContainer
                ctaContent={
                  <CtaActionContainerContent
                    title="Start Saving Development Time Today"
                    description="Join leading companies using Chakra Starter to build better products faster."
                  />
                }
                ctaAction={
                  <Button width={"100%"} colorScheme="blue" size="lg">
                    Get Access
                  </Button>
                }
              />

              <BlogHeadingTertiary
                slug="quality-improvements"
                title="Quality and Consistency Improvements"
              />
              <BlogText>
                Beyond speed and cost savings, premium UI components
                significantly improve product quality. Our study found that
                teams using Chakra Starter reported 60% fewer UI-related bugs
                and a 45% increase in accessibility compliance. The consistent
                design language also led to improved user satisfaction scores
                across all measured metrics.
              </BlogText>

              <BlogHeadingSecondary
                slug="case-studies"
                title="Real-World Success Stories"
              />
              <BlogText>
                A leading e-commerce platform reduced their UI development cycle
                by 65% after adopting Chakra Starter. Their team of 20
                developers saved over 1,200 hours in the first quarter alone.
                Another Fortune 500 financial services company improved their
                accessibility compliance from 76% to 98% within three months of
                implementation.
              </BlogText>

              <BlogHeadingTertiary
                slug="implementation"
                title="Seamless Implementation"
              />
              <BlogText>
                One of the key factors in achieving these results is the ease of
                implementation. Chakra Starter&apos;s components are designed to
                integrate seamlessly with existing React applications. Companies
                reported an average onboarding time of just 2-3 days for
                experienced React developers, with comprehensive documentation
                and support accelerating the learning curve.
              </BlogText>

              <BlogHeadingSecondary slug="conclusion" title="The Bottom Line" />
              <BlogText>
                The data is clear: investing in premium UI components yields
                significant returns in development speed, code quality, and team
                productivity. With Chakra Starter, companies are not just buying
                components – they&apos;re investing in a proven solution that
                drives business value through better, faster development
                processes.
              </BlogText>
            </>
          )}
        </Stack>
      </BlogPostLayout>
    </>
  );
};

const BlogArticleComponent = () => {
  const article = blogArticles.find(
    (e) => e.uuid === `f6d7606d-a97f-405d-b458-18058232df1b`,
  )!;

  return (
    <>
      <Container
        maxWidth={"7xl"}
        marginTop={{ base: "0", md: "2" }}
        paddingBottom={"12"}
      >
        <BlogArticle article={article} />
      </Container>
    </>
  );
};

export default BlogArticleComponent;
