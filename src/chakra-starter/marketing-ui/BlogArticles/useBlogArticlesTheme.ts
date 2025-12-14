import { useTheme } from "next-themes";

export const useBlogArticlesTheme = () => {
  const { theme, forcedTheme, resolvedTheme } = useTheme();
  return { theme: forcedTheme || resolvedTheme || theme };
};
