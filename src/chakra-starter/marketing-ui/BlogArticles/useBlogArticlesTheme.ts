import { useTheme } from "next-themes";

export const useBlogArticlesTheme = () => {
  const { theme, forcedTheme } = useTheme();
  return { theme: forcedTheme || theme };
};
