import { Heading } from "@chakra-ui/react";

import { AnchorLink } from "./AnchorLink";
import { useBlogArticleTheme } from "./useBlogArticleTheme";

type BlogHeadingTertiaryProps = {
  slug: string;
  title: string;
};

export const BlogHeadingTertiary = (props: BlogHeadingTertiaryProps) => {
  const { theme } = useBlogArticleTheme();
  const { slug, title } = props;

  return (
    <Heading
      as="h3"
      fontSize={"2xl"}
      position={"relative"}
      data-sidebarheading={true}
      data-sidebartitle={title}
      data-sidebarslug={slug}
      color={theme === "dark" ? "gray.200" : "gray.800"}
      fontWeight={"semibold"}
    >
      <AnchorLink id={slug} />
      {title}
    </Heading>
  );
};
