import { Text } from "@chakra-ui/react";

import { useBlogArticleTheme } from "./useBlogArticleTheme";

type BlogTextProps = {
  children: React.ReactNode;
};

export const BlogText = (props: BlogTextProps) => {
  const { theme } = useBlogArticleTheme();
  return (
    <Text
      fontSize={{ base: "sm", md: "lg" }}
      color={theme === "dark" ? "gray.400" : "gray.800"}
    >
      {props.children}
    </Text>
  );
};
