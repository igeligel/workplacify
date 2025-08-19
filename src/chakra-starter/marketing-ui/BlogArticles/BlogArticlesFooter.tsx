import { Heading, VStack } from "@chakra-ui/react";

type BlogArticlesFooterProps = {
  heading?: React.ReactNode;
  description?: React.ReactNode;
};

export const BlogArticlesFooter = (props: BlogArticlesFooterProps) => {
  const { heading, description } = props;

  return (
    <VStack paddingTop="40px" gap="2" alignItems="flex-start">
      <Heading as="h2">{heading}</Heading>
      {description}
    </VStack>
  );
};
