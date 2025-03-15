import { Box, theme, useColorMode } from "@chakra-ui/react";
import { ReactNode } from "react";

type CtaActionContainerProps = {
  children: ReactNode;
};

export const CtaActionContainer = (props: CtaActionContainerProps) => {
  const { colorMode } = useColorMode();

  const baseGray =
    colorMode === "dark" ? theme.colors.gray["700"] : theme.colors.gray["100"];
  const accentGray =
    colorMode === "dark" ? theme.colors.gray["800"] : theme.colors.white;

  return (
    <Box
      width="100%"
      position="relative"
      backgroundColor={colorMode === "dark" ? "gray.900" : "gray.50"}
      boxShadow="xl"
      backgroundImage={`
        repeating-radial-gradient(
          circle at 100% 275%,
          transparent 0,
          ${accentGray} 10px
        ), repeating-linear-gradient(
          ${baseGray},
          ${accentGray}
        )`}
      borderRadius={"lg"}
    >
      <Box padding="2.6rem 2rem">{props.children}</Box>
    </Box>
  );
};
