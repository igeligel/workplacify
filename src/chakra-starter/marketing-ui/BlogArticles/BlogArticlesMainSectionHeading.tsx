import { Heading } from "@chakra-ui/react";

type BlogArticlesMainSectionHeadingProps = {
  children: React.ReactNode;
};

export const BlogArticlesMainSectionHeading = (
  props: BlogArticlesMainSectionHeadingProps,
) => {
  const { children } = props;
  return (
    <Heading as="h2" marginTop="5" fontSize={"2xl"}>
      {children}
    </Heading>
  );
};
