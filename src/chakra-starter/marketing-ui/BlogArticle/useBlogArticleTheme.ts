import { useTheme } from "next-themes";

export const useBlogArticleTheme = () => {
  const { theme, forcedTheme } = useTheme();
  return { theme: forcedTheme || theme };
};
