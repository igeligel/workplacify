import { Box } from "@chakra-ui/react";

import { useComparisonTileTheme } from "./useComparisonTileTheme";

type ComparisonTileSeparatorProps = {
  label: React.ReactNode;
};

export const ComparisonTileSeparator = (
  props: ComparisonTileSeparatorProps,
) => {
  const { theme } = useComparisonTileTheme();
  const { label } = props;

  const separatorColor = theme === "dark" ? "gray.700" : "gray.200";

  return (
    <Box
      flexShrink={1}
      display={"flex"}
      alignItems={"stretch"}
      height={"auto"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignContent={"center"}
    >
      <Box
        alignSelf={"center"}
        width={"1px"}
        flex={1}
        backgroundColor={separatorColor}
      />
      <Box
        alignSelf={"center"}
        paddingY={{ base: 0, sm: 2 }}
        color={theme === "dark" ? "gray.400" : "gray.600"}
        fontSize={{ base: "xs", sm: "md" }}
      >
        {label}
      </Box>
      <Box
        alignSelf={"center"}
        flex={1}
        width={"1px"}
        backgroundColor={separatorColor}
      />
    </Box>
  );
};
