import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";

type GetStartedButtonLinkProps = {
  onClick: () => void;
  badges: React.ReactNode;
  heading: React.ReactNode;
  imageSource: string;
  imageAlt: string;
};

export const GetStartedButtonLink = (props: GetStartedButtonLinkProps) => {
  const { onClick, badges, heading, imageSource, imageAlt } = props;
  const [isElementHovered, setIsElementHovered] = useState(false);
  const t = useTranslations("GetStartedModule");

  return (
    <Link
      textDecoration={"none"}
      onClick={onClick}
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
              as={Text}
            >
              {t("getStartedButtonLinkStart")}
            </Link>
            <Icon
              marginInlineStart={"0px !important"}
              boxSize={4}
              as={FiChevronRight}
            />
          </Text>
        </VStack>
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
            transform={
              isElementHovered ? "translateY(0px)" : "translateY(10px)"
            }
          />
        </Box>
      </VStack>
    </Link>
  );
};
