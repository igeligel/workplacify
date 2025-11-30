import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  Link,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";

type GetStartedLinkProps = {
  href: string;
  badges: React.ReactNode;
  heading: React.ReactNode;
  imageSource: string;
  imageAlt: string;
};

export const GetStartedLink = (props: GetStartedLinkProps) => {
  const t = useTranslations("GetStartedModule");
  const [imageLoaded, setImageLoaded] = useState(false);
  const { href, badges, heading, imageSource, imageAlt } = props;
  const [isElementHovered, setIsElementHovered] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Link
      textDecoration={"none"}
      _hover={{
        textDecoration: "none",
      }}
      onMouseEnter={() => {
        setIsElementHovered(true);
      }}
      onMouseLeave={() => {
        setIsElementHovered(false);
      }}
    >
      <NextLink href={href}>
        <VStack alignItems={"flex-start"} gap={{ base: 0.5, lg: 3 }}>
          <HStack>{badges}</HStack>
          <VStack
            gap={{ base: 0.5, lg: 1 }}
            alignItems={"flex-start"}
            justifyContent={"center"}
          >
            <Heading
              as={"h3"}
              fontSize={{ base: "sm", lg: "md" }}
              color={"gray.700"}
            >
              {heading}
            </Heading>
            <Text
              as={"span"}
              colorPalette="orange"
              color={"orange.400"}
              _hover={{
                textDecoration: "none",
                color: "orange.600",
              }}
            >
              <Link
                color={"orange.400"}
                _hover={{
                  textDecoration: "none",
                  color: "orange.600",
                }}
              >
                {t("getStartedLink")}
              </Link>
              <Icon
                marginInlineStart={"0px !important"}
                boxSize={4}
                as={FiChevronRight}
              />
            </Text>
          </VStack>
          <Skeleton loading={!imageLoaded}>
            <Box
              maxWidth={{ base: "100%", lg: "80%" }}
              maxHeight={{ base: "125px", lg: "none" }}
              overflow={{ base: "hidden", lg: "visible" }}
            >
              <Image
                borderTopLeftRadius={"lg"}
                borderTopRightRadius={"lg"}
                boxShadow={"lg"}
                src={imageSource}
                alt={imageAlt}
                transition={"transform 0.25s ease-in-out"}
                onLoad={handleImageLoad}
                transform={
                  isElementHovered ? "translateY(0px)" : "translateY(10px)"
                }
                width={"100%"}
                height={"100%"}
              />
            </Box>
          </Skeleton>
        </VStack>
      </NextLink>
    </Link>
  );
};
