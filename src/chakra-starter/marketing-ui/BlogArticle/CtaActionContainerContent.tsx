import { Box, Text } from "@chakra-ui/react";

import { useBlogArticleTheme } from "./useBlogArticleTheme";

type CtaActionContainerContentProps = {
  title: React.ReactNode;
  description: React.ReactNode;
};

export const CtaActionContainerContent = (
  props: CtaActionContainerContentProps,
) => {
  const { title, description } = props;
  const { theme } = useBlogArticleTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      flex={3}
      justifyContent={"center"}
      alignItems={"center"}
      textAlign={"center"}
    >
      <Text fontSize={"2xl"} fontWeight={"semibold"}>
        {title}
      </Text>
      <Text
        fontSize={"md"}
        color={theme === "dark" ? "gray.200" : "gray.600"}
        maxWidth={"380px"}
      >
        {description}
      </Text>
    </Box>
  );
};
