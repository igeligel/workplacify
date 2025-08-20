import { Heading } from "@chakra-ui/react";

import { AnchorLink } from "./AnchorLink";

type BlogHeadingSecondaryProps = {
  slug: string;
  title: string;
};

export const BlogHeadingSecondary = (props: BlogHeadingSecondaryProps) => {
  const { slug, title } = props;

  return (
    <Heading
      as="h2"
      fontSize={"3xl"}
      position={"relative"}
      data-sidebarheading={true}
      data-sidebartitle={title}
      data-sidebarslug={slug}
      fontWeight={"semibold"}
    >
      <AnchorLink id={slug} />
      {title}
    </Heading>
  );
};
