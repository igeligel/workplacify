import { Container, Text, VStack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import { blogArticles, featuredBlogArticle } from "../../blogs/blogArticles";
import { BlogArticles } from "../../chakra-starter/marketing-ui/BlogArticles";
import { BlogArticlesFeatured } from "../../chakra-starter/marketing-ui/BlogArticles/BlogArticlesFeatured";
import { BlogArticlesFooter } from "../../chakra-starter/marketing-ui/BlogArticles/BlogArticlesFooter";
import { BlogArticlesList } from "../../chakra-starter/marketing-ui/BlogArticles/BlogArticlesList";
import { BlogArticlesListItem } from "../../chakra-starter/marketing-ui/BlogArticles/BlogArticlesListItem";
import { getMessages } from "../../messages/getMessages";

const BlogArticlesPage = () => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/blog`;

  return (
    <>
      <NextSeo
        title="Insights for the Modern Workplace"
        description="The modern workplace is more than just a physical space; it's an ecosystem of people, technology, and culture. Here, we decode the trends and share actionable insights that empower you to build more efficient, engaging, and data-driven work environments."
        canonical={url}
        openGraph={{
          url,
          type: "website",
          title: "Insights for the Modern Workplace",
          description:
            "The modern workplace is more than just a physical space; it's an ecosystem of people, technology, and culture. Here, we decode the trends and share actionable insights that empower you to build more efficient, engaging, and data-driven work environments.",
          images: [
            {
              url: `${url}/og-images/blog-articles.png`,
              width: 1200,
              height: 630,
            },
          ],
          siteName: "workplacify",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <Container maxW={"6xl"} paddingTop={{ base: 2, lg: 8 }}>
        <BlogArticles
          heading={"Stories by Workplacify"}
          featuredBlogArticle={
            <BlogArticlesFeatured featuredBlogArticle={featuredBlogArticle} />
          }
          blogArticlesList={
            <BlogArticlesList>
              {blogArticles
                .sort(
                  (a, b) =>
                    b.datePublished.getTime() - a.datePublished.getTime(),
                )
                .map((blogArticle) => {
                  return (
                    <BlogArticlesListItem
                      key={blogArticle.uuid}
                      blogArticle={blogArticle}
                    />
                  );
                })}
            </BlogArticlesList>
          }
          blogArticlesFooter={
            <BlogArticlesFooter
              heading={"Insights for the Modern Workplace"}
              description={
                <VStack>
                  <Text>
                    The modern workplace is more than just a physical space;
                    it&apos;s an ecosystem of people, technology, and culture.
                    Here, we decode the trends and share actionable insights
                    that empower you to build more efficient, engaging, and
                    data-driven work environments.
                  </Text>
                </VStack>
              }
            />
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

export default BlogArticlesPage;
