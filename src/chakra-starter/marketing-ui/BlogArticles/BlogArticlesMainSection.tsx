import { Separator } from "@chakra-ui/react";

type BlogArticlesMainSectionProps = {
  heading?: React.ReactNode;
  blogArticlesList?: React.ReactNode;
};

export const BlogArticlesMainSection = (
  props: BlogArticlesMainSectionProps,
) => {
  const { heading, blogArticlesList } = props;
  return (
    <>
      {heading}
      <Separator marginTop="5" />
      {blogArticlesList}
    </>
  );
};
