import { Wrap } from "@chakra-ui/react";

type BlogArticlesListProps = {
  children: React.ReactNode;
};

export const BlogArticlesList = (props: BlogArticlesListProps) => {
  const { children } = props;

  return (
    <Wrap gap="30px" marginTop="5">
      {children}
    </Wrap>
  );
};
