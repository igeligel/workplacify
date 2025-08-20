import { Box, Heading, Image, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

import { BlogAuthor } from "./BlogAuthor";
import { BlogTags } from "./BlogTags";
import { BlogArticle } from "./types";
import { useBlogArticlesTheme } from "./useBlogArticlesTheme";

type BlogArticlesFeaturedProps = {
  featuredBlogArticle: BlogArticle;
};

export const BlogArticlesFeatured = (props: BlogArticlesFeaturedProps) => {
  const { theme } = useBlogArticlesTheme();
  const { featuredBlogArticle } = props;

  return (
    <Box
      marginTop={{ base: "1", sm: "5" }}
      display="flex"
      flexDirection={{ base: "column", sm: "row" }}
      justifyContent="space-between"
    >
      <Box
        display="flex"
        flex="1"
        marginRight="3"
        position="relative"
        alignItems="center"
      >
        <Box
          width={{ base: "100%", sm: "85%" }}
          zIndex="2"
          marginLeft={{ base: "0", sm: "5%" }}
          marginTop="5%"
          borderRadius="md"
          overflow="hidden"
        >
          <Link
            as={NextLink}
            href={featuredBlogArticle.url}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            <Image
              borderRadius={"md"}
              src={featuredBlogArticle.image}
              alt={featuredBlogArticle.imageAlt}
              objectFit="contain"
            />
          </Link>
        </Box>
        <Box zIndex="1" width="100%" position="absolute" height="100%">
          <Box
            bgGradient={
              theme === "light"
                ? "radial(blue.600 1px, transparent 1px)"
                : "radial(blue.300 1px, transparent 1px)"
            }
            backgroundSize="20px 20px"
            opacity="0.4"
            height="100%"
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        justifyContent="center"
        marginTop={{ base: "3", sm: "0" }}
      >
        <BlogTags tags={featuredBlogArticle.tags} />
        <Heading marginTop="1">
          <Link
            as={NextLink}
            href={featuredBlogArticle.url}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            {featuredBlogArticle.title}
          </Link>
        </Heading>
        <Text
          as="p"
          marginTop="2"
          color={theme === "light" ? "gray.700" : "gray.200"}
          fontSize="lg"
        >
          {featuredBlogArticle.description}
        </Text>
        <BlogAuthor
          name={featuredBlogArticle.author.name}
          date={featuredBlogArticle.datePublished}
          image={featuredBlogArticle.author.image}
        />
      </Box>
    </Box>
  );
};
