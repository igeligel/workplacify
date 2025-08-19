import { Container, Text, VStack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";

import { blogArticles, featuredBlogArticle } from "../../blogs/blogArticles";
import { BlogArticles } from "../../chakra-starter/marketing-ui/BlogArticles";
import { BlogArticlesFeatured } from "../../chakra-starter/marketing-ui/BlogArticles/BlogArticlesFeatured";
import { BlogArticlesFooter } from "../../chakra-starter/marketing-ui/BlogArticles/BlogArticlesFooter";
import { BlogArticlesList } from "../../chakra-starter/marketing-ui/BlogArticles/BlogArticlesList";
import { BlogArticlesListItem } from "../../chakra-starter/marketing-ui/BlogArticles/BlogArticlesListItem";
import { getMessages } from "../../messages/getMessages";

const BlogArticlesPage = () => {
  return (
    <>
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
              heading={"Hallo"}
              description={
                <VStack>
                  <Text>awdwadadw</Text>
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
