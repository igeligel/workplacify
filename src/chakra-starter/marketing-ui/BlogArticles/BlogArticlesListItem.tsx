import { Box, Heading, Image, Link, Text, WrapItem } from "@chakra-ui/react";
import NextLink from "next/link";

import { BlogAuthor } from "./BlogAuthor";
import { BlogTags } from "./BlogTags";
import { BlogArticle } from "./types";

type BlogArticlesListItemProps = {
  blogArticle: BlogArticle;
};

export const BlogArticlesListItem = (props: BlogArticlesListItemProps) => {
  const { blogArticle } = props;

  return (
    <WrapItem
      key={blogArticle.uuid}
      width={{ base: "100%", sm: "45%", md: "45%", lg: "30%" }}
    >
      <Box w="100%">
        <Box overflow="hidden" borderRadius="md">
          <Link
            as={NextLink}
            href={blogArticle.url}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            <Image
              transform="scale(1.0)"
              src={blogArticle.image}
              alt={blogArticle.imageAlt}
              objectFit="contain"
              width="100%"
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
              }}
            />
          </Link>
        </Box>
        <BlogTags tags={blogArticle.tags} marginTop="3" />
        <Heading fontSize="xl" marginTop="2">
          <Link
            as={NextLink}
            href={blogArticle.url}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            {blogArticle.title}
          </Link>
        </Heading>
        <Text as="p" fontSize="md" marginTop="2">
          {blogArticle.description}
        </Text>
        <BlogAuthor
          name={blogArticle.author.name}
          date={blogArticle.datePublished}
          image={blogArticle.author.image}
        />
      </Box>
    </WrapItem>
  );
};
