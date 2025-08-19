import { Box } from "@chakra-ui/react";

import { useBlogArticleTheme } from "./useBlogArticleTheme";

type CtaActionContainerProps = {
  ctaContent: React.ReactNode;
  ctaAction: React.ReactNode;
};

export const CtaActionContainer = (props: CtaActionContainerProps) => {
  const { ctaContent, ctaAction } = props;
  const { theme } = useBlogArticleTheme();

  const isDark = theme === "dark";

  const baseGray = isDark ? "colors.gray.700" : "colors.gray.100";
  const accentGray = isDark ? "colors.gray.800" : "colors.white";

  return (
    <Box css={{ "--base-gray": baseGray, "--accent-gray": accentGray }}>
      <Box
        width="100%"
        position="relative"
        backgroundColor={isDark ? "gray.900" : "gray.50"}
        boxShadow="xl"
        backgroundImage={`
        repeating-radial-gradient(
          circle at 100% 275%,
          transparent 0,
          var(--accent-gray) 10px
        ), repeating-linear-gradient(
          var(--base-gray),
          var(--accent-gray)
        )`}
        borderRadius={"lg"}
      >
        <Box padding="2.6rem 2rem">
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            flexDirection={{ base: "column", md: "row" }}
          >
            <>{ctaContent}</>
            <Box
              display={"flex"}
              alignItems={"center"}
              width={"100%"}
              maxWidth="400px"
              marginTop={{ base: "4", lg: "0" }}
              flex={1}
              justifyContent={"center"}
            >
              {ctaAction}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
