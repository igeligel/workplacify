import { useTheme } from "next-themes";

export const useWorkplacifyTheme = () => {
  const { theme, forcedTheme } = useTheme();

  return { theme: forcedTheme || theme };
};
