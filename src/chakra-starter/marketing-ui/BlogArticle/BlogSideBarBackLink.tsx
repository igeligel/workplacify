import { Button, Icon, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FiCornerUpLeft } from "react-icons/fi";

import { useBlogArticleTheme } from "./useBlogArticleTheme";

type BlogSideBarBackLinkProps = {
  href: string;
  label: React.ReactNode;
};

export const BlogSideBarBackLink = (props: BlogSideBarBackLinkProps) => {
  const { href, label } = props;
  const { theme } = useBlogArticleTheme();
  const color = "gray";

  return (
    <Link href={href} passHref>
      <Button
        size={"lg"}
        variant="plain"
        color={theme === "dark" ? `${color}.100` : `${color}.900`}
        fontWeight={"semibold"}
        paddingX={2}
        width={"100%"}
      >
        <Stack direction="row" alignItems="center" gap={2}>
          <Icon as={FiCornerUpLeft} />
          <Text>{label}</Text>
        </Stack>
      </Button>
    </Link>
  );
};
