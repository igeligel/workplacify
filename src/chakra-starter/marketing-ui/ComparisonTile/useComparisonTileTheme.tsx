import { useTheme } from "next-themes";

export const useComparisonTileTheme = () => {
  const theme = useTheme();

  return {
    theme: theme.forcedTheme || theme.theme,
  };
};
