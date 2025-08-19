import { Container, Heading, Separator, Text } from "@chakra-ui/react";
import React from "react";

import { BlogArticlesFeatured } from "./BlogArticlesFeatured";
import { BlogArticlesFooter } from "./BlogArticlesFooter";
import { BlogArticlesList } from "./BlogArticlesList";
import { BlogArticlesListItem } from "./BlogArticlesListItem";
import { blogArticles as defaultBlogArticles } from "./data";

const featuredBlogArticleData = defaultBlogArticles.find(
  (e) => e.uuid === "f4291e8a-650e-4abd-8047-1b4d373c7ffb",
)!;

type BlogArticlesProps = {
  heading?: React.ReactNode;
  featuredBlogArticle?: React.ReactNode;
  blogArticlesList?: React.ReactNode;
  blogArticlesFooter?: React.ReactNode;
};

export const BlogArticles = (props: BlogArticlesProps) => {
  const { heading, featuredBlogArticle, blogArticlesList, blogArticlesFooter } =
    props;

  return (
    <Container maxW={"6xl"} padding={{ base: "0", md: "2" }}>
      <Heading as="h1">{heading || "Stories by Chakra Templates"}</Heading>
      {featuredBlogArticle || (
        <BlogArticlesFeatured featuredBlogArticle={featuredBlogArticleData} />
      )}

      <Heading as="h2" marginTop="5" fontSize={"2xl"}>
        Latest articles
      </Heading>
      <Separator marginTop="5" />
      {blogArticlesList || (
        <BlogArticlesList>
          {defaultBlogArticles
            .sort(
              (a, b) => b.datePublished.getTime() - a.datePublished.getTime(),
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
      )}
      {blogArticlesFooter || (
        <BlogArticlesFooter
          heading={"What we write about"}
          description={
            <>
              <Text as="p" fontSize="lg">
                Dive into the world of modern UI development with our blog at
                Chakra Templates. We offer comprehensive coverage on building
                scalable design systems, crafting accessible components, and
                optimizing development workflows. From implementing design
                tokens to creating responsive layouts, we provide invaluable
                insights to streamline your development process. Our blog goes
                beyond theory, offering real-world examples and case studies
                from companies that have successfully implemented our component
                library. Whether you&apos;re a seasoned developer or new to UI
                development, our blog equips you with the tools and knowledge to
                build better user interfaces.
              </Text>
              <Text as="p" fontSize="lg">
                Explore our collection of premium UI components and discover
                innovative ways to enhance your application&apos;s user
                experience. With a focus on performance and developer
                experience, our blog empowers teams to build robust applications
                based on proven patterns and best practices. Whether you&apos;re
                building enterprise applications, SaaS products, or marketing
                websites, our blog provides actionable insights to help you
                create exceptional user interfaces. Join us at Chakra Templates
                and revolutionize your approach to UI development today.
              </Text>
            </>
          }
        />
      )}
    </Container>
  );
};

export default BlogArticles;
