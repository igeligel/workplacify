import { Link } from "@chakra-ui/next-js";
import {
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
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
  const { href, badges, heading, imageSource, imageAlt } = props;
  const [isElementHovered, setIsElementHovered] = useState(false);

  return (
    <Link
      href={href}
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
      <VStack alignItems={"flex-start"} spacing={{ base: 0.5, lg: 3 }}>
        <HStack>{badges}</HStack>
        <VStack
          spacing={{ base: 0.5, lg: 1 }}
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
            colorScheme="orange"
            color={"orange.400"}
            _hover={{
              textDecoration: "none",
              color: "orange.600",
            }}
          >
            <Button
              color={"orange.400"}
              _hover={{
                textDecoration: "none",
                color: "orange.600",
              }}
              as={Text}
              variant={"link"}
            >
              Start
            </Button>
            <Icon
              marginInlineStart={"0px !important"}
              boxSize={4}
              as={FiChevronRight}
              transform={"translateY(3px)"}
            />
          </Text>
        </VStack>
        <Box
          maxWidth={{ base: "100%", lg: "80%" }}
          maxHeight={{ base: "125px", lg: "auto" }}
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
