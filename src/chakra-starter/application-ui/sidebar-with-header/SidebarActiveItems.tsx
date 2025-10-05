import { Box, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { FiStar } from "react-icons/fi";

// import { FiStar } from "react-icons/fi";
import { GroupedMenuItem } from "./GroupedMenuItem";

type SubItem = {
  id: number;
  title: string;
  icon: IconType;
  link?: string;
};

export const SidebarActiveItems = () => {
  const router = useRouter();
  const t = useTranslations("AppMenu");
  const analyticsSubItems = [
    { id: 84824812000, title: "Base Analytics", icon: FiStar },
    // { id: 84824812001, title: "Area Analytics (Floors)", icon: FiStar },
    {
      id: 84824812002,
      title: "People Analytics (Users)",
      icon: FiStar,
      link: "/app/analytics/people-analytics",
    },
  ];

  const analyticsPath = "/app/analytics";

  const currentItems: SubItem[] = [
    ...(router.pathname.startsWith(analyticsPath) ? analyticsSubItems : []),
  ];
  const noCurrentItems = currentItems.length === 0;

  return (
    <Box width={"100%"}>
      <Heading
        color={"gray.500"}
        fontSize={"xs"}
        textTransform="uppercase"
        w="100%"
      >
        {t("labelSubmenu")}
      </Heading>
      <VStack gap={"0.5"} marginTop={"2"}>
        {noCurrentItems && (
          <Text
            fontSize={"xs"}
            fontWeight={"semibold"}
            color="gray.500"
            width="100%"
          >
            {t("noActiveItems")}
          </Text>
        )}
        {currentItems.map((item) => {
          return (
            <Link
              asChild
              key={item.id}
              width={"100%"}
              textDecoration={"none"}
              _hover={{ textDecoration: "none" }}
            >
              <NextLink href={`${item.link ?? "#"}`}>
                <GroupedMenuItem
                  isActive={false}
                  title={item.title}
                  icon={item.icon}
                  iconColor={`gray.600`}
                />
              </NextLink>
            </Link>
          );
        })}
      </VStack>
    </Box>
  );
};
