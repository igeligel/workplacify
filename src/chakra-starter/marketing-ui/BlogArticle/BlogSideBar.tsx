import { Box, Icon, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";

import { BlogArticle } from "./types";
import { useBlogArticleTheme } from "./useBlogArticleTheme";

type BlogHeading = {
  title: string;
  slug: string;
  subHeadings: BlogHeading[];
};

export type BlogSideBarProps = {
  article: BlogArticle;
  blogBackLink: React.ReactNode;
};

export const BlogSideBar = (props: BlogSideBarProps) => {
  const { theme } = useBlogArticleTheme();
  const { article, blogBackLink } = props;

  const color = "gray";

  const [headings, setHeadings] = useState<BlogHeading[]>([]);

  useEffect(() => {
    const elements = document.querySelectorAll(`[data-sidebarheading="true"]`);
    const headings: BlogHeading[] = [];
    Array.from(elements).forEach((element) => {
      const tagName = element.tagName.toLowerCase();
      const title = element.getAttribute("data-sidebartitle") || "";
      const slug = `#${element.getAttribute("data-sidebarslug") || ""}`;
      if (tagName === "h2") {
        headings.push({ title, slug, subHeadings: [] });
      } else if (tagName === "h3") {
        const lastElement = headings.pop();
        if (!lastElement) {
          return;
        }
        lastElement.subHeadings.push({ title, slug, subHeadings: [] });
        headings.push(lastElement);
      }
    });

    setHeadings(headings);
  }, []);

  return (
    <Box
      width={"300px"}
      display={{ base: "none", md: "inline-flex" }}
      position={"sticky"}
      top={"60px"}
      alignSelf={"flex-start"}
      paddingRight={"12"}
      borderRight="1px"
      borderColor={theme === "dark" ? `${color}.100` : `${color}.900`}
    >
      <Box display={"flex"} width={"100%"} marginTop={"2"}>
        <Stack width={"100%"} alignItems={"flex-start"} gap={"4"}>
          <Stack gap={"1"} alignItems={"flex-start"} width={"100%"}>
            {blogBackLink}
            <Box
              width="100%"
              height="2px"
              bg={theme === "dark" ? `${color}.100` : `${color}.900`}
            />
            <Stack direction="row" gap={"2"} alignItems="center" paddingX={3}>
              <Icon
                as={FiClock}
                color={theme === "dark" ? `${color}.100` : `${color}.900`}
              />
              <Text color={theme === "dark" ? `${color}.100` : `${color}.900`}>
                {article.readingTime} minutes read
              </Text>
            </Stack>
          </Stack>
          <Stack gap={"2"} alignItems={"flex-start"} width="100%">
            <Text
              fontSize={"xl"}
              fontWeight={"semibold"}
              color={theme === "dark" ? `${color}.100` : `${color}.900`}
            >
              Contents:
            </Text>
            {headings.length > 0 && (
              <Stack gap={2} width="100%">
                {headings.map((heading, index) => {
                  return (
                    <Box key={heading.slug}>
                      <Link href={heading.slug}>
                        <Text
                          color={
                            theme === "dark" ? `${color}.200` : `${color}.900`
                          }
                          fontSize={"md"}
                          fontWeight={"semibold"}
                          _hover={{
                            color:
                              theme === "dark"
                                ? `${color}.100`
                                : `${color}.900`,
                          }}
                          transition="color 0.2s"
                        >
                          {index + 1}. {heading.title}
                        </Text>
                      </Link>
                      {heading.subHeadings.length > 0 && (
                        <Stack pl={6} mt={2} gap={2}>
                          {heading.subHeadings.map((subHeading, subIndex) => {
                            return (
                              <Link
                                key={subHeading.slug}
                                href={subHeading.slug}
                              >
                                <Text
                                  color={
                                    theme === "dark"
                                      ? `${color}.300`
                                      : `${color}.900`
                                  }
                                  fontSize={"sm"}
                                  fontWeight={"semibold"}
                                  _hover={{
                                    color:
                                      theme === "dark"
                                        ? `${color}.100`
                                        : `${color}.900`,
                                  }}
                                  transition="color 0.2s"
                                >
                                  {index + 1}.{subIndex + 1}. {subHeading.title}
                                </Text>
                              </Link>
                            );
                          })}
                        </Stack>
                      )}
                    </Box>
                  );
                })}
              </Stack>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
