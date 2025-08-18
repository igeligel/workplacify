import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

import { useWorkplacifyTheme } from "../hooks/useWorkplacifyTheme";

type CtaActionContainerProps = {
  children: ReactNode;
};

export const CtaActionContainer = (props: CtaActionContainerProps) => {
  const { theme } = useWorkplacifyTheme();

  const baseGray = theme === "dark" ? "colors.gray.700" : "colors.gray.100";
  const accentGray = theme === "dark" ? "colors.gray.800" : "colors.white";
  const backgroundColor = theme === "dark" ? "gray.900" : "gray.50";

  return (
    <Box
      css={{
        "--base-gray": baseGray,
        "--accent-gray": accentGray,
      }}
    >
      <Box
        width="100%"
        position="relative"
        backgroundColor={backgroundColor}
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
        <Box padding="2.6rem 2rem">{props.children}</Box>
      </Box>
    </Box>
  );
};
